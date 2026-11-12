import { jobs as allJobs } from "@/lib/data/jobs";
import { getCompany } from "@/lib/data/companies";
import { SearchBar } from "./search-bar";
import { SearchFilters } from "./search-filters";
import type { FilterGroup, FilterKey, UpdatedOption } from "./search-filters";
import { SearchResults } from "./search-results";
import styles from "./search-page.module.css";

type SearchPageProps = {
  q?: string;
  location?: string;
  tipe?: string;
  lokasi?: string;
  pengalaman?: string;
  pendidikan?: string;
  kecamatan?: string;
  diperbarui?: string;
  perusahaan?: string;
  urutkan?: string;
};

type JobFilters = {
  q: string;
  location: string;
  tipe: string[];
  lokasi: string[];
  pengalaman: string[];
  pendidikan: string[];
  kecamatan: string[];
  diperbarui: string;
  perusahaan: string;
};

type SortValue = "relevan" | "terbaru" | "gaji";

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: "relevan", label: "Paling relevan" },
  { value: "terbaru", label: "Terbaru" },
  { value: "gaji", label: "Gaji tertinggi" },
];

const UPDATED_OPTIONS = [
  { label: "Kapanpun", value: "" },
  { label: "24 jam terakhir", value: "24 jam terakhir" },
  { label: "Seminggu terakhir", value: "Seminggu terakhir" },
  { label: "Sebulan terakhir", value: "Sebulan terakhir" },
];

const UPDATED_HOURS: Record<string, number> = {
  "24 jam terakhir": 24,
  "Seminggu terakhir": 168,
  "Sebulan terakhir": 720,
};

const TYPE_OPTIONS = [
  "Penuh Waktu",
  "Kontrak",
  "Freelance",
  "Magang",
  "Paruh Waktu",
];

const WORK_STYLE_OPTIONS = [
  "Kerja di lokasi",
  "Kerja di lokasi / rumah",
  "Kerja Remote/dari rumah",
];

const EXPERIENCE_OPTIONS = [
  "Tidak berpengalaman",
  "Fresh Graduate",
  "Kurang dari setahun",
  "1–3 tahun",
  "3–5 tahun",
  "5–10 tahun",
  "Lebih dari 10 tahun",
];

const EDUCATION_OPTIONS = [
  "S3",
  "S2",
  "Pendidikan Profesi",
  "S1",
  "Diploma III",
  "D1-D4",
  "SMA/SMK",
  "SMP",
  "SD",
];

const DISTRICT_OPTIONS = Array.from(
  new Set([
    "Cengkareng",
    "Cilandak",
    "Denpasar Barat",
    "Denpasar Selatan",
    "Grogol Petamburan",
    "Kalideres",
    "Kapanewon Depok",
    "Kebayoran Baru",
    "Kebayoran Lama",
    "Kebon Jeruk",
    "Kelapa Dua",
    "Kelapa Gading",
    "Kembangan",
    "Kuta",
    "Kuta Selatan",
    "Kuta Utara",
    "Pagedangan",
    "Penjaringan",
    "Setiabudi",
    "Tanah Abang",
    ...allJobs
      .map((job) => job.district)
      .filter((district): district is string => Boolean(district)),
  ]),
).sort((a, b) => a.localeCompare(b, "id"));

function parseFilter(value = "") {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseSort(value?: string): SortValue {
  return SORT_OPTIONS.some((option) => option.value === value)
    ? (value as SortValue)
    : "relevan";
}

function filterJobs(filters: JobFilters) {
  const terms = filters.q.toLowerCase().split(/\s+/).filter(Boolean);
  const places = filters.location
    .toLowerCase()
    .split(",")
    .map((place) => place.trim())
    .filter(Boolean);

  return allJobs.filter((job) => {
    const searchable = [
      job.title,
      job.company,
      job.location,
      job.district ?? "",
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
      filters.tipe.length === 0 ||
      filters.tipe.includes(job.employmentType);
    const matchesStyle =
      filters.lokasi.length === 0 || filters.lokasi.includes(job.workStyle);
    const matchesExperience =
      filters.pengalaman.length === 0 ||
      filters.pengalaman.includes(job.experience);
    const matchesEducation =
      filters.pendidikan.length === 0 ||
      filters.pendidikan.includes(job.education);
    const matchesDistrict =
      filters.kecamatan.length === 0 ||
      (job.district !== undefined &&
        filters.kecamatan.includes(job.district));
    const maxHours = UPDATED_HOURS[filters.diperbarui];
    const matchesUpdated = !maxHours || job.postedHours <= maxHours;
    const matchesCompany =
      !filters.perusahaan || job.companySlug === filters.perusahaan;

    return (
      matchesCompany &&
      matchesQuery &&
      matchesLocation &&
      matchesType &&
      matchesStyle &&
      matchesExperience &&
      matchesEducation &&
      matchesDistrict &&
      matchesUpdated
    );
  });
}

function withOption(filters: JobFilters, key: FilterKey, label: string) {
  switch (key) {
    case "tipe":
      return { ...filters, tipe: [label] };
    case "lokasi":
      return { ...filters, lokasi: [label] };
    case "pengalaman":
      return { ...filters, pengalaman: [label] };
    case "pendidikan":
      return { ...filters, pendidikan: [label] };
    case "kecamatan":
      return { ...filters, kecamatan: [label] };
  }
}

function buildGroup(
  filters: JobFilters,
  key: FilterKey,
  title: string,
  labels: string[],
): FilterGroup {
  return {
    key,
    title,
    items: labels.map((label) => ({
      label,
      count: filterJobs(withOption(filters, key, label)).length,
    })),
  };
}

function maxSalary(salaryShort: string) {
  const values = salaryShort.match(/\d+/g)?.map(Number) ?? [0];
  return Math.max(...values);
}

function sortJobs(jobs: typeof allJobs, sort: SortValue) {
  const sorted = [...jobs];

  if (sort === "terbaru") {
    return sorted.sort((a, b) => a.postedHours - b.postedHours);
  }

  if (sort === "gaji") {
    return sorted.sort((a, b) => maxSalary(b.salaryShort) - maxSalary(a.salaryShort));
  }

  return sorted.sort((a, b) => b.match - a.match);
}

export function SearchPage({
  q = "",
  location = "",
  tipe = "",
  lokasi = "",
  pengalaman = "",
  pendidikan = "",
  kecamatan = "",
  diperbarui = "",
  perusahaan = "",
  urutkan = "",
}: SearchPageProps) {
  const filters: JobFilters = {
    q,
    location,
    tipe: parseFilter(tipe),
    lokasi: parseFilter(lokasi),
    pengalaman: parseFilter(pengalaman),
    pendidikan: parseFilter(pendidikan),
    kecamatan: parseFilter(kecamatan),
    diperbarui,
    perusahaan,
  };

  const company = getCompany(perusahaan);
  const matchingJobs = filterJobs(filters);
  const sort = parseSort(urutkan);
  const sortLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label ??
    "Paling relevan";

  const groups: FilterGroup[] = [
    buildGroup(filters, "tipe", "Tipe Pekerjaan", TYPE_OPTIONS),
    buildGroup(filters, "lokasi", "Kebijakan Kerja", WORK_STYLE_OPTIONS),
    buildGroup(filters, "kecamatan", "Kecamatan", DISTRICT_OPTIONS),
    buildGroup(filters, "pengalaman", "Pengalaman", EXPERIENCE_OPTIONS),
    buildGroup(filters, "pendidikan", "Tingkat Pendidikan", EDUCATION_OPTIONS),
  ];

  const updatedOptions: UpdatedOption[] = UPDATED_OPTIONS.map((option) => ({
    ...option,
    count: filterJobs({ ...filters, diperbarui: option.value }).length,
  }));

  return (
    <div className={styles.page}>
      <SearchBar
        q={q}
        location={location}
        tipe={filters.tipe}
        lokasi={filters.lokasi}
        pengalaman={filters.pengalaman}
        pendidikan={filters.pendidikan}
        kecamatan={filters.kecamatan}
        diperbarui={diperbarui}
        perusahaan={perusahaan}
        urutkan={sort}
        companyName={company?.name}
      />
      <main className={styles.content}>
        <SearchFilters
          groups={groups}
          tipe={filters.tipe}
          lokasi={filters.lokasi}
          pengalaman={filters.pengalaman}
          pendidikan={filters.pendidikan}
          kecamatan={filters.kecamatan}
          diperbarui={diperbarui}
          updatedOptions={updatedOptions}
          resultCount={matchingJobs.length}
        />
        <SearchResults
          jobs={sortJobs(matchingJobs, sort)}
          query={q}
          companyName={company?.name}
          sort={sort}
          sortLabel={sortLabel}
          sortOptions={SORT_OPTIONS}
        />
      </main>
    </div>
  );
}
