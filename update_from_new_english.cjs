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

console.log(`Loaded ${englishMap.size} verses from updated english.txt`);

function safeUpdatePart(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let count = 0;
  
  const regex = /"(\d+:\d+)"\s*:\s*\[\s*"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"\s*\]/g;

  content = content.replace(regex, (match, ref, oldEng, bangla) => {
    if (englishMap.has(ref)) {
      const newEng = englishMap.get(ref);
      const escapedEng = newEng.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      count++;
      return `"${ref}": ["${escapedEng}", "${bangla}"]`;
    }
    return match;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Successfully updated ${count} verses in ${filePath}`);
}

safeUpdatePart('data/defaultTranslation_part1.ts');
safeUpdatePart('data/defaultTranslation_part2.ts');
safeUpdatePart('data/defaultTranslation_part3.ts');
console.log('All parts updated from new english.txt.');
