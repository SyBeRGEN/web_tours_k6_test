import { request } from '../utils/httpClient.js';
import { BASE_URL } from '../config.js';

// Отправляет форму с выбором рейсов туда/обратно
export function chooseFlights(outboundFlight, returnFlight) {
    const payload =
        `outboundFlight=${encodeURIComponent(outboundFlight)}` +
        `&returnFlight=${encodeURIComponent(returnFlight)}` +
        `&numPassengers=1` +
        `&advanceDiscount=0` +
        `&seatType=First` +
        `&seatPref=Window` +
        `&reserveFlights.x=43&reserveFlights.y=12`;

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    return request('POST', `${BASE_URL}/cgi-bin/reservations.pl`, payload, headers);
}
