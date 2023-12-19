// import { Mobile } from "../entities/MobileInterface";

export const mobileData = [
    {
        id: '1',
        brand: 'Samsung',
        modelNumber: 'Galaxy S21',
        price: 999.99,
        color: 'Phantom Gray',
        specifications: {
            display: '6.2 inches Super AMOLED',
            camera: 'Triple 12 MP, 64 MP, 12 MP',
            processor: 'Exynos 2100',
            storage: '128 GB',
        },
        releaseDate: new Date('2022-01-14'),
        batteryCapacity: '4000 mAh',
        connectivity: {
            wifi: true,
            bluetooth: true,
            cellular: true,
        },
        weight: 171,
        operatingSystem: 'Android 11',
        isWaterResistant: true,
        additionalFeatures: ['Wireless Charging', '5G Connectivity'],
        accessories: [
            { name: 'Wireless Charger', type: 'Charging', price: 49.99 },
            { name: 'Protective Case', type: 'Case', price: 29.99 },
        ],
        warranty: {
            validUntil: new Date('2023-01-14'),
            type: 'Manufacturer Warranty',
        },
    },
    {
        brand: 'Apple',
        modelNumber: 'iPhone 13 Pro',
        price: 1199.99,
        color: 'Graphite',
        specifications: {
            display: '6.1 inches Super Retina XDR',
            camera: 'Triple 12 MP, 12 MP, 12 MP',
            processor: 'A15 Bionic',
            storage: '256 GB',
        },
        releaseDate: new Date('2022-09-14'),
        batteryCapacity: '3095 mAh',
        connectivity: {
            wifi: true,
            bluetooth: true,
            cellular: true,
        },
        weight: 189,
        operatingSystem: 'iOS 15',
        isWaterResistant: true,
        additionalFeatures: ['Face ID', 'MagSafe Technology'],
        accessories: [
            { name: 'MagSafe Charger', type: 'Charging', price: 39.99 },
            { name: 'Leather Case', type: 'Case', price: 69.99 },
            { name: 'AirPods Pro', type: 'Earbuds', price: 249.99 },
        ],
        warranty: {
            validUntil: new Date('2023-09-14'),
            type: 'AppleCare+',
        },
    },
    {
        brand: 'Google',
        modelNumber: 'Pixel 6',
        price: 799.99,
        color: 'Sorta Sage',
        specifications: {
            display: '6.4 inches AMOLED',
            camera: 'Dual 50 MP, 12 MP',
            processor: 'Tensor',
            storage: '128 GB',
        },
        releaseDate: new Date('2022-10-19'),
        batteryCapacity: '4600 mAh',
        connectivity: {
            wifi: true,
            bluetooth: true,
            cellular: true,
        },
        weight: 207,
        operatingSystem: 'Android 12',
        isWaterResistant: true,
        additionalFeatures: ['Night Sight', 'Fast Charging'],
        accessories: [
            { name: 'Pixel Stand', type: 'Charging', price: 59.99 },
            { name: 'Fabric Case', type: 'Case', price: 39.99 },
        ],
        warranty: {
            validUntil: new Date('2023-10-19'),
            type: 'Limited Warranty',
        },
    },
];
export default mobileData;
// // // console.log(mobileData);
