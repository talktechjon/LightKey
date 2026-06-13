async function test() {
    const urls = [
        "https://audio.qurancdn.com/wbw/001_001_001.mp3",
        "https://verses.quran.com/wbw/001_001_001.mp3"
    ];
    for (const u of urls) {
        try {
            const res = await fetch(u, { method: "HEAD" });
            console.log(u, res.status);
        } catch (e) {
            console.log(u, e.message);
        }
    }
}
test();
