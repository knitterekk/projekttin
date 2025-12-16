document.addEventListener('DOMContentLoaded', function() {

    // 1. Generowanie tablicy zdjęć
    const images = [];

    // Dodajemy pierwsze zdjęcie (bez numerka)
    images.push('tlo/tlo.jpg');

    // Dodajemy pętlą pozostałe 34 zdjęcia
    const numberedImagesCount = 34;

    for (let i = 1; i <= numberedImagesCount; i++) {
        images.push(`tlo/tlo${i}.jpg`);
    }

    // ZMIANA: Czas ustawiony na 10 sekund (10000 ms)
    const intervalTime = 10000;

    // 2. Logika zmiany tła
    let currentIndex = 0;
    const totalImages = images.length;

    function setBackgroundTheme(prevImg, currentImg, nextImg) {
        document.body.style.setProperty('--bg-prev', `url('${prevImg}')`);
        document.body.style.setProperty('--bg-current', `url('${currentImg}')`);
        document.body.style.setProperty('--bg-next', `url('${nextImg}')`);
    }

    function changeBackground() {
        const currentImg = images[currentIndex];

        const nextIndex = (currentIndex + 1) % totalImages;
        const nextImg = images[nextIndex];

        const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
        const prevImg = images[prevIndex];

        // --- RESETOWANIE ANIMACJI ---

        // 1. Usuwamy klasę
        document.body.classList.remove('anim-active');

        // 2. Wymuszamy przeliczenie stylów (Reflow)
        void document.body.offsetWidth;

        // 3. Podmieniamy zdjęcia
        setBackgroundTheme(prevImg, currentImg, nextImg);

        // 4. Dodajemy klasę ponownie -> uruchamia animację
        document.body.classList.add('anim-active');

        // Przesunięcie indeksu
        currentIndex = nextIndex;
    }

    // 3. Uruchomienie
    if (totalImages >= 3) {
        changeBackground();
        setInterval(changeBackground, intervalTime);
    } else {
        console.error("Za mało zdjęć w tablicy! Wymagane minimum 3.");
    }
});