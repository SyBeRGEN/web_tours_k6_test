import { openWelcomeSignOffPage } from '../modules/welcome.js';
import { openRegisterFormPage, submitRegistration } from '../modules/register.js';

export const options = {
    vus: 1,
    iterations: 1,
};

export default function () {

    // 📥 Шаг 1: Сброс сессии
    openWelcomeSignOffPage();

    // 📝 Шаг 2: открыть форму регистрации
    openRegisterFormPage();

    // 🧪 Шаг 3: сгенерировать логин/пароль
    const username = `user${Math.floor(Math.random() * 1000000)}`;
    const password = `pass${Math.floor(Math.random() * 1000000)}`;

    // 🧾 Шаг 4: отправить регистрацию
    submitRegistration({ username, password });

    // 📣 Вывод в лог
    console.log(`✅ Зарегистрирован и залогинен пользователь: ${username} / ${password}`);
}
