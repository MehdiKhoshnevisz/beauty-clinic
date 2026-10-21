export const SERVICE_TYPE_KEYS = [
  "hydrafacial",
  "laserHairRemoval",
  "chemicalPeel",
  "botoxConsultation",
  "classicFacial",
  "microdermabrasion",
  "ledLightTherapy",
  "dermaplaning",
  "lipFillerConsultation",
  "antiAgingFacial",
  "bodyContouring",
  "deepCleansingFacial",
] as const;

export type ServiceTypeKey = (typeof SERVICE_TYPE_KEYS)[number];

export function isServiceTypeKey(value: string): value is ServiceTypeKey {
  return (SERVICE_TYPE_KEYS as readonly string[]).includes(value);
}
