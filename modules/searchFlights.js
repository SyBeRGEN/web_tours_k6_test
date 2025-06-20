import { request } from '../utils/httpClient.js';
import { BASE_URL } from '../config.js';
import { randomItem } from '../utils/random.js';

const cities = ['Denver', 'London', 'Paris', 'Frankfurt', 'Los Angeles', 'Portland', 'Seattle'];

// Страница поиска билетов
export function openFlightSearchPage() {
    return request('GET', `${BASE_URL}/cgi-bin/reservations.pl?page=welcome`);
}

// Поиск рейсов и выбор случайных направлений
export function searchFlights() {
    // 🎲 Выбор случайных городов
    let depart = randomItem(cities);
    let arrive;
    do {
        arrive = randomItem(cities);
    } while (arrive === depart);  // исключаем одинаковые

    const payload =
        `advanceDiscount=0` +
        `&depart=${encodeURIComponent(depart)}` +
        `&departDate=06%2F07%2F2025` +
        `&arrive=${encodeURIComponent(arrive)}` +
        `&returnDate=06%2F17%2F2025` +
        `&numPassengers=1&seatPref=Window&seatType=Coach` +
        `&findFlights.x=48&findFlights.y=6&roundtrip=on`;

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const res = request('POST', `${BASE_URL}/cgi-bin/reservations.pl`, payload, headers);

    const outboundMatches = [...res.body.matchAll(/name="outboundFlight" value="([^"]+)"/g)];
    const outboundOptions = outboundMatches.map(m => m[1]);

    const returnMatches = [...res.body.matchAll(/name="returnFlight" value="([^"]+)"/g)];
    const returnOptions = returnMatches.map(m => m[1]);

    const outboundFlight = outboundOptions.length ? randomItem(outboundOptions) : null;
    const returnFlight = returnOptions.length ? randomItem(returnOptions) : null;

    console.log(`✈️ ${depart} → ${arrive}`);
    console.log(`🛫 Outbound selected: ${outboundFlight}`);
    console.log(`🛬 Return selected: ${returnFlight}`);

    if (!outboundFlight) throw new Error('outboundFlight not found');
    if (!returnFlight) throw new Error('returnFlight not found');

    return {
        outboundFlight,
        returnFlight
    };
}
