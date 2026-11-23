import { Bar, Circle, LoadingLabel } from "./skeleton-primitives";
import auth from "@/components/pages/auth/auth-page.module.css";

const range = (length: number) => Array.from({ length }, (_, index) => index);

type AuthExtra = "match" | "benefits" | "note" | "none";

type AuthSkeletonProps = {
  tone?: "default" | "company";
  fields?: number;
  eyebrow?: boolean;
  social?: boolean;
  remember?: boolean;
  otp?: boolean;
  mailIcon?: boolean;
  hint?: boolean;
  extra?: AuthExtra;
  footer?: boolean;
};

function BrandExtraSkeleton({ extra }: { extra: AuthExtra }) {
  if (extra === "match") {
    return (
      <div className={auth.matchCard} aria-hidden="true">
        <div className={auth.matchTop}>
          <Circle size={34} tone="dark" />
          <span style={{ display: "grid", gap: 6, flex: 1 }}>
            <Bar width="min(170px, 100%)" height={11} tone="dark" />
            <Bar width="min(130px, 100%)" height={9} tone="dark" />
          </span>
          <Bar width={34} height={16} tone="dark" />
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {range(2).map((row) => (
            <div
              key={row}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <Bar width={72} height={9} tone="dark" />
              <Bar width={`${50 + row * 15}%`} height={7} tone="dark" />
              <Bar width={34} height={9} tone="dark" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (extra === "benefits") {
    return (
      <div
        className={auth.benefits}
        aria-hidden="true"
        style={{ display: "grid", gap: 12 }}
      >
        {range(3).map((item) => (
          <div
            key={item}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <Bar width={22} height={22} radius={50} tone="dark" />
            <Bar width={`${48 + ((item * 13) % 28)}%`} height={9} tone="dark" />
          </div>
        ))}
      </div>
    );
  }

  if (extra === "note") {
    return (
      <div className={auth.note} aria-hidden="true">
        <Bar width={150} height={11} tone="dark" />
        <div style={{ display: "grid", gap: 7, marginTop: 10 }}>
          <Bar width="100%" height={9} tone="dark" />
          <Bar width="86%" height={9} tone="dark" />
          <Bar width="62%" height={9} tone="dark" />
        </div>
      </div>
    );
  }

  return null;
}

export function AuthSkeleton({
  tone = "default",
  fields = 2,
  eyebrow = false,
  social = false,
  remember = false,
  otp = false,
  mailIcon = false,
  hint = false,
  extra = "none",
  footer = false,
}: AuthSkeletonProps) {
  return (
    <main
      className={auth.screen}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoadingLabel />
      <section
        className={`${auth.brand} ${tone === "company" ? auth.brandCompany : ""}`}
        aria-hidden="true"
      >
        <div className={auth.logo}>
          <Bar width={34} height={34} radius={10} tone="dark" />
          <Bar width={96} height={18} tone="dark" />
        </div>

        <div className={auth.brandMessage}>
          {eyebrow ? <Bar width={110} height={9} tone="dark" /> : null}
          <div style={{ display: "grid", gap: 8 }}>
            <Bar width="78%" height={26} tone="dark" />
            <Bar width="54%" height={26} tone="dark" />
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            <Bar width="94%" height={10} tone="dark" />
            <Bar width="70%" height={10} tone="dark" />
          </div>
        </div>

        <BrandExtraSkeleton extra={extra} />
      </section>

      <section className={auth.formPanel}>
        <div className={auth.topBar} aria-hidden="true">
          <Bar width={150} height={11} />
        </div>
        <div className={auth.formArea}>
          <div className={auth.form} aria-hidden="true">
            {mailIcon ? <Circle size={42} /> : null}
            <div className={auth.intro}>
              <Bar width="min(260px, 100%)" height={26} />
              <Bar width="min(320px, 100%)" height={10} />
            </div>

            {otp ? (
              <>
                <div className={auth.otp}>
                  {range(6).map((digit) => (
                    <Bar key={digit} width={46} height={52} radius={9} />
                  ))}
                </div>
                <Bar width={190} height={9} />
              </>
            ) : (
              range(fields).map((field) => (
                <div key={field} className={auth.field}>
                  <div className={auth.fieldLabel}>
                    <Bar width={field === 0 ? 72 : 92} height={9} />
                  </div>
                  <Bar width="100%" height={46} radius={9} />
                </div>
              ))
            )}

            {remember ? (
              <div
                className={auth.checkRow}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <Bar width={18} height={18} radius={4} />
                <Bar width="min(220px, 100%)" height={9} />
              </div>
            ) : null}

            {hint ? (
              <div className={auth.demoHint}>
                <Bar width="100%" height={9} />
                <Bar width="82%" height={9} />
              </div>
            ) : null}

            <Bar width="100%" height={46} radius={9} tone="accent" />

            {social ? (
              <>
                <div className={auth.divider}>
                  <Bar width="100%" height={1} />
                </div>
                <Bar width="100%" height={46} radius={9} />
              </>
            ) : null}

            {footer ? (
              <div style={{ display: "grid", gap: 8 }}>
                <Bar width="min(210px, 100%)" height={9} />
                <Bar width="min(170px, 100%)" height={9} />
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
