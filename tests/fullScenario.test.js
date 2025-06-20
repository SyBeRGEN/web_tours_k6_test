import { openWelcomeSignOffPage } from '../modules/welcome.js';
import { openNavPageAndExtractSession } from '../modules/navigation.js';
import { openLoginIntroPage, submitLogin } from '../modules/login.js';
import { openFlightSearchPage, searchFlights } from '../modules/searchFlights.js';
import { chooseFlights } from '../modules/chooseFlight.js';
import { bookFlight } from '../modules/bookFlight.js';
import { signOff } from '../modules/signOff.js';

export const options = {
    vus: 1,
    iterations: 4,
};

export default function () {
    // 🔐 Шаг 1: Сброс сессии и получение userSession
    openWelcomeSignOffPage();
    const sessionId = openNavPageAndExtractSession();

    // 🧑‍💼 Шаг 2: Логин
    openLoginIntroPage();
    submitLogin('sy', 'sy', sessionId);

    // 🔍 Шаг 3: Поиск рейсов
    openFlightSearchPage();
    const { outboundFlight, returnFlight } = searchFlights();

    // ✈️ Шаг 4: Выбор рейсов
    chooseFlights({
        outboundFlight,
        returnFlight,
        numPassengers: 1,
        seatType: 'Coach',
        seatPref: 'Aisle',
    });

    // 💳 Шаг 5: Бронирование
    bookFlight({
        outboundFlight,
        numPassengers: 1,
        seatType: 'Coach',
        seatPref: 'Aisle',
    });

    // 🚪 Шаг 6: Выход из системы
    signOff();
}
