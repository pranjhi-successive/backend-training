import { faker } from '@faker-js/faker';

export default function generateMobileData() {
    const mobile = {
        brand: faker.helpers.arrayElement(['Samsung', 'Apple', 'Google', 'OnePlus', 'Xiaomi', 'realme', 'Mi', 'Nokia', 'LG']),
        modelNumber: faker.number.int(),
        price: faker.number.int({ min: 500, max: 2000 }),
        color: faker.color.human(),
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
        image: faker.image.url(),
    };
    return mobile;
}

// TODO batch processing
