const fs = require('fs');

// Read english.txt
const englishTextContent = fs.readFileSync('/app/applet/english.txt', 'utf-8');
const englishMap = new Map();

englishTextContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed) return;
  // Format: "1:1 In the name of Allah..."
  const spaceIndex = trimmed.indexOf(' ');
  if (spaceIndex === -1) return;
  const ref = trimmed.substring(0, spaceIndex);
  const text = trimmed.substring(spaceIndex + 1);
  englishMap.set(ref, text);
});

console.log(`Loaded ${englishMap.size} verses from english.txt`);

// Helper to update a part file
function updatePartFile(filePath, exportName) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // We can evaluate or parse the export, or regex replace the strings.
  // Since each line is like "1:1": ["English", "Bengali"], let's replace the English part.
  // Let's iterate over englishMap and replace where possible.
  
  let updatedCount = 0;
  englishMap.forEach((newEng, ref) => {
    // Regex to find `"1:1": ["...", ""]` or similar
    // Note: escape special regex chars in ref
    const escapedRef = ref.replace(':', '\\:');
    const regex = new RegExp(`("${escapedRef}"\\s*:\\s*\\[\\s*)"([^"]*)"`, 'g');
    if (regex.test(content)) {
      // Escape double quotes inside newEng if any
      const safeEng = newEng.replace(/"/g, '\\"');
      content = content.replace(regex, `$1"${safeEng}"`);
      updatedCount++;
    }
  });

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${updatedCount} verses in ${filePath}`);
}

updatePartFile('/app/applet/data/defaultTranslation_part1.ts', 'part1');
updatePartFile('/app/applet/data/defaultTranslation_part2.ts', 'part2');
updatePartFile('/app/applet/data/defaultTranslation_part3.ts', 'part3');

console.log('Finished updating translation parts.');
