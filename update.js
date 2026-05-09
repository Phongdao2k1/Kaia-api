const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./realtime.json', 'utf8'));
const minutes = new Date(new Date().getTime() + 7*60*60*1000).getMinutes();
const slot = Math.floor(minutes / 5);

// Reset & Bật ngẫu nhiên để mô phỏng game reload 5p
data.seeds.forEach(s => s.status = false);
data.weather.forEach(w => w.status = false);

data.seeds[slot % data.seeds.length].status = true;
data.weather[slot % data.weather.length].status = true;
data.tools[0].status = true; // Luôn bật vòi tưới thường

fs.writeFileSync('./realtime.json', JSON.stringify(data, null, 2));
