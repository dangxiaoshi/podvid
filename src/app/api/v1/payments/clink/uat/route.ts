import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import {
  createPodVidBasicUatCheckout,
  getPodVidUatCheckoutStatus,
} from "@/lib/clink-uat";
import { requireAuth } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/error";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function errorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }
  const message = error instanceof Error ? error.message : "Unknown error";
  if (message.includes("disabled")) {
    return NextResponse.json(
      { error: "Clink UAT payment is unavailable" },
      { status: 404 }
    );
  }
  console.error("[Clink UAT] Payment request failed", error);
  return NextResponse.json(
    { error: "Unable to complete the Clink UAT payment request" },
    { status: 502 }
  );
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth(request);
    const input = (await request.json().catch(() => ({}))) as {
      locale?: unknown;
    };
    const origin = new URL(process.env.NEXT_PUBLIC_APP_URL!).origin;
    const merchantReferenceId = `podvid-uat-${user.id}-${randomUUID()}`;
    const checkout = await createPodVidBasicUatCheckout({
      customerEmail: user.email,
      merchantReferenceId,
      successUrl: `${origin}/api/v1/payments/clink/uat?return=success&locale=${input.locale === "zh" ? "zh" : "en"}`,
      cancelUrl: `${origin}/api/v1/payments/clink/uat?return=cancel&locale=${input.locale === "zh" ? "zh" : "en"}`,
    });

    return NextResponse.json(
      {
        sessionId: checkout.sessionId,
        checkoutUrl: checkout.url,
        merchantReferenceId: checkout.merchantReferenceId,
        amount: checkout.originalAmount,
        currency: checkout.originalCurrency,
        expireTime: checkout.expireTime,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return errorResponse(error);
  }
}

export async function GET(request: Request) {
  try {
    const user = await requireAuth(request);
    const url = new URL(request.url);
    const sessionId = url.searchParams.get("sessionId");
    if (!sessionId || !/^sess_[A-Za-z0-9]+$/.test(sessionId)) {
      return NextResponse.json(
        { error: "A valid sessionId is required" },
        { status: 400 }
      );
    }

    const session = await getPodVidUatCheckoutStatus(sessionId);
    if (
      session.customer.email.toLowerCase() !== user.email.toLowerCase() ||
      !session.merchantReferenceId.startsWith(`podvid-uat-${user.id}-`)
    ) {
      throw new ApiError("Forbidden", 403);
    }

    const localePrefix = url.searchParams.get("locale") === "zh" ? "/zh" : "";
    const origin = new URL(process.env.NEXT_PUBLIC_APP_URL!).origin;
    const returnType = url.searchParams.get("return");
    if (returnType === "cancel") {
      return NextResponse.redirect(
        `${origin}${localePrefix}/pricing?payment=cancelled&provider=clink-uat`
      );
    }
    if (returnType === "success") {
      const paymentResult = session.paymentStatus === "paid" ? "success" : "failed";
      return NextResponse.redirect(
        `${origin}${localePrefix}/pricing?payment=${paymentResult}&provider=clink-uat`
      );
    }

    return NextResponse.json(session, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
