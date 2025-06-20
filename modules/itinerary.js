import { request } from '../utils/httpClient.js';
import { BASE_URL } from '../config.js';

// Загружает страницу заказов и возвращает все flightID[]
export function loadItinerary() {
    const res = request('GET', `${BASE_URL}/cgi-bin/itinerary.pl`);

    const matches = [...res.body.matchAll(/<input[^>]*name="flightID"[^>]*value="([^"]+)"/g)];
    const flightIDs = matches.map(m => m[1]);

    console.log(`📦 Найдено заказов: ${flightIDs.length}`);
    if (flightIDs.length > 0) {
        console.log(`🧾 ID для удаления: ${flightIDs.join(', ')}`);
    }

    return flightIDs;
}

// Отправляет POST-запрос для отмены всех переданных flightID[]
export function cancelAllOrders(flightIDs) {
    if (!flightIDs.length) {
        console.log('ℹ️ Нет заказов для отмены');
        return;
    }

    const baseParams = [
        'removeAllFlights.x=36',
        'removeAllFlights.y=5',
        '.cgifields=1',
        '.cgifields=2'
    ];

    const flightParams = flightIDs.map(id => `flightID=${encodeURIComponent(id)}`);

    const payload = [...flightParams, ...baseParams].join('&');

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    return request('POST', `${BASE_URL}/cgi-bin/itinerary.pl`, payload, headers);
}

