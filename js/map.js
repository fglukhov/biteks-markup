ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map("contacts_map", {
            center: [55.90667, 37.540039],
            zoom: 16
        }),

        myPlacemark2 = new ymaps.Placemark([55.90667, 37.540039], {
            // Свойства.
            hintContent: 'Собственный значок метки'
        });
        
    myMap.controls
        // Кнопка изменения масштаба.
        .add('zoomControl', { left: 5, top: 5 })
        

    // Добавляем все метки на карту.
    myMap.geoObjects.add(myPlacemark2);
}
