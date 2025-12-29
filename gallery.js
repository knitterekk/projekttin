document.addEventListener('DOMContentLoaded', function() {

    // 1. DANE: Ścieżki do zdjęć
    const galleries = {
        slub: [
            'galeria/slub/slub.webp',
            'galeria/slub/slub1.webp',
            'galeria/slub/slub2.webp'
        ],
        sala: [
            'galeria/sala/sala.webp',
            'galeria/sala/sala1.webp',
            'galeria/sala/sala2.webp',
            'galeria/sala/sala3.webp'
        ],
        my: [
            'galeria/my/tlo.webp',
            'galeria/my/tlo1.webp',
            'galeria/my/tlo2.webp',
            'galeria/my/tlo3.webp'
        ]
    };

    // Stan sliderów
    const state = {
        slub: { index: 0, interval: null },
        sala: { index: 0, interval: null },
        my:   { index: 0, interval: null }
    };

    // 2. FUNKCJE SLIDERA

    function showImage(category) {
        const box = document.getElementById(`box-${category}`);
        if (!box) return;

        const imgElement = box.querySelector('.slide-img');
        const currentIndex = state[category].index;
        const imgPath = galleries[category][currentIndex];

        // Dodajemy klasę fade dla płynnego przejścia (opcjonalne, wymaga CSS)
        imgElement.style.opacity = 0;
        setTimeout(() => {
            imgElement.src = imgPath;
            imgElement.style.opacity = 1;
        }, 200);
    }

    function nextSlide(category) {
        state[category].index++;
        if (state[category].index >= galleries[category].length) {
            state[category].index = 0;
        }
        showImage(category);
    }

    function prevSlide(category) {
        state[category].index--;
        if (state[category].index < 0) {
            state[category].index = galleries[category].length - 1;
        }
        showImage(category);
    }

    function startAutoSlide(category) {
        if (state[category].interval) clearInterval(state[category].interval);

        // ZMIANA: 6000ms = 6 sekund
        state[category].interval = setInterval(() => {
            nextSlide(category);
        }, 6000);
    }

    // Inicjalizacja
    ['slub', 'sala', 'my'].forEach(cat => {
        showImage(cat);
        startAutoSlide(cat);

        const box = document.getElementById(`box-${cat}`);
        const btnPrev = box.querySelector('.prev');
        const btnNext = box.querySelector('.next');
        const imgEl = box.querySelector('.slide-img');

        btnPrev.addEventListener('click', () => {
            prevSlide(cat);
            startAutoSlide(cat);
        });

        btnNext.addEventListener('click', () => {
            nextSlide(cat);
            startAutoSlide(cat);
        });

        imgEl.addEventListener('click', () => {
            openModal(cat);
        });
    });


    // 3. OBSŁUGA MODALA
    const modal = document.getElementById('gallery-modal');
    const modalContainer = document.querySelector('.modal-scroll-container');
    const closeBtn = document.getElementById('close-modal');

    function openModal(category) {
        modalContainer.innerHTML = '';
        const imagesList = galleries[category];

        imagesList.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            modalContainer.appendChild(img);
        });

        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
        modalContainer.innerHTML = '';
    }

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === modalContainer) {
            closeModal();
        }
    });
});