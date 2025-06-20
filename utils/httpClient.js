// Обёртка над http
import http from 'k6/http'; // Встроенный http
import { check } from 'k6'; // Ассерты на к6

// Универсальный метод запроса, с указанием метода, урла, тела запроса и хедеров
export function request(method, url, payload = null, headers = {}) {
    const params = { headers: headers }; // к6 требует упаковки хедеров в парамс
    let res; // Переменна ответа

    switch (method.toUpperCase()) {
        case 'GET':
            res = http.get(url, params);
            break;
        case 'POST':
            res = http.post(url, payload, params);
            break;
        default:
            throw new Error(`Unsupported method: ${method}`);
    }

    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    return res;
}
