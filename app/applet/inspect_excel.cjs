const XLSX = require('xlsx');
const workbook = XLSX.readFile('Saban Al Mathani- Fractal Quran.xlsx');
console.log("Sheet names:", workbook.SheetNames);
workbook.SheetNames.forEach(sheetName => {
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  console.log(`Sheet "${sheetName}" has ${data.length} rows.`);
  if (data.length > 0) {
    console.log("Sample row 0:", data[0]);
    if (data.length > 1) console.log("Sample row 1:", data[1]);
  }
});
