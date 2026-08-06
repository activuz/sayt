/**
 * Uzbek Latin to Cyrillic Transliteration Engine
 * Converts any Latin Uzbek string or object structure into standard Uzbek Cyrillic.
 */

const LATIN_TO_CYRILLIC_MAP: [RegExp, string][] = [
  // Compound letter combinations (Case preserved)
  [/O['`’]/g, "Ў"],
  [/o['`’]/g, "ў"],
  [/G['`’]/g, "Ғ"],
  [/g['`’]/g, "ғ"],
  [/SH/g, "Ш"],
  [/Sh/g, "Ш"],
  [/sh/g, "ш"],
  [/CH/g, "Ч"],
  [/Ch/g, "Ч"],
  [/ch/g, "ч"],
  [/YO/g, "Ё"],
  [/Yo/g, "Ё"],
  [/yo/g, "ё"],
  [/YU/g, "Ю"],
  [/Yu/g, "Ю"],
  [/yu/g, "ю"],
  [/YA/g, "Я"],
  [/Ya/g, "Я"],
  [/ya/g, "я"],
  [/YE/g, "Е"],
  [/Ye/g, "Е"],
  [/ye/g, "е"],
  [/TS/g, "Ц"],
  [/Ts/g, "Ц"],
  [/ts/g, "ц"],

  // Single characters
  [/A/g, "А"],
  [/a/g, "а"],
  [/B/g, "Б"],
  [/b/g, "б"],
  [/D/g, "Д"],
  [/d/g, "д"],
  [/E/g, "Е"],
  [/e/g, "е"],
  [/F/g, "Ф"],
  [/f/g, "ф"],
  [/G/g, "Г"],
  [/g/g, "г"],
  [/H/g, "Ҳ"],
  [/h/g, "ҳ"],
  [/I/g, "И"],
  [/i/g, "и"],
  [/J/g, "Ж"],
  [/j/g, "ж"],
  [/K/g, "К"],
  [/k/g, "к"],
  [/L/g, "Л"],
  [/l/g, "л"],
  [/M/g, "М"],
  [/m/g, "м"],
  [/N/g, "Н"],
  [/n/g, "н"],
  [/O/g, "О"],
  [/o/g, "о"],
  [/P/g, "П"],
  [/p/g, "п"],
  [/Q/g, "Қ"],
  [/q/g, "қ"],
  [/R/g, "Р"],
  [/r/g, "р"],
  [/S/g, "С"],
  [/s/g, "с"],
  [/T/g, "Т"],
  [/t/g, "т"],
  [/U/g, "У"],
  [/u/g, "у"],
  [/V/g, "В"],
  [/v/g, "в"],
  [/X/g, "Х"],
  [/x/g, "х"],
  [/Y/g, "Й"],
  [/y/g, "й"],
  [/Z/g, "З"],
  [/z/g, "з"],
  [/['`’]/g, "ъ"],
];

/**
 * Converts a Latin string into Cyrillic string.
 */
export function toCyrillic(text: string): string {
  if (!text) return text;
  let result = text;
  for (const [pattern, replacement] of LATIN_TO_CYRILLIC_MAP) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

/**
 * Recursively transliterates any object, array, or string from Latin to Cyrillic.
 */
export function transliterateObject<T>(obj: T): T {
  if (typeof obj === "string") {
    return toCyrillic(obj) as unknown as T;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => transliterateObject(item)) as unknown as T;
  }
  if (obj !== null && typeof obj === "object") {
    const res: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
      res[key] = transliterateObject((obj as Record<string, any>)[key]);
    }
    return res as T;
  }
  return obj;
}
