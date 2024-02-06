/* eslint-disable no-unused-vars */
import { faker } from '@faker-js/faker';

const numRecords = 10;
const randomData = (Records:any) => {
    const data = [];

    for (let i = 0; i < numRecords; i = +1) {
        const name = faker.internet.userName();
        const id = faker.string.uuid();
        const age = faker.number.int({ min: 1990, max: 2020 });

        data.push({ name, id, age });
    }

    return data;
};

export const fakeData = randomData(numRecords);
export default randomData;
