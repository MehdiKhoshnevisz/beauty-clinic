export { cn } from "cn";

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("");
}

export function translateService(
  serviceType: string,
  t: (key: string) => string,
) {
  const key = `services.${serviceType}`;
  const translated = t(key);
  return translated === key ? serviceType : translated;
}

export function getPageItems(
  current: number,
  total: number,
): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const items: Array<number | "ellipsis"> = [1];

  if (current > 3) {
    items.push("ellipsis");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (current < total - 2) {
    items.push("ellipsis");
  }

  items.push(total);
  return items;
}
