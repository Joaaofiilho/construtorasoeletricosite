const clamp = (value: number) =>
  Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;

export function scrollProgress(
  scrollY: number,
  scrollHeight: number,
  viewportHeight: number,
  completionY?: number,
): number {
  const range = Math.min(
    scrollHeight - viewportHeight,
    completionY ?? Infinity,
  );
  return range <= 0 ? 1 : clamp(scrollY / range);
}

export function constructionState(progress: number): {
  stage: number;
  phases: number[];
} {
  const p = clamp(progress);
  return {
    stage: Math.min(4, Math.floor(p * 5)),
    phases: Array.from({ length: 5 }, (_, i) => clamp(p * 5 - i)),
  };
}
