import type { Locale } from "@/config/i18n-config";
import { buildAlternates } from "@/lib/seo";

const SUPPORT_EMAIL = "support@podvid.uk";
const LEGAL_CONTENT_CLASS =
  "max-w-none text-base leading-7 text-muted-foreground [&_h1]:mb-3 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-foreground [&_.lead]:mt-0 [&_.lead]:text-lg [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_strong]:font-semibold [&_strong]:text-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const alternates = buildAlternates("/terms-of-service", locale);

  return {
    title: locale === "zh" ? "服务条款" : "Terms of Service",
    description:
      locale === "zh"
        ? "PodVid 服务条款、可接受使用政策、退款政策与违规处理规则。"
        : "PodVid terms, acceptable use policy, refund policy, and enforcement rules.",
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
  };
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-24">
      <div className={LEGAL_CONTENT_CLASS}>
        {locale === "zh" ? (
          <>
            <h1>服务条款</h1>
            <p className="lead">最后更新：2026 年 7 月 31 日</p>

            <h2>1. 接受条款与使用资格</h2>
            <p>
              欢迎使用 PodVid（“PodVid”“我们”或“本服务”）。您访问或使用本服务，即表示您同意本服务条款。如果您代表公司或其他组织使用本服务，您确认自己有权代表该组织接受本条款。您必须达到所在地区订立有效合同的法定年龄。
            </p>

            <h2>2. 服务与账户</h2>
            <p>
              PodVid 是面向播客和内容创作者的 AI 视频制作服务，可将文字、图片、音频及其他授权素材转换为短视频、字幕视频和类似内容。您应提供准确的账户信息，妥善保管登录凭证，并对账户下的活动负责。如发现未经授权的使用，请立即联系我们。
            </p>

            <h2>3. 用户内容与生成内容</h2>
            <p>
              您保留对自己上传内容的权利，并确认您已取得处理这些内容所需的权利、许可和同意。为运行本服务，您授予 PodVid
              一项非独占、全球范围、仅限必要期限的许可，用于托管、复制、转换、传输和审查您的输入与生成内容，以完成生成、提供支持、保障安全和处理违规。
            </p>
            <p>
              在您遵守本条款的前提下，您可以依法使用生成内容。AI
              生成内容可能与他人内容相似，我们不保证其唯一性、可注册性或不侵犯第三方权利。发布或商业使用前，您应自行审查并取得必要授权。
            </p>

            <h2>4. 可接受使用政策</h2>
            <p>您不得使用 PodVid 创建、上传、请求、传播或协助以下内容或行为：</p>
            <ul>
              <li>色情、露骨性内容、NSFW 内容或未经同意的亲密内容；</li>
              <li>血腥、虐待、极端暴力，或鼓励现实伤害、自残的内容；</li>
              <li>仇恨、歧视、骚扰、威胁或针对受保护群体的贬损内容；</li>
              <li>
                任何涉及未成年人的性化、剥削、诱骗或不安全内容，包括儿童性虐待材料（CSAM）；
              </li>
              <li>
                未经同意冒充他人、制作欺骗性深度伪造，或虚构真实人物的背书、言论或行为；
              </li>
              <li>
                侵犯版权、商标、肖像权、隐私权或其他知识产权与人格权的内容；
              </li>
              <li>
                违法、欺诈、诈骗、恶意软件、规避安全措施，或其他可能伤害个人、平台或公众的行为。
              </li>
            </ul>

            <h2>5. 内容审核、举报与执行</h2>
            <p>
              PodVid
              可对被举报、被标记或存在合理风险的内容进行自动信号检测和人工审查。我们可拒绝生成、移除内容、限制功能、冻结积分、暂停或终止账户，并在法律要求或紧急安全风险下保存证据或向有关机构报告。执行措施会综合考虑内容性质、严重程度、重复次数和现实风险。
            </p>
            <p>
              举报疑似违规内容时，请发送邮件至{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              ，并尽量附上相关链接、任务编号和原因。我们会合理审查举报，但不会向举报人披露其他用户的私密信息。
            </p>

            <h2>6. 套餐、积分、账单与取消</h2>
            <p>
              价格、包含的积分、计费周期和适用税费会在购买前显示。订阅会按结账页所示周期自动续费，直至您取消。您可在账户的订阅管理入口取消；取消后不再续费，当前已付周期通常可使用至期末。已完成的生成会消耗相应积分，除非平台认定为系统故障。
            </p>

            <h2>7. 退款政策</h2>
            <ul>
              <li>
                <strong>平台故障：</strong>
                如果生成因 PodVid
                可核实的系统错误而失败，我们会在技术可行时自动返还对应积分，或在支持团队核验后返还。
              </li>
              <li>
                <strong>重复或误购：</strong>
                对尚未使用的重复购买或明显误购，请在付款后 7
                个自然日内发送邮件申请，并提供账户邮箱、订单号和原因；申请处理期间请勿使用相关积分。
              </li>
              <li>
                <strong>已使用服务：</strong>
                已用于成功生成的积分、已使用的数字服务以及已开始的订阅周期通常不退款，也不按比例退款，但适用法律另有强制规定的除外。
              </li>
              <li>
                <strong>处理流程：</strong>
                请发送申请至{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                。资料完整后，我们通常会在 10
                个工作日内完成审核。批准的款项会退回原付款方式；支付机构或银行的入账时间可能更长。
              </li>
            </ul>
            <p>本退款政策不限制您依据适用消费者保护法享有的强制性权利。</p>

            <h2>8. 暂停、终止与违约后果</h2>
            <p>
              您可以停止使用本服务并按上述方式取消订阅。若您违反本条款、未付款、给用户或平台造成风险，或法律要求我们采取行动，我们可限制、暂停或终止服务。严重或重复违规可能导致内容被删除、未使用积分被冻结或失效、账户无法继续访问；法律要求退款的情形不受影响。
            </p>
            <p>
              账户终止后，PodVid
              为提供服务而取得的许可随合理清理期结束，但为履行法律义务、解决争议、执行本条款和维护备份所必需的内容可在限定期限内保留。关于付款、知识产权、免责声明、责任限制和争议的条款继续有效。
            </p>

            <h2>9. PodVid 知识产权与侵权通知</h2>
            <p>
              PodVid
              的网站、软件、品牌、界面和原创素材受知识产权法保护。本条款不向您转让这些权利。如果您认为平台内容侵犯了您的权利，请通过支持邮箱提交作品说明、侵权位置、联系方式和权利声明，我们会进行审查并采取适当措施。
            </p>

            <h2>10. 服务可用性与免责声明</h2>
            <p>
              AI
              输出可能不准确、不完整或不适合特定用途。您应在发布、依赖或商业使用前进行人工审查。在法律允许的最大范围内，本服务按“现状”和“可用”方式提供；我们不保证服务始终不中断、无错误或满足您的全部预期。
            </p>

            <h2>11. 责任限制</h2>
            <p>
              在法律允许的最大范围内，PodVid
              不对间接、附带、特殊、惩罚性或后果性损失负责。任何不能依法排除的责任均按适用法律处理；本条款不排除因故意不当行为或法律禁止排除的责任。
            </p>

            <h2>12. 条款变更</h2>
            <p>
              我们可因服务、法律或安全要求更新本条款。重大变更会通过网站、账户通知或邮件等合理方式告知，并在所示生效日实施。法律要求另行取得同意的，我们会依法处理。
            </p>

            <h2>13. 适用法律与消费者权利</h2>
            <p>
              本条款适用能够合法适用于您与 PodVid
              关系的法律。您所在地不能通过合同放弃的消费者保护、退款和争议解决权利不受本条款影响。
            </p>

            <h2>14. 联系我们</h2>
            <p>
              条款、退款、侵权或违规举报请联系：{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            </p>
          </>
        ) : (
          <>
            <h1>Terms of Service</h1>
            <p className="lead">Last updated: July 31, 2026</p>

            <h2>1. Acceptance and eligibility</h2>
            <p>
              Welcome to PodVid (“PodVid,” “we,” “us,” or the “Service”). By
              accessing or using the Service, you agree to these Terms of
              Service. If you use the Service for a company or other
              organization, you confirm that you have authority to accept these
              Terms for that organization. You must be old enough to enter into
              a binding contract where you live.
            </p>

            <h2>2. Service and accounts</h2>
            <p>
              PodVid is an AI video creation service for podcasters and content
              creators. It can turn authorized text, images, audio, and other
              materials into short videos, captioned clips, and similar
              content. You must provide accurate account information, protect
              your login credentials, and take responsibility for activity
              under your account. Contact us promptly if you detect unauthorized
              use.
            </p>

            <h2>3. User content and generated content</h2>
            <p>
              You retain your rights in content you upload and confirm that you
              have all rights, permissions, and consents needed for us to
              process it. You grant PodVid a non-exclusive, worldwide,
              limited-duration license to host, copy, transform, transmit, and
              review your inputs and generated content only as needed to
              generate content, provide support, secure the Service, and
              address violations.
            </p>
            <p>
              Subject to these Terms, you may use generated content as permitted
              by law. AI outputs may be similar to content produced for others,
              and we do not guarantee that an output is unique, registrable, or
              free of third-party rights. You are responsible for reviewing
              outputs and obtaining any permissions needed before publishing or
              using them commercially.
            </p>

            <h2>4. Acceptable Use Policy</h2>
            <p>
              You may not use PodVid to create, upload, request, distribute, or
              facilitate:
            </p>
            <ul>
              <li>
                Pornographic, sexually explicit, NSFW, or non-consensual
                intimate content;
              </li>
              <li>
                Graphic gore, abuse, extreme violence, or content that
                encourages real-world harm or self-harm;
              </li>
              <li>
                Hate, discrimination, harassment, threats, or degrading content
                targeting protected groups;
              </li>
              <li>
                Any sexualized, exploitative, grooming, or unsafe content
                involving minors, including child sexual abuse material (CSAM);
              </li>
              <li>
                Non-consensual impersonation, deceptive deepfakes, or fabricated
                endorsements, statements, or actions attributed to a real
                person;
              </li>
              <li>
                Content that infringes copyright, trademark, publicity, privacy,
                or other intellectual-property or personal rights;
              </li>
              <li>
                Illegal activity, fraud, scams, malware, attempts to bypass
                safeguards, or conduct likely to harm people, platforms, or the
                public.
              </li>
            </ul>

            <h2>5. Moderation, reporting, and enforcement</h2>
            <p>
              PodVid may review content that is reported, flagged, or reasonably
              suspected to present risk, using automated signals and human
              review where appropriate. We may refuse a generation, remove
              content, restrict features, freeze credits, suspend or terminate
              an account, preserve evidence, or report a matter when required
              by law or necessary to address an urgent safety risk. We consider
              the nature, severity, repetition, and real-world risk of conduct
              when taking action.
            </p>
            <p>
              To report suspected abuse, email{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and include
              the relevant link or task identifier and your reason where
              possible. We will reasonably review reports but will not disclose
              another user’s private information to a reporter.
            </p>

            <h2>6. Plans, credits, billing, and cancellation</h2>
            <p>
              Prices, included credits, billing periods, and applicable taxes
              are shown before purchase. Subscriptions renew for the period
              shown at checkout until canceled. You may cancel through the
              subscription-management entry in your account; cancellation stops
              future renewals, and access normally continues through the end of
              the paid period. Completed generations use the stated credits
              unless we determine that a platform failure occurred.
            </p>

            <h2>7. Refund Policy</h2>
            <ul>
              <li>
                <strong>Platform failures:</strong> If a generation fails
                because of a verifiable PodVid system error, we will restore the
                affected credits automatically where technically available or
                after support review.
              </li>
              <li>
                <strong>Duplicate or mistaken unused purchases:</strong> Email
                us within 7 calendar days of payment with the account email,
                order identifier, and reason. Do not use the affected credits
                while the request is pending.
              </li>
              <li>
                <strong>Used services:</strong> Credits consumed by successful
                generations, digital services already used, and a subscription
                period that has begun are generally non-refundable and not
                prorated, except where applicable law requires otherwise.
              </li>
              <li>
                <strong>Process and timing:</strong> Send a request to{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. We
                normally review a complete request within 10 business days.
                Approved refunds are returned to the original payment method;
                the payment provider or bank may need additional time to post
                the funds.
              </li>
            </ul>
            <p>
              This policy does not limit any mandatory rights you have under
              applicable consumer-protection law.
            </p>

            <h2>8. Suspension, termination, and effects of breach</h2>
            <p>
              You may stop using the Service and cancel a subscription as
              described above. We may restrict, suspend, or terminate access if
              you breach these Terms, fail to pay, create risk for users or the
              Service, or if the law requires action. Serious or repeated
              violations may result in content removal, frozen or expired unused
              credits, and loss of account access, subject to any refund rights
              required by law.
            </p>
            <p>
              After termination, the license granted to operate the Service ends
              after a reasonable wind-down period, but we may retain limited
              information as needed to comply with law, resolve disputes,
              enforce these Terms, and maintain backups. Provisions concerning
              payments, intellectual property, disclaimers, liability, and
              disputes survive termination.
            </p>

            <h2>9. PodVid intellectual property and notices</h2>
            <p>
              PodVid’s site, software, brand, interface, and original materials
              are protected by intellectual-property laws. These Terms do not
              transfer those rights to you. If you believe content on the
              Service infringes your rights, email us a description of the work,
              the location of the material, your contact details, and a
              statement of your rights. We will review the notice and take
              appropriate action.
            </p>

            <h2>10. Availability and disclaimers</h2>
            <p>
              AI outputs may be inaccurate, incomplete, or unsuitable for a
              particular use. You must review outputs before publishing, relying
              on, or commercially using them. To the fullest extent permitted by
              law, the Service is provided “as is” and “as available,” and we do
              not promise uninterrupted or error-free operation or that every
              output will meet your expectations.
            </p>

            <h2>11. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, PodVid is not liable for
              indirect, incidental, special, punitive, or consequential losses.
              Any liability that cannot legally be excluded will be handled
              under applicable law. Nothing in these Terms excludes liability
              for intentional misconduct or any liability that law does not
              allow us to exclude.
            </p>

            <h2>12. Changes to these Terms</h2>
            <p>
              We may update these Terms to reflect changes to the Service, law,
              or safety requirements. We will provide reasonable notice of
              material changes through the site, account, or email and state
              when they take effect. Where law requires separate consent, we
              will request it.
            </p>

            <h2>13. Applicable law and consumer rights</h2>
            <p>
              These Terms are governed by the laws that may lawfully apply to
              your relationship with PodVid. Mandatory consumer-protection,
              refund, and dispute-resolution rights in your place of residence
              are not waived by these Terms.
            </p>

            <h2>14. Contact</h2>
            <p>
              For questions about these Terms, refunds, infringement, or abuse
              reports, email{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
