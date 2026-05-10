const fs = require('fs');

function update() {
    try {
        const data = JSON.parse(fs.readFileSync('./realtime.json', 'utf8'));
        
        // Lấy giờ Việt Nam chuẩn (GMT+7)
        const now = new Date();
        const vnTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));
        
        const hours = vnTime.getUTCHours();
        const minutes = vnTime.getUTCMinutes();
        
        // Tính slot 5 phút (mỗi ngày có 288 slot)
        const totalMinutes = (hours * 60) + minutes;
        const currentSlot = Math.floor(totalMinutes / 5);

        // Biến OFFSET để chỉnh độ lệch (nếu sai hạt thì sửa số này)
        const OFFSET = -1; 

        // Reset trạng thái cũ
        data.seeds.forEach(s => s.status = false);
        data.weather.forEach(w => w.status = false);

        // Tính toán Index dựa trên số lượng hạt giống (28 món) và thời tiết (14 món)
        const seedIndex = (currentSlot + OFFSET) % data.seeds.length;
        const weatherIndex = (currentSlot + OFFSET) % data.weather.length;

        // Cập nhật trạng thái mới
        data.seeds[seedIndex].status = true;
        data.weather[weatherIndex].status = true;

        fs.writeFileSync('./realtime.json', JSON.stringify(data, null, 2));
        console.log(`[${hours}:${minutes}] Đã cập nhật hạt: ${data.seeds[seedIndex].name}`);
    } catch (err) {
        console.error("Lỗi khi update:", err);
    }
}
update();
