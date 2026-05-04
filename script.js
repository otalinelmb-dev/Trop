document.addEventListener('DOMContentLoaded', () => {
    const scanZone = document.getElementById('scan-zone');
    const feedback = document.getElementById('feedback');
    const uiBox = document.getElementById('ui-box');
    const resultScreen = document.getElementById('result-screen');
    const countdown = document.getElementById('countdown');
    const batteryElement = document.getElementById('battery');

    // Récupérer la batterie via l'objet navigator (intégré au navigateur)
    if (navigator.getBattery) {
        navigator.getBattery().then(bat => {
            batteryElement.innerText = Math.floor(bat.level * 100) + "%";
            // Mise à jour si le niveau change
            bat.addEventListener('levelchange', () => {
                batteryElement.innerText = Math.floor(bat.level * 100) + "%";
            });
        });
    } else {
        batteryElement.innerText = "100%"; // Valeur par défaut si non supporté
    }

    // Gestion du Scan (Détection du toucher)
    scanZone.addEventListener('pointerdown', (e) => {
        // Vibration via navigator
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }
        
        feedback.innerText = "SYNCHRONISATION BIOMÉTRIQUE...";
        feedback.classList.add('blink');
        feedback.style.color = "#ff003c";

        // Déclenchement du résultat après 4 secondes
        setTimeout(() => {
            uiBox.classList.add('hidden');
            resultScreen.classList.remove('hidden');
            startGlobalTimer();
        }, 4000);
    });

    function startGlobalTimer() {
        let timeLeft = 86400; // 24 heures en secondes
        const timerInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) clearInterval(timerInterval);
            
            let h = Math.floor(timeLeft / 3600);
            let m = Math.floor((timeLeft % 3600) / 60);
            let s = timeLeft % 60;
            
            countdown.innerText = 
                `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }, 1000);
    }
});
