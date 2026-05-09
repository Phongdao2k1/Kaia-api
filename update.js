const fs = require('fs');

function update() {
    const data = JSON.parse(fs.readFileSync('./realtime.json', 'utf8'));
    const vnTime = new Date(new Date().getTime() + (7 * 60 * 60 * 1000));
    const currentSlot = Math.floor(((vnTime.getHours() * 60) + vnTime.getMinutes()) / 5);

    // CHỈNH OFFSET Ở ĐÂY NẾU BỊ LỆCH (Ví dụ: 1 hoặc -1)
    const OFFSET = 1; 

    data.seeds.forEach(s => s.status = false);
    data.weather.forEach(w => w.status = false);

    const seedIndex = (currentSlot + OFFSET + data.seeds.length) % data.seeds.length;
    const weatherIndex = (currentSlot + OFFSET + data.weather.length) % data.weather.length;

    data.seeds[seedIndex].status = true;
    data.weather[weatherIndex].status = true;

    fs.writeFileSync('./realtime.json', JSON.stringify(data, null, 2));
    console.log(`Updated at ${vnTime.getHours()}:${vnTime.getMinutes()} - Seed: ${data.seeds[seedIndex].name}`);
}
update();
