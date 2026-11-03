const fs = require('fs');
const XLSX = require('xlsx');

const workbook = XLSX.readFile('Saban Al Mathani- Fractal Quran.xlsx');
const sheet = workbook.Sheets['Verses'];
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

const excelMap = new Map();
for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  if (r && r[0]) {
    const ref = String(r[0]).trim();
    const trans = r[3] ? String(r[3]).trim() : '';
    if (ref && trans) {
      excelMap.set(ref, trans);
    }
  }
}

console.log(`Loaded ${excelMap.size} translations from Excel Verses sheet.`);

function updatePartFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let count = 0;

  // Regex to match "X:X": ["English", "Bangla"]
  const regex = /"(\d+:\d+)"\s*:\s*\[\s*"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"\s*\]/g;

  content = content.replace(regex, (match, ref, oldEng, oldBangla) => {
    if (excelMap.has(ref)) {
      const newEng = excelMap.get(ref);
      const escapedEng = newEng.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      
      // Let's refine Bangla alignment if needed, or keep/enhance Bangla translation
      // For instance, ensuring key terms like Kitab, Rabb, Rahman, Raheem, muttaqin, ghayb, etc., match well.
      let newBangla = oldBangla;
      // If oldBangla was generic or could be improved, let's keep it or adjust slightly for key terms
      count++;
      return `"${ref}": ["${escapedEng}", "${newBangla}"]`;
    }
    return match;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${count} verses in ${filePath}`);
}

updatePartFile('data/defaultTranslation_part1.ts');
updatePartFile('data/defaultTranslation_part2.ts');
updatePartFile('data/defaultTranslation_part3.ts');
console.log('All part files successfully updated from Saban Al Mathani- Fractal Quran.xlsx');
