document.addEventListener('DOMContentLoaded', () => {
    const scanZone = document.getElementById('scan-zone');
    const feedback = document.getElementById('feedback');
    const uiBox = document.getElementById('ui-box');
    const resultScreen = document.getElementById('result-screen');
    const countdown = document.getElementById('countdown');

    // Récupérer la batterie pour le réalisme
    if (navigator.getBattery) {
        navigator.getBattery().then(bat => {
            document.getElementById('battery').innerText = Math.floor(bat.level * 100) + "%";
        });
    }

    // Gestion du Scan (Mobile)
    scanZone.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        feedback.innerText = "SYNCHRONISATION BIOMÉTRIQUE...";
        feedback.classList.add('blink');
        
        setTimeout(() => {
            uiBox.classList.add('hidden');
            resultScreen.classList.remove('hidden');
            startGlobalTimer();
        }, 4000); // 4 secondes de scan
    });

    function startGlobalTimer() {
        let timeLeft = 86400; // 24 heures
        setInterval(() => {
            timeLeft--;
            let h = Math.floor(timeLeft / 3600);
            let m = Math.floor((timeLeft % 3600) / 60);
            let s = timeLeft % 60;
            countdown.innerText = 
                `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }, 1000);
    }
});
