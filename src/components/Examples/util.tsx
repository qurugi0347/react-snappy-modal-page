export function removeImportLines(code: string): string {
  // import 문을 제거합니다
  const importRegex = /^import\s+.*?;?\s*$/gm;
  const codeWithoutImports = code
    .replace(/export /g, "")
    .replace(importRegex, "");

  // 연속된 빈 줄을 단일 빈 줄로 정리합니다
  const multipleEmptyLinesRegex = /\n\s*\n\s*\n/g;
  const codeWithSingleEmptyLines = codeWithoutImports.replace(
    multipleEmptyLinesRegex,
    "\n\n",
  );

  // 파일 시작 부분의 빈 줄을 제거합니다
  const startingEmptyLinesRegex = /^\s*\n+/;
  return codeWithSingleEmptyLines.replace(startingEmptyLinesRegex, "");
}
