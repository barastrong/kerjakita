export const APPLY_STEP_PATHS = [
  "",
  "/cv-portofolio",
  "/pertanyaan",
  "/tinjau",
] as const;

export function applyStepHref(slug: string, step: number) {
  return `/lamar/${slug}${APPLY_STEP_PATHS[step] ?? ""}`;
}
