const dayjs = require('dayjs');

const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const axios = require('axios');

const HOST = 'http://localhost:8000';
const ORDERS_BASE_URL = `${HOST}/api/v1/trackings/day`;

let date;

const getToken = async () => {
    const {
        data: { token },
    } = await axios.post(`${HOST}/login`);

    return `Bearer ${token}`;
};

const getTrackings = async (date) => {
    const result = await axios.get(ORDERS_BASE_URL, {
        params: {
            date,
        },
        headers: {
            'Authorization': await getToken(),
        },
    });

    return result.data;
};

Given('O funcionário realizou checkin e checkout', () => {});

When('Data selecionada é hoje', () => {
    date = dayjs();
});

Then('Exibir todos registros de ponto para a data selecionada', async () => {
    const { trackings, workedHours } = await getTrackings(date);


    assert.strictEqual(true, trackings.length > 0);
    assert.strictEqual(true, workedHours != '');
});

Given('O funcionário não realizou checkin e checkout', () => {});

When('Data selecionada for amanhã', () => {
    date = dayjs().add(1, 'day');
});

Then('Exibir uma lista vazia', async () => {
    const { trackings, workedHours } = await getTrackings(date);

    assert.strictEqual(true, trackings.length == 0);
    assert.strictEqual(true, workedHours == '');
});
