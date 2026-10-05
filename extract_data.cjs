const fs = require('fs');
const content = fs.readFileSync('000 Ahsan Al Hadith.txt', 'utf-8');
const match = content.match(/const VERSE_DATA = (\[\[.*\]\]);/s);
if (match) {
  const data = match[1];
  fs.writeFileSync('data/smithChartData.ts', `export const VERSE_DATA: [string, number, number, string][] = ${data};`);
  console.log('Successfully extracted VERSE_DATA to data/smithChartData.ts');
} else {
  console.log('VERSE_DATA not found in 000 Ahsan Al Hadith.txt');
}
