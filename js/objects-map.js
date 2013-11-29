ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map("objects_map", {
            center: [55.79249, 37.70991],
            zoom: 15
        }),

        myPlacemark2 = new ymaps.Placemark([55.79249, 37.70991], {
            // Свойства.
            hintContent: 'Собственный значок метки'
        }, {
            // Опции.
            // Своё изображение иконки метки.
            iconImageHref: 'images/map-pin.png',
            // Размеры метки.
            iconImageSize: [19, 30],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-10, -15]
        });
        
    myMap.controls
        // Кнопка изменения масштаба.
        .add('zoomControl', { left: 5, top: 5 })
        

    // Добавляем все метки на карту.
    myMap.geoObjects.add(myPlacemark2);
}
