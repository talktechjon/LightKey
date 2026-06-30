import { part1 } from "./defaultTranslation_part1.ts";
import { part2 } from "./defaultTranslation_part2.ts";
import { part3 } from "./defaultTranslation_part3.ts";

export const defaultTranslation: Record<string, string[]> = {
  ...part1,
  ...part2,
  ...part3
};
