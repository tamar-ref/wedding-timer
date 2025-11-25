function startCountdown(dates) {
    dates.forEach((date, index) => {
        const target = new Date(
            date.year,
            date.month - 1,
            date.day,
            date.hour,
            date.minute,
            date.second
        );

        // עדכון ספירה לאחור לכל אירוע
        function updateCountdown() {
            const now = new Date();
            const diff = target - now;

            const container = document.getElementById(`date-${index}`);

            if (diff <= 0) {
                container.innerHTML = "";
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            container.innerHTML = `
                <h1>${date.title}</h1>
                <div class="countdown">
                    <div class="time-box">
                        <div class="number">${String(days).padStart(2, '0')}</div>
                        <div class="label">ימים</div>
                    </div>
                    <div class="time-box">
                        <div class="number">${String(hours).padStart(2, '0')}</div>
                        <div class="label">שעות</div>
                    </div>
                    <div class="time-box">
                        <div class="number">${String(minutes).padStart(2, '0')}</div>
                        <div class="label">דקות</div>
                    </div>
                    <div class="time-box">
                        <div class="number">${String(seconds).padStart(2, '0')}</div>
                        <div class="label">שניות</div>
                    </div>
                </div>
            `;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
}

// יצירת אלמנטים לכל אירוע
const container = document.getElementById("all");
dates.forEach((date, index) => {
    const div = document.createElement("div");
    div.id = `date-${index}`;
    div.className = "date-container";
    container.appendChild(div);
});

startCountdown(dates);
