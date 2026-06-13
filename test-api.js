async function test() {
    const res = await fetch("https://api.quran.com/api/v4/verses/by_chapter/2?words=true&word_fields=text_uthmani,audio_url");
    const data = await res.json();
    console.log(data.pagination);
}
test();
