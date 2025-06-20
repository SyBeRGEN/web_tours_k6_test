// Navigation панель
import { request } from '../utils/httpClient.js';
import { BASE_URL } from '../config.js';

// Открываем nav панель и получаем сессию
export function openNavPageAndExtractSession() {
    const url = `${BASE_URL}/cgi-bin/nav.pl?in=home`;
    const res = request('GET', url);

    // Парсим userSession с помощью RegExp (как в JMeter)
    const match = res.body.match(/name="userSession"\s+value="([^"]+)"/);

    if (match && match[1]) {
        console.log('userSession = ' + match[1]);
        return match[1];
    }

    throw new Error('userSession not found in nav.pl');
}
