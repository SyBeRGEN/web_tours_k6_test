import { openNavPageAndExtractSession } from '../modules/navigation.js';
import {openLoginIntroPage, submitLogin} from '../modules/login.js';
import { loadItinerary, cancelAllOrders } from '../modules/itinerary.js';
import {openWelcomeSignOffPage} from "../modules/welcome.js";

export const options = {
    vus: 1,
    iterations: 1,
};

export default function () {
    // 🔐 Шаг 1: Сброс сессии и получение userSession
    openWelcomeSignOffPage();
    const sessionId = openNavPageAndExtractSession();

    // 🧑‍💼 Шаг 2: Логин
    openLoginIntroPage();
    submitLogin('sy', 'sy', sessionId);

    // 📄 Шаг 3: Загрузка заказов
    const flightIDs = loadItinerary();

    // 🗑 Шаг 4: Отмена
    cancelAllOrders(flightIDs);
}
