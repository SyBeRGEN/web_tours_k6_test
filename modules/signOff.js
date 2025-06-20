import { request } from '../utils/httpClient.js';
import { BASE_URL } from '../config.js';

// Выход
export function signOff() {
    const url = `${BASE_URL}/cgi-bin/welcome.pl?signOff=true`;
    const headers = {
        'Content-Type': 'text/plain'
    };
    return request('GET', url, null, headers);
}