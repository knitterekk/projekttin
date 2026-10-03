document.addEventListener('DOMContentLoaded', function() {

    const lat = 53.8766746;
    const lng = 18.2398622;

    // Inicjalizacja mapy w kontenerze #map
    // Sprawdzamy czy div #map istnieje, żeby nie było błędów na innych stronach
    if(document.getElementById('map')) {
        var map = L.map('map').setView([lat, lng], 15);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 19,
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
        }).addTo(map);

        var marker = L.marker([lat, lng]).addTo(map);
        var popupContent = "<div style='text-align:center; font-family:\"Segoe UI\",sans-serif;'>" +
                           "<b style='font-size:1.1rem;'>Zajazd Ren</b><br>Czekamy na Was tutaj!<br><br>" +
                           "<a href='https://maps.app.goo.gl/WEPPozobYhKdxxsP9' target='_blank' " +
                           "style='display:inline-block; padding:8px 12px; background-color:#d4af37; color:#000; text-decoration:none; border-radius:4px; font-weight:bold; margin-top:5px;'>" +
                           "Nawiguj z Google Maps</a></div>";
        marker.bindPopup(popupContent).openPopup();
    }
});