/**
 * Boyer-Moore-Horspool is a string searching algorithm that finds the first occurrence of a pattern in a text by using a shift table where the pattern is compared with the text from right to left.
 * T: O(m * n) where m is the length of the pattern and n is the length of the text.
 * @see https://www.baeldung.com/java-full-text-search-algorithms
 */
function boyerMooreHorspoolSimpleSearch(pattern: string, text: string): number {
  const patternSize = pattern.length;
  const textSize = text.length;

  let i = 0;
  let j = 0;

  while (i + patternSize <= textSize) {
    j = patternSize - 1;
    while (text[i + j] === pattern[j]) {
      j -= 1;
      if (j < 0) {
        return i;
      }
    }
    i += 1;
  }

  return -1;
}

export { boyerMooreHorspoolSimpleSearch };
