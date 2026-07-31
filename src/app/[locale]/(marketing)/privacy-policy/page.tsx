import type { Locale } from "@/config/i18n-config";
import { buildAlternates } from "@/lib/seo";

const PRIVACY_EMAIL = "support@podvid.uk";
const LEGAL_CONTENT_CLASS =
  "max-w-none text-base leading-7 text-muted-foreground [&_h1]:mb-3 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-foreground [&_.lead]:mt-0 [&_.lead]:text-lg [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_strong]:font-semibold [&_strong]:text-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const alternates = buildAlternates("/privacy-policy", locale);

  return {
    title: locale === "zh" ? "隐私政策" : "Privacy Policy",
    description:
      locale === "zh"
        ? "PodVid 如何收集、使用、共享和保护个人信息。"
        : "How PodVid collects, uses, shares, and protects personal information.",
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
  };
}

export default async function PrivacyPolicyPage({
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
            <h1>隐私政策</h1>
            <p className="lead">最后更新：2026 年 7 月 31 日</p>

            <h2>1. 适用范围与联系方式</h2>
            <p>
              本政策说明 PodVid
              在您访问网站、创建账户、购买套餐、上传素材、生成视频或联系支持时，如何处理个人信息。如对本政策或个人信息处理有疑问，请发送邮件至{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>。
            </p>

            <h2>2. 我们收集的信息</h2>
            <ul>
              <li>
                <strong>账户和联系信息：</strong>
                电子邮箱、显示名称、头像、登录方式和您提交给支持团队的信息。
              </li>
              <li>
                <strong>用户内容：</strong>
                您提供的文字、图片、音频、视频、提示词、项目设置及生成结果。
              </li>
              <li>
                <strong>交易信息：</strong>
                套餐、积分、订单编号、付款状态、币种和账单记录。银行卡或其他完整支付凭证通常由支付服务商直接处理。
              </li>
              <li>
                <strong>使用和设备信息：</strong>
                访问时间、功能操作、生成状态、日志、IP
                地址、浏览器或设备类型、语言以及诊断信息。
              </li>
              <li>
                <strong>安全与合规信息：</strong>
                违规举报、风控信号、审核记录及为保护用户和服务所需的信息。
              </li>
            </ul>

            <h2>3. 我们如何使用信息</h2>
            <ul>
              <li>创建和维护账户，完成视频生成、存储、下载和客户支持；</li>
              <li>处理订单、订阅、积分、退款和交易记录；</li>
              <li>诊断故障、改进性能、了解功能使用情况；</li>
              <li>发现欺诈、滥用、安全事件和违反可接受使用政策的行为；</li>
              <li>发送必要的服务、安全、账单和政策通知；</li>
              <li>遵守法律义务、回应合法请求和保护权利与安全。</li>
            </ul>

            <h2>4. AI 内容处理与审核</h2>
            <p>
              为生成视频，您的输入和项目设置可能被传输给为 PodVid
              提供模型、计算、存储或内容处理能力的服务商。我们也可能审查被举报、被标记或存在合理风险的内容，以执行服务条款、处理支持请求和保护平台安全。请勿上传您无权处理的敏感、机密或第三方内容。
            </p>

            <h2>5. 信息共享</h2>
            <p>我们不会出售您的个人信息。我们仅在以下必要范围内共享信息：</p>
            <ul>
              <li>
                与提供云托管、AI 生成、存储、分析、邮件、认证、支付和客户支持的服务商共享；
              </li>
              <li>依据法律、法院命令或其他有效法律程序进行披露；</li>
              <li>为调查欺诈、处理安全事件或保护用户、PodVid 与公众而披露；</li>
              <li>
                在合并、融资、收购或资产转让中向受保密义务约束的参与方披露；
              </li>
              <li>在您明确指示或同意时进行共享。</li>
            </ul>

            <h2>6. 跨境处理</h2>
            <p>
              PodVid
              及其服务商可能在您所在地区以外处理信息。我们会根据适用法律采取合理的合同、组织和安全措施。不同地区的数据保护规则可能与您所在地不同。
            </p>

            <h2>7. 保存与删除</h2>
            <p>
              我们仅在提供服务、保持账户和交易记录、解决争议、执行协议及履行法律义务所需的期限内保存信息。不同数据的期限会因用途、账户状态、备份周期和法律要求而异。账户删除后，部分信息可能在合理备份期内保留，或因税务、付款、安全和法律要求继续保存。
            </p>

            <h2>8. 安全</h2>
            <p>
              我们采用与数据性质相适应的合理技术和组织措施，以减少未经授权访问、丢失、篡改或泄露的风险。但互联网传输和电子存储均无法保证绝对安全。请使用安全的登录方式并及时报告可疑活动。
            </p>

            <h2>9. Cookie 与分析</h2>
            <p>
              我们可能使用必要 Cookie
              维持登录、保存偏好和保护账户，并使用分析工具了解访问与性能。您可通过浏览器设置管理 Cookie；停用必要
              Cookie 可能导致部分功能无法使用。
            </p>

            <h2>10. 您的选择与权利</h2>
            <p>
              依据您所在地的法律，您可能有权访问、更正、删除、导出或限制我们处理您的个人信息，也可能有权反对特定处理或撤回同意。您可以通过账户功能或支持邮箱提交请求。为保护账户，我们可能需要先核验请求者身份。您也可向当地数据保护机构投诉。
            </p>

            <h2>11. 未成年人</h2>
            <p>
              PodVid 不面向 13
              岁以下儿童，或适用法律规定的更高最低年龄。我们禁止任何涉及未成年人的性化、剥削或不安全内容。如您认为儿童向我们提供了个人信息或发现相关违规，请立即联系支持邮箱。
            </p>

            <h2>12. 政策更新</h2>
            <p>
              我们可能因服务、技术或法律变化更新本政策。重大变更会通过网站、账户或邮件等合理方式通知，并在页面顶部标注更新日期。
            </p>

            <h2>13. 联系我们</h2>
            <p>
              隐私请求或问题请发送邮件至{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>。
            </p>
          </>
        ) : (
          <>
            <h1>Privacy Policy</h1>
            <p className="lead">Last updated: July 31, 2026</p>

            <h2>1. Scope and contact</h2>
            <p>
              This Policy explains how PodVid handles personal information when
              you visit the site, create an account, purchase a plan, upload
              materials, generate videos, or contact support. For questions
              about this Policy or our handling of personal information, email{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.
            </p>

            <h2>2. Information we collect</h2>
            <ul>
              <li>
                <strong>Account and contact information:</strong> Email address,
                display name, profile image, login method, and information you
                send to support.
              </li>
              <li>
                <strong>User content:</strong> Text, images, audio, video,
                prompts, project settings, and generated results you provide.
              </li>
              <li>
                <strong>Transaction information:</strong> Plan, credits, order
                identifiers, payment status, currency, and billing records.
                Payment providers generally process full card or payment
                credentials directly.
              </li>
              <li>
                <strong>Usage and device information:</strong> Access time,
                feature activity, generation status, logs, IP address, browser
                or device type, language, and diagnostic information.
              </li>
              <li>
                <strong>Safety and compliance information:</strong> Abuse
                reports, risk signals, review records, and information needed to
                protect users and the Service.
              </li>
            </ul>

            <h2>3. How we use information</h2>
            <ul>
              <li>
                Create and maintain accounts and provide generation, storage,
                download, and customer-support features;
              </li>
              <li>
                Process orders, subscriptions, credits, refunds, and transaction
                records;
              </li>
              <li>
                Diagnose failures, improve performance, and understand feature
                usage;
              </li>
              <li>
                Detect fraud, abuse, security incidents, and violations of our
                Acceptable Use Policy;
              </li>
              <li>Send necessary service, safety, billing, and policy notices;</li>
              <li>
                Comply with legal duties, respond to lawful requests, and
                protect rights and safety.
              </li>
            </ul>

            <h2>4. AI content processing and review</h2>
            <p>
              To generate videos, your inputs and project settings may be sent
              to providers that supply PodVid with models, computing, storage,
              or content-processing services. We may also review content that is
              reported, flagged, or reasonably suspected to present risk to
              enforce our Terms, address support requests, and protect the
              Service. Do not upload sensitive, confidential, or third-party
              material that you do not have the right to process.
            </p>

            <h2>5. How we share information</h2>
            <p>
              We do not sell personal information. We share it only as
              reasonably necessary:
            </p>
            <ul>
              <li>
                With providers of cloud hosting, AI generation, storage,
                analytics, email, authentication, payments, and customer
                support;
              </li>
              <li>
                To comply with law, a court order, or another valid legal
                process;
              </li>
              <li>
                To investigate fraud, respond to a security incident, or protect
                users, PodVid, or the public;
              </li>
              <li>
                With participants bound by confidentiality in a merger,
                financing, acquisition, or transfer of assets;
              </li>
              <li>When you direct or consent to the sharing.</li>
            </ul>

            <h2>6. International processing</h2>
            <p>
              PodVid and its providers may process information outside your
              region. We use reasonable contractual, organizational, and
              security measures as required by applicable law. Data-protection
              rules in those locations may differ from those where you live.
            </p>

            <h2>7. Retention and deletion</h2>
            <p>
              We retain information only as long as reasonably needed to provide
              the Service, maintain account and transaction records, resolve
              disputes, enforce agreements, and meet legal duties. Retention
              varies by purpose, account status, backup cycle, and legal
              requirement. After account deletion, limited data may remain
              during a reasonable backup period or longer where required for
              tax, payment, safety, or legal purposes.
            </p>

            <h2>8. Security</h2>
            <p>
              We use reasonable technical and organizational measures
              appropriate to the nature of the data to reduce the risk of
              unauthorized access, loss, alteration, or disclosure. No internet
              transmission or electronic storage system is completely secure.
              Use a secure login method and report suspicious activity promptly.
            </p>

            <h2>9. Cookies and analytics</h2>
            <p>
              We may use necessary cookies to maintain sessions, remember
              preferences, and protect accounts, and analytics tools to
              understand visits and performance. You can manage cookies in your
              browser settings; disabling necessary cookies may prevent some
              features from working.
            </p>

            <h2>10. Your choices and rights</h2>
            <p>
              Depending on where you live, you may have rights to access,
              correct, delete, export, or restrict our use of your personal
              information, object to certain processing, or withdraw consent.
              Submit a request through account features or by email. To protect
              accounts, we may need to verify the requester’s identity. You may
              also have the right to complain to your local data-protection
              authority.
            </p>

            <h2>11. Children</h2>
            <p>
              PodVid is not directed to children under 13, or a higher minimum
              age where local law requires one. We prohibit sexualized,
              exploitative, or unsafe content involving minors. If you believe a
              child has provided us personal information or you find related
              abuse, contact support immediately.
            </p>

            <h2>12. Policy updates</h2>
            <p>
              We may update this Policy when the Service, technology, or law
              changes. We will provide reasonable notice of material changes
              through the site, account, or email and update the date at the top
              of this page.
            </p>

            <h2>13. Contact</h2>
            <p>
              For privacy requests or questions, email{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
