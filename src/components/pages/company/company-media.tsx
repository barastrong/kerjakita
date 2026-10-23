import type { CompanyDetail } from "@/lib/data/companies";
import { CompanyCover } from "./company-cover";
import { CompanyTabs } from "./company-tabs";
import styles from "./company-page.module.css";

type CompanyMediaProps = {
  company: CompanyDetail;
};

const PHOTO_COLORS = [
  "#C7D2FE",
  "#BBF7D0",
  "#FDE68A",
  "#FBCFE8",
  "#BAE6FD",
  "#DDD6FE",
];

function getCities(locations: string) {
  const [first, second] = locations.split(" dan ");
  const primary = (first ?? "").split(",")[0].trim() || "Jakarta";
  const secondary = (second ?? "").trim() || "pusat";

  return { primary, secondary };
}

export function CompanyMedia({ company }: CompanyMediaProps) {
  const { primary, secondary } = getCities(company.locations);
  const secondaryName = secondary === "pusat" ? primary : secondary;
  const photos = [
    `Kantor ${primary}`,
    "Ruang kolaborasi",
    "Pantry dan area santai",
    "Hackathon 2026",
    `Kantor ${secondary}`,
    "Gathering tahunan",
  ];
  const palette = [
    {
      hex: company.color.toUpperCase(),
      name: company.slug === "tokoloka" ? "Biru utama" : "Warna utama",
    },
    { hex: "#101A3A", name: "Navy" },
    { hex: "#0B7A62", name: "Hijau" },
    { hex: "#FFF1CC", name: "Krem emas" },
  ];
  const smallVideos = [
    {
      title: "Hackathon internal 2026",
      meta: "2:15 · Acara tahunan",
      color: "#0B7A62",
    },
    {
      title: `Cerita tim ${secondaryName}`,
      meta: "1:58 · Tim Operasional",
      color: "#C2410C",
    },
  ];

  return (
    <div className={styles.page}>
      <CompanyCover company={company} />
      <CompanyTabs company={company} active="foto" />
      <main className={styles.mediaContent}>
        <section className={styles.mediaSection}>
          <div className={styles.mediaHeading}>
            <h2 className={styles.mediaTitle}>Video budaya kerja</h2>
            <p className={styles.mediaSubtitle}>
              Lihat langsung suasana tim dan cara kerja di {company.name}.
            </p>
          </div>

          <div className={styles.videoRow}>
            <article className={`${styles.videoCard} ${styles.videoLarge}`}>
              <div
                className={styles.videoThumb}
                style={{
                  backgroundColor:
                    company.slug === "tokoloka" ? "#2B2F8F" : company.color,
                }}
              >
                <span className={styles.playButton} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
              <div className={styles.videoText}>
                <h3 className={styles.videoTitle}>
                  Sehari di kantor {company.name}
                </h3>
                <p className={styles.videoMeta}>
                  3:42 · Tim Produk dan Desain
                </p>
              </div>
            </article>

            <div className={styles.videoSide}>
              {smallVideos.map((video) => (
                <article
                  key={video.title}
                  className={`${styles.videoCard} ${styles.videoSmall}`}
                >
                  <div
                    className={styles.videoThumb}
                    style={{ backgroundColor: video.color }}
                  >
                    <span className={styles.playButton} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </div>
                  <div className={styles.videoText}>
                    <h3 className={styles.videoTitle}>{video.title}</h3>
                    <p className={styles.videoMeta}>{video.meta}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.mediaSection}>
          <div className={styles.mediaHeading}>
            <h2 className={styles.mediaTitle}>Foto kantor dan acara</h2>
            <p className={styles.mediaSubtitle}>
              Tampilan di bawah memakai blok warna sebagai tempat foto asli.
            </p>
          </div>

          <div className={styles.photoGrid}>
            {photos.map((photo, index) => (
              <div
                key={photo}
                className={styles.photo}
                style={{
                  backgroundColor: PHOTO_COLORS[index % PHOTO_COLORS.length],
                }}
              >
                <span className={styles.photoTag}>{photo}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.mediaSection}>
          <div className={styles.mediaHeading}>
            <h2 className={styles.mediaTitle}>Identitas visual</h2>
            <p className={styles.mediaSubtitle}>
              Logo, warna, dan huruf yang dipakai {company.name} di materi
              rekrutmen.
            </p>
          </div>

          <div className={styles.identityCard}>
            <div className={styles.identityLogo}>
              <span
                className={styles.identityLogoMark}
                style={{ backgroundColor: company.color }}
                aria-hidden="true"
              >
                {company.initials}
              </span>
              <span className={styles.identityCaption}>Logo utama</span>
            </div>

            <div className={styles.identityPalette}>
              <span className={styles.identityLabel}>Palet warna</span>
              <div className={styles.swatches}>
                {palette.map((color) => (
                  <div key={color.hex} className={styles.swatch}>
                    <div
                      className={styles.swatchColor}
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className={styles.swatchHex}>{color.hex}</p>
                    <p className={styles.swatchName}>{color.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.identityType}>
              <span className={styles.identityLabel}>Huruf</span>
              <span className={styles.typeSample}>Aa</span>
              <span className={styles.typeName}>
                Bricolage Grotesque · Plus Jakarta Sans
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
