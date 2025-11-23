export function formatNumberShort(num: number) {
  return num
    .toLocaleString("en-US", {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1,
    })
    .replace(/K/i, "K")
    .replace(/M/i, "M")
    .replace(/B/i, "B");
}
