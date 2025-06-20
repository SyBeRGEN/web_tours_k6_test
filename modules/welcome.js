// Модуль welcomePage

import { request } from '../utils/httpClient.js';
import { BASE_URL } from '../config.js';

// Очистка сессии
export function openWelcomeSignOffPage() {
    const url = `${BASE_URL}/cgi-bin/welcome.pl?signOff=true`;
    const headers = {
        'Content-Type': 'text/plain'
    };
    return request('GET', url, null, headers);
}

// После авторизации
export function openWelcomeSearchPage() {
    const url = `${BASE_URL}/cgi-bin/welcome.pl?page=search`;
    const headers = {
        'Content-Type': 'text/plain'
    };
    return request('GET', url, null, headers);
}
