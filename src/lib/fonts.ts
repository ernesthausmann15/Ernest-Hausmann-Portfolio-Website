import { Instrument_Serif } from "next/font/google";

/**
 * Display face for names and section titles.
 *
 * What: A single serif used only for headlines.
 * Why: Body copy stays in Geist so the interface stays readable. The serif
 *      is reserved for the moments a recruiter should remember.
 * How: next/font self-hosts the file and exposes `className`, which applies
 *      the real generated family name. That is more reliable than guessing
 *      the family string inside Tailwind's theme.
 */
export const displayFont = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
