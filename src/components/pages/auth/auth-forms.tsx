"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckIcon,
  ChevronLeftIcon,
  CloseIcon,
  EyeIcon,
  EyeOffIcon,
  MailIcon,
} from "@/components/ui/icons/icons";
import { SESSION_COOKIE } from "@/lib/data/session";
import styles from "./auth-page.module.css";

function FormIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className={styles.intro}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{description}</p>
    </div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  autoComplete?: string;
  required?: boolean;
  invalid?: boolean;
  action?: React.ReactNode;
};

function Field({
  id,
  label,
  type = "text",
  placeholder,
  defaultValue,
  value,
  onChange,
  autoComplete,
  required,
  invalid,
  action,
}: FieldProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={styles.field}>
      <div className={styles.fieldLabel}>
        <label htmlFor={id}>{label}</label>
        {action}
      </div>
      <div className={styles.inputWrap}>
        <input
          id={id}
          name={id}
          type={isPassword && visible ? "text" : type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={
            onChange ? (event) => onChange(event.target.value) : undefined
          }
          autoComplete={autoComplete}
          required={required}
          aria-invalid={invalid || undefined}
          className={`${styles.input} ${isPassword ? styles.inputPassword : ""}`}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.reveal}
            aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
            aria-pressed={visible}
            onClick={() => setVisible((current) => !current)}
          >
            {visible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

function Checkbox({
  id,
  children,
  defaultChecked = false,
}: {
  id: string;
  children: React.ReactNode;
  defaultChecked?: boolean;
}) {
  return (
    <label className={styles.checkRow} htmlFor={id}>
      <input
        id={id}
        name={id}
        type="checkbox"
        defaultChecked={defaultChecked}
        className={styles.checkInput}
      />
      <span className={styles.checkBox} aria-hidden="true">
        <CheckIcon size={12} />
      </span>
      <span>{children}</span>
    </label>
  );
}

function Divider() {
  return (
    <div className={styles.divider} aria-hidden="true">
      <span />
      atau
      <span />
    </div>
  );
}

function GoogleButton() {
  return (
    <button type="button" className={styles.google}>
      <span className={styles.googleMark} aria-hidden="true">
        G
      </span>
      Lanjutkan dengan Google
    </button>
  );
}

function passwordScore(password: string) {
  return [
    password.length >= 8,
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;
}

const STRENGTH_LABELS = ["lemah", "lemah", "cukup", "kuat", "sangat kuat"];

function PasswordStrength({
  id,
  password,
}: {
  id: string;
  password: string;
}) {
  const score = passwordScore(password);

  return (
    <div className={styles.strength} id={id}>
      <span className={styles.strengthBars} aria-hidden="true">
        {[0, 1, 2, 3].map((index) => (
          <span
            key={index}
            className={index >= score ? styles.strengthEmpty : ""}
          />
        ))}
      </span>
      <p>Kekuatan password: {STRENGTH_LABELS[score]}</p>
    </div>
  );
}

function Criteria({ password }: { password: string }) {
  const criteria = [
    { label: "Minimal 8 karakter", met: password.length >= 8 },
    { label: "Ada huruf besar", met: /[A-Z]/.test(password) },
    { label: "Ada angka", met: /\d/.test(password) },
    { label: "Ada simbol", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <ul className={styles.criteria}>
      {criteria.map((criterion) => (
        <li
          key={criterion.label}
          className={criterion.met ? "" : styles.criterionUnmet}
        >
          <span
            className={`${styles.criterionIcon} ${
              criterion.met ? styles.criterionMet : ""
            }`}
            aria-hidden="true"
          >
            {criterion.met ? (
              <CheckIcon size={11} />
            ) : (
              <CloseIcon size={11} />
            )}
          </span>
          {criterion.label}
        </li>
      ))}
    </ul>
  );
}

export function LoginForm() {
  const router = useRouter();

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        document.cookie =
          "kerjakita-session=1; path=/; max-age=86400; samesite=lax";
        const next = new URLSearchParams(window.location.search).get("next");
        router.push(next?.startsWith("/") ? next : "/pelamar/ringkasan");
        router.refresh();
      }}
    >
      <FormIntro
        title="Selamat datang kembali"
        description="Masuk untuk melanjutkan."
      />
      <Field
        id="login-email"
        label="Email"
        type="email"
        placeholder="nama@email.com"
        autoComplete="email"
        required
      />
      <Field
        id="login-password"
        label="Password"
        type="password"
        placeholder="Masukkan password"
        autoComplete="current-password"
        required
        action={
          <Link href="/lupa-password" className={styles.inlineLink}>
            Lupa password?
          </Link>
        }
      />
      <Checkbox id="remember" defaultChecked>
        Ingat saya di perangkat ini
      </Checkbox>
      <button type="submit" className={styles.submit}>
        Masuk
      </button>
      <Divider />
      <GoogleButton />
      <p className={styles.formFooter}>
        Belum punya akun? <Link href="/daftar">Daftar</Link>
      </p>
    </form>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        if (password !== confirmation) {
          setError("Password dan ulangi password harus sama.");
          return;
        }
        router.push("/verifikasi-otp");
      }}
    >
      <FormIntro
        title="Buat akun Kerjakita"
        description="Gratis, tidak sampai dua menit."
      />
      <Field
        id="register-name"
        label="Nama lengkap"
        placeholder="Nama sesuai identitas"
        autoComplete="name"
        required
      />
      <Field
        id="register-email"
        label="Email"
        type="email"
        placeholder="nama@email.com"
        autoComplete="email"
        required
      />
      <Field
        id="register-password"
        label="Password"
        type="password"
        placeholder="Buat password"
        value={password}
        onChange={setPassword}
        autoComplete="new-password"
        required
      />
      <PasswordStrength id="register-strength" password={password} />
      <Criteria password={password} />
      <Field
        id="register-confirm-password"
        label="Ulangi password"
        type="password"
        placeholder="Ulangi password"
        value={confirmation}
        onChange={(value) => {
          setConfirmation(value);
          setError("");
        }}
        autoComplete="new-password"
        required
        invalid={Boolean(error)}
      />
      {error && (
        <p className={styles.formError} role="alert">
          {error}
        </p>
      )}
      <Checkbox id="terms" defaultChecked>
        Saya setuju dengan Syarat dan Kebijakan Privasi
      </Checkbox>
      <button type="submit" className={styles.submit}>
        Buat akun
      </button>
      <Divider />
      <GoogleButton />
      <p className={styles.formFooter}>
        Sudah punya akun? <Link href="/masuk">Masuk</Link>
      </p>
    </form>
  );
}

export function OtpForm() {
  const router = useRouter();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  function updateFrom(index: number, raw: string) {
    const value = raw.replace(/\D/g, "");
    const next = [...digits];

    if (!value) {
      next[index] = "";
      setDigits(next);
      return;
    }

    value
      .slice(0, 6 - index)
      .split("")
      .forEach((digit, offset) => {
        next[index + offset] = digit;
      });
    setDigits(next);
    inputs.current[Math.min(5, index + value.length)]?.focus();
  }

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        document.cookie = `${SESSION_COOKIE}=1; path=/; max-age=86400; samesite=lax`;
        router.push("/pelamar/ringkasan");
        router.refresh();
      }}
    >
      <FormIntro
        title="Verifikasi email kamu"
        description="Kami mengirim kode 6 digit ke rani.ayu@email.com."
      />
      <div className={styles.otp} onPaste={(event) => {
        const value = event.clipboardData.getData("text").replace(/\D/g, "");
        if (!value) return;

        event.preventDefault();
        const next = [...digits];
        value
          .slice(0, 6)
          .split("")
          .forEach((digit, index) => {
            next[index] = digit;
          });
        setDigits(next);
        inputs.current[Math.min(5, value.length - 1)]?.focus();
      }}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputs.current[index] = element;
            }}
            value={digit}
            placeholder="0"
            onChange={(event) => updateFrom(index, event.target.value)}
            onFocus={(event) => event.target.select()}
            onKeyDown={(event) => {
              if (event.key === "Backspace" && !digits[index] && index > 0) {
                event.preventDefault();
                inputs.current[index - 1]?.focus();
              }
            }}
            aria-label={`Digit ${index + 1}`}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            autoFocus={index === 0}
            className={styles.otpInput}
          />
        ))}
      </div>
      <p className={styles.timer}>
        Kirim ulang kode dalam <strong>00:42</strong>
      </p>
      <button type="submit" className={styles.submit}>
        Verifikasi
      </button>
      <div className={styles.otpActions}>
        <button type="button" className={styles.textButton}>
          Kirim ulang kode
        </button>
        <Link href="/daftar" className={styles.inlineLink}>
          Ubah email
        </Link>
      </div>
    </form>
  );
}

export function ForgotPasswordForm() {
  const router = useRouter();

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        router.push("/atur-password-baru");
      }}
    >
      <span className={styles.mailIcon} aria-hidden="true">
        <MailIcon size={26} />
      </span>
      <FormIntro
        title="Lupa password?"
        description="Kami akan mengirim tautan reset ke emailmu. Tautan berlaku 30 menit."
      />
      <Field
        id="reset-email"
        label="Email terdaftar"
        type="email"
        placeholder="nama@email.com"
        autoComplete="email"
        required
      />
      <button type="submit" className={styles.submit}>
        Kirim tautan reset
      </button>
      <Link href="/masuk" className={styles.backToLogin}>
        <ChevronLeftIcon size={16} />
        Kembali ke masuk
      </Link>
    </form>
  );
}

export function NewPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        if (password !== confirmation) {
          setError("Password dan ulangi password harus sama.");
          return;
        }
        router.push("/masuk");
      }}
    >
      <FormIntro
        title="Atur password baru"
        description="Password lama tidak akan berlaku lagi."
      />
      <Field
        id="new-password"
        label="Password baru"
        type="password"
        placeholder="Buat password baru"
        value={password}
        onChange={setPassword}
        autoComplete="new-password"
        required
      />
      <PasswordStrength id="new-password-strength" password={password} />
      <Field
        id="confirm-password"
        label="Ulangi password baru"
        type="password"
        placeholder="Ulangi password baru"
        value={confirmation}
        onChange={(value) => {
          setConfirmation(value);
          setError("");
        }}
        autoComplete="new-password"
        required
        invalid={Boolean(error)}
      />
      {error && (
        <p className={styles.formError} role="alert">
          {error}
        </p>
      )}
      <Criteria password={password} />
      <button type="submit" className={styles.submit}>
        Simpan password baru
      </button>
      <Link href="/masuk" className={styles.backToLogin}>
        <ChevronLeftIcon size={16} />
        Kembali ke masuk
      </Link>
    </form>
  );
}
