const fs = require('fs');

const englishTextContent = fs.readFileSync('english.txt', 'utf-8');
const englishMap = new Map();

englishTextContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed) return;
  const spaceIndex = trimmed.indexOf(' ');
  if (spaceIndex === -1) return;
  const ref = trimmed.substring(0, spaceIndex);
  const text = trimmed.substring(spaceIndex + 1);
  englishMap.set(ref, text);
});

console.log(`Loaded ${englishMap.size} verses from english.txt`);

function fixPart(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let updatedCount = 0;

  // Match a full JSON-like entry: "ref": ["old_english", "bangla"]
  // Since English might contain escaped quotes, let's match carefully.
  // Pattern: "(\d+:\d+)"\s*:\s*\[\s*"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"\s*\]
  const regex = /"(\d+:\d+)"\s*:\s*\[\s*"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"\s*\]/g;

  content = content.replace(regex, (match, ref, oldEng, bangla) => {
    if (englishMap.has(ref)) {
      const newEng = englishMap.get(ref).replace(/["\\]/g, (m) => '\\' + m);
      updatedCount++;
      return `\"${ref}\": [\"${newEng}\", \"${bangla}\"]`;
    }
    return match;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Fixed and updated ${updatedCount} verses in ${filePath}`);
}

// Wait, since we did git checkout which failed because no .git, let's check if we have backup files in .restore_points or if we can revert using git init / restore points or if we can re-extract from defaultTranslation backup.
// Let's check what .restore_points directory contains!
