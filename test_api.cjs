const fs = require('fs');
const test = async () => {
    try {
        const url = encodeURIComponent('https://wikisubmission.org/quran/1:1');
        const res = await fetch(`https://api.allorigins.win/get?url=${url}`);
        const text = await res.text();
        fs.writeFileSync('output.html', text);
        console.log("Written to output.html", text.length);
    } catch(err) {
        console.error(err);
    }
}
test();
