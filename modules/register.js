import {request} from '../utils/httpClient.js';
import {BASE_URL} from '../config.js';

// Загружает форму регистрации
export function openRegisterFormPage() {
    return request('GET', `${BASE_URL}/cgi-bin/login.pl?getInfo=true`);
}

// Отправляет POST с регистрацией пользователя
function randomStr(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function submitRegistration({username, password}) {
    const firstName = capitalize(randomStr(5));
    const lastName = capitalize(randomStr(6));
    const address1 = `${randomStr(8)} street`;
    const address2 = `City-${randomInt(0, 99)}`;
    const registerX = randomInt(0, 79);
    const registerY = randomInt(0, 19);

    const payload =
        `username=${username}` +
        `&password=${password}` +
        `&passwordConfirm=${password}` +
        `&firstName=${encodeURIComponent(firstName)}` +
        `&lastName=${encodeURIComponent(lastName)}` +
        `&address1=${encodeURIComponent(address1)}` +
        `&address2=${encodeURIComponent(address2)}` +
        `&register.x=${registerX}&register.y=${registerY}`;

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    return request('POST', `${BASE_URL}/cgi-bin/login.pl`, payload, headers);
}
