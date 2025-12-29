document.addEventListener('DOMContentLoaded', function() {

    // 1. Generowanie tablicy zdjęć
    const images = [];

    // Dodaj pierwsze zdjęcie
    images.push('tlo/tlo.webp');

    // Dodaj kolejne zdjęcia
    const numberedImagesCount = 32;

    for (let i = 1; i <= numberedImagesCount; i++) {
        images.push(`tlo/tlo${i}.webp`);
    }

    const intervalTime = 10000; // 10 sekund

    // 2. Logika zmiany
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

        // Reset animacji
        document.body.classList.remove('anim-active');
        void document.body.offsetWidth; // Wymuszenie odświeżenia

        setBackgroundTheme(prevImg, currentImg, nextImg);

        document.body.classList.add('anim-active');

        currentIndex = nextIndex;
    }

    // 3. Start
    if (totalImages >= 3) {
        changeBackground();
        setInterval(changeBackground, intervalTime);
    } else {
        console.error("Za mało zdjęć!");
    }
});