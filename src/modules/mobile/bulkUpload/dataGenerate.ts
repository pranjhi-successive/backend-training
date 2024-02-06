import { faker } from '@faker-js/faker';
import colors from './colors';
import models from './modelNumber';

const genId = (num1: number, num2: number) => String.fromCharCode(65 + num1) + num2;

export default function generateMobileData() {
    const mobile = {
        modelNumber: faker.helpers.arrayElement(models)
        + genId(
            faker.number.int({ min: 0, max: 26 }),
            faker.number.int({ min: 1, max: 500000 }),
        ),
        price: faker.number.int({ min: 500, max: 2000 }),
        color: faker.helpers.arrayElement(colors),
        specifications: {
            display: faker.helpers.arrayElement(['AMOLED', 'LCD', 'Super Retina XDR']),
            camera: faker.helpers.arrayElement(['12MP', '48MP', 'Dual 12MP', 'Triple 48MP']),
            processor: faker.helpers.arrayElement(['Snapdragon 888', 'A15 Bionic', 'Exynos 2100']),
            storage: faker.helpers.arrayElement(['64GB', '128GB', '256GB']),
        },
        releaseDate: faker.date.past(),
        batteryCapacity: `${faker.number.int({ min: 3000, max: 5000 })}mAh`,
        connectivity: {
            wifi: faker.datatype.boolean(),
            bluetooth: faker.datatype.boolean(),
            cellular: faker.datatype.boolean(),
        },
        weight: faker.number.int({ min: 150, max: 200 }),
        operatingSystem: faker.helpers.arrayElement(['Android', 'iOS']),
        isWaterResistant: faker.datatype.boolean(),
        additionalFeatures: faker.lorem.words(faker.number.int({ min: 1, max: 5 })).split(' '),
        accessories: JSON.stringify(Array.from(
            { length: faker.number.int({ min: 1, max: 3 }) },
            () => (
                {
                    name: faker.commerce.productName(),
                    type: faker.lorem.word(),
                    price: faker.number.int({ min: 10, max: 100 }),
                }),
        )),
        warranty: {
            validUntil: faker.date.future(),
            type: faker.lorem.word(),
        },
        image: faker.image.dataUri({ type: 'svg-base64' }),
        // image: faker.helpers.arrayElement(images),
        // image: (() => {
        //     const imageUrl = faker.image.url();
        //     const webpImageUrl = imageUrl.replace(/\.(jpg|jpeg|png)$/, '.webp');
        //     return webpImageUrl;
        // })(),
    };
    return mobile;
}
