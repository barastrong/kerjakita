import { jobs as allJobs } from "@/lib/data/jobs";
import { SearchBar } from "./search-bar";
import { SearchFilters } from "./search-filters";
import { SearchResults } from "./search-results";
import styles from "./search-page.module.css";

type SearchPageProps = {
  q?: string;
  location?: string;
  tipe?: string;
  lokasi?: string;
  pengalaman?: string;
  kecamatan?: string;
  diperbarui?: string;
};

function parseFilter(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

const UPDATED_HOURS: Record<string, number> = {
  "24 jam terakhir": 24,
  "Seminggu terakhir": 168,
  "Sebulan terakhir": 720,
};

export function filterJobs(
  q: string,
  location: string,
  tipe: string[] = [],
  lokasi: string[] = [],
  pengalaman: string[] = [],
  kecamatan: string[] = [],
  diperbarui = "",
) {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const places = location
    .toLowerCase()
    .split(",")
    .map((place) => place.trim())
    .filter(Boolean);

  return allJobs.filter((job) => {
    const searchable = [
      job.title,
      job.company,
      job.location,
      job.workStyle,
      job.employmentType,
      ...(job.searchSkills ?? job.skills),
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery =
      terms.length === 0 || terms.some((term) => searchable.includes(term));
    const matchesLocation =
      places.length === 0 ||
      places.some((place) =>
        [job.location, job.workStyle, job.company]
          .join(" ")
          .toLowerCase()
          .includes(place),
      );
    const matchesType =
      tipe.length === 0 || tipe.includes(job.employmentType);
    const matchesStyle =
      lokasi.length === 0 || lokasi.includes(job.workStyle);
    const matchesExperience =
      pengalaman.length === 0 || pengalaman.includes(job.experience);
    const matchesDistrict =
      kecamatan.length === 0 ||
      (job.district !== undefined && kecamatan.includes(job.district));
    const maxHours = UPDATED_HOURS[diperbarui];
    const matchesUpdated = !maxHours || job.postedHours <= maxHours;

    return (
      matchesQuery &&
      matchesLocation &&
      matchesType &&
      matchesStyle &&
      matchesExperience &&
      matchesDistrict &&
      matchesUpdated
    );
  });
}

export function SearchPage({
  q = "",
  location = "",
  tipe = "",
  lokasi = "",
  pengalaman = "",
  kecamatan = "",
  diperbarui = "",
}: SearchPageProps) {
  const types = parseFilter(tipe);
  const workStyles = parseFilter(lokasi);
  const experiences = parseFilter(pengalaman);
  const districts = parseFilter(kecamatan);
  const jobs = filterJobs(
    q,
    location,
    types,
    workStyles,
    experiences,
    districts,
    diperbarui,
  );

  return (
    <div className={styles.page}>
      <SearchBar
        q={q}
        location={location}
        tipe={types}
        lokasi={workStyles}
        pengalaman={experiences}
        kecamatan={districts}
        diperbarui={diperbarui}
      />
      <main className={styles.content}>
        <SearchFilters
          tipe={types}
          lokasi={workStyles}
          pengalaman={experiences}
          kecamatan={districts}
          diperbarui={diperbarui}
        />
        <SearchResults jobs={jobs} query={q} />
      </main>
    </div>
  );
}
