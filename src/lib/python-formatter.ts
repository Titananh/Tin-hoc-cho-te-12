/**
 * Basic JavaScript-based Python code formatter
 * Implements a subset of PEP 8 formatting rules:
 * - Normalizes indentation to 4 spaces
 * - Removes trailing whitespace from each line
 * - Ensures single blank line between top-level definitions (def, class)
 * - Ensures no more than 2 consecutive blank lines
 * - Adds newline at end of file if missing
 * - Trims leading/trailing blank lines
 */

export interface FormatResult {
  formattedCode: string;
}

/**
 * Check if a line is a top-level definition (def or class at column 0)
 */
function isTopLevelDefinition(line: string): boolean {
  return /^(def |class )\S/.test(line);
}

/**
 * Normalize indentation: convert tabs to 4 spaces,
 * and normalize mixed indentation to multiples of 4 spaces.
 */
function normalizeIndentation(line: string): string {
  if (line.trim() === '') return '';

  // Count leading whitespace
  let spaces = 0;
  for (const char of line) {
    if (char === '\t') {
      spaces += 4;
    } else if (char === ' ') {
      spaces += 1;
    } else {
      break;
    }
  }

  // Round to nearest multiple of 4 (round up for partial indents)
  const normalizedSpaces = Math.round(spaces / 4) * 4;
  const content = line.trimStart();

  return ' '.repeat(normalizedSpaces) + content;
}

/**
 * Remove trailing whitespace from a line
 */
function removeTrailingWhitespace(line: string): string {
  return line.replace(/\s+$/, '');
}

/**
 * Format Python code according to basic PEP 8 rules
 */
export function formatPythonCode(code: string): FormatResult {
  if (!code || code.trim() === '') {
    return { formattedCode: '' };
  }

  // Split into lines (handle different line endings)
  const lines = code.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  // Step 1: Normalize indentation and remove trailing whitespace
  let processedLines = lines.map((line) => {
    const trimmed = removeTrailingWhitespace(line);
    if (trimmed === '') return '';
    return normalizeIndentation(trimmed);
  });

  // Step 2: Trim leading blank lines
  while (processedLines.length > 0 && processedLines[0] === '') {
    processedLines.shift();
  }

  // Step 3: Trim trailing blank lines
  while (processedLines.length > 0 && processedLines[processedLines.length - 1] === '') {
    processedLines.pop();
  }

  // If nothing left after trimming, return empty
  if (processedLines.length === 0) {
    return { formattedCode: '' };
  }

  // Step 4: Ensure single blank line between top-level definitions
  // and no more than 2 consecutive blank lines anywhere
  const resultLines: string[] = [];
  let consecutiveBlankCount = 0;

  for (let i = 0; i < processedLines.length; i++) {
    const currentLine = processedLines[i];
    const isBlank = currentLine === '';

    if (isBlank) {
      consecutiveBlankCount++;
      // Allow max 2 consecutive blank lines
      if (consecutiveBlankCount <= 2) {
        resultLines.push('');
      }
    } else {
      // Check if we need to insert a blank line before top-level definitions
      if (isTopLevelDefinition(currentLine) && resultLines.length > 0) {
        // Find the last non-blank line
        const lastNonBlankIndex = findLastNonBlankIndex(resultLines);
        if (lastNonBlankIndex >= 0) {
          const blankLinesBetween = resultLines.length - 1 - lastNonBlankIndex;
          // Ensure exactly 1 blank line before top-level def/class
          // (unless it's the very first line)
          if (blankLinesBetween === 0) {
            resultLines.push('');
          }
        }
      }

      consecutiveBlankCount = 0;
      resultLines.push(currentLine);
    }
  }

  // Step 5: Add newline at end of file
  const formattedCode = resultLines.join('\n') + '\n';

  return { formattedCode };
}

/**
 * Find the index of the last non-blank line in an array
 */
function findLastNonBlankIndex(lines: string[]): number {
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i] !== '') {
      return i;
    }
  }
  return -1;
}
