const CLINK_UAT_API_BASE_URL = "https://uat-api.clinkbill.com";
const CLINK_UAT_REQUEST_TIMEOUT_MS = 15_000;

export const PODVID_BASIC_CLINK_PRODUCT_ID = "prd_ftqmb0bf7702";
export const PODVID_BASIC_CLINK_PRICE_ID = "price_ftqmb0ec2wae";
export const PODVID_BASIC_MONTHLY_PRICE_USD = "9.90";

interface ClinkApiEnvelope<T> {
  code: number;
  message: string | null;
  data: T;
}

export interface ClinkCheckoutSessionCreated {
  sessionId: string;
  customerId: string;
  originalAmount: number;
  originalCurrency: string;
  url: string;
  merchantReferenceId: string;
  uiMode: string;
  expireTime: string;
}

export interface ClinkCheckoutSessionStatus {
  sessionId: string;
  token?: string;
  status: string;
  paymentStatus: string;
  amountSubtotal: number;
  amountTotal: number | null;
  originalCurrency: string;
  paymentCurrency: string | null;
  subscriptionId: string | null;
  invoiceId: string | null;
  orderId: string | null;
  merchantReferenceId: string;
  customer: {
    customerId: string;
    email: string;
  };
  product: {
    productId: string;
    productName: string;
  };
  price: {
    priceId: string;
    recurring: {
      freeTrialDays: number;
      interval: string;
    } | null;
  };
  created: string;
  expire: string;
}

function getClinkUatSecretKey(): string {
  if (process.env.CLINK_UAT_PAYMENT_ENABLED !== "true") {
    throw new Error("Clink UAT payment route is disabled");
  }

  const apiKey = process.env.CLINK_SECRET_KEY;
  if (!apiKey) {
    throw new Error("CLINK_SECRET_KEY is not configured");
  }
  if (!apiKey.startsWith("sk_uat_")) {
    throw new Error("Clink UAT requires an sk_uat_ secret key");
  }

  return apiKey;
}

async function clinkUatRequest<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const apiKey = getClinkUatSecretKey();
  const response = await fetch(`${CLINK_UAT_API_BASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    signal: init.signal ?? AbortSignal.timeout(CLINK_UAT_REQUEST_TIMEOUT_MS),
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
      "X-Timestamp": Date.now().toString(),
      ...init.headers,
    },
  });

  const payload = (await response.json()) as ClinkApiEnvelope<T>;
  if (!response.ok || payload.code !== 200) {
    throw new Error(
      payload.message || `Clink UAT request failed with ${response.status}`
    );
  }

  return payload.data;
}

export async function createPodVidBasicUatCheckout(input: {
  customerEmail: string;
  merchantReferenceId: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<ClinkCheckoutSessionCreated> {
  const checkout = await clinkUatRequest<ClinkCheckoutSessionCreated>(
    "/api/checkout/session",
    {
      method: "POST",
      body: JSON.stringify({
        customerEmail: input.customerEmail,
        merchantReferenceId: input.merchantReferenceId,
        originalAmount: PODVID_BASIC_MONTHLY_PRICE_USD,
        originalCurrency: "USD",
        productId: PODVID_BASIC_CLINK_PRODUCT_ID,
        priceId: PODVID_BASIC_CLINK_PRICE_ID,
        successUrl: input.successUrl,
        cancelUrl: input.cancelUrl,
        uiMode: "hostedPage",
        metadata: {
          source: "podvid-clink-uat",
          plan: "basic-monthly",
        },
      }),
    }
  );

  const checkoutUrl = new URL(checkout.url);
  if (
    checkoutUrl.protocol !== "https:" ||
    checkoutUrl.hostname !== "uat-checkout.clinkbill.com"
  ) {
    throw new Error("Clink UAT returned an untrusted checkout URL");
  }

  return checkout;
}

export async function getPodVidUatCheckoutStatus(
  sessionId: string
): Promise<Omit<ClinkCheckoutSessionStatus, "token">> {
  const session = await clinkUatRequest<ClinkCheckoutSessionStatus>(
    `/api/checkout/session/${encodeURIComponent(sessionId)}`
  );

  const { token: _checkoutToken, ...safeSession } = session;
  return safeSession;
}
