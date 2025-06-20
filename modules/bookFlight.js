import { request } from '../utils/httpClient.js';
import { BASE_URL } from '../config.js';
import { randomInt, randomItem } from '../utils/random.js';

// Отправка формы бронирования рейса
export function bookFlight({ outboundFlight, numPassengers, seatType, seatPref }) {
    // Случайные пользовательские данные
    const firstName = randomItem(['John', 'Alice', 'Sergey', 'Fatima', 'Yuki']);
    const lastName = randomItem(['Smith', 'Ivanov', 'Tanaka', 'Gonzalez', 'Öztürk']);
    const address1 = `${randomInt(100, 999)} ${randomItem(['Main St', 'Baker St', 'Nevsky Ave'])}`;
    const address2 = randomItem(['New York, NY', 'Moscow', 'Tokyo', 'Istanbul', 'Berlin']);
    const creditCard = `4${Math.floor(Math.random() * 1e15).toString().padStart(15, '0')}`;
    const expDate = `${randomInt(1, 12).toString().padStart(2, '0')}/2${randomInt(5, 9)}`;

    const payload =
        `firstName=${encodeURIComponent(firstName)}` +
        `&lastName=${encodeURIComponent(lastName)}` +
        `&address1=${encodeURIComponent(address1)}` +
        `&address2=${encodeURIComponent(address2)}` +
        `&creditCard=${creditCard}` +
        `&expDate=${expDate}` +
        `&oldCCOption=` +
        `&numPassengers=${numPassengers}` +
        `&seatType=${encodeURIComponent(seatType)}` +
        `&seatPref=${encodeURIComponent(seatPref)}` +
        `&outboundFlight=${encodeURIComponent(outboundFlight)}` +
        `&advanceDiscount=0` +
        `&JSFormSubmit=off` +
        `&buyFlights.x=52&buyFlights.y=11` +
        `&.cgifields=saveCC`;

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const res = request('POST', `${BASE_URL}/cgi-bin/reservations.pl`, payload, headers);
    console.log(`✅ Booked flight for ${firstName} ${lastName}, card ${creditCard}, exp ${expDate}`);

    return res;
}
