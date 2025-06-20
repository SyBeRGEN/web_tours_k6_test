// Модуль логина
import {request} from '../utils/httpClient.js';
import {BASE_URL} from '../config.js';

// Загружаем страницу входа
export function openLoginIntroPage() {
    return request('GET', `${BASE_URL}/cgi-bin/login.pl?intro=true`);
}

// Логинимся
export function submitLogin(username, password, sessionId) {
    // Формируем тело запроса как если бы отправляли HTML-форму
    const payload = `userSession=${sessionId}` +
        `&username=${encodeURIComponent(username)}` +
        `&password=${encodeURIComponent(password)}` +
        `&login.x=60&login.y=12`;

    // Заголовки, указывающие тип передаваемых данных
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    // Отправка POST-запроса
    return request('POST', `${BASE_URL}/cgi-bin/login.pl`, payload, headers);
}
