document.addEventListener('DOMContentLoaded', function() {

    const lat = 54.20900424000618;
    const lng = 18.521802582894377;

    // Inicjalizacja mapy w kontenerze #map
    // Sprawdzamy czy div #map istnieje, żeby nie było błędów na innych stronach
    if(document.getElementById('map')) {
        var map = L.map('map').setView([lat, lng], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        var marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup("<b>Miejsce wesela</b><br>Czekamy na Was tutaj!").openPopup();
    }
});