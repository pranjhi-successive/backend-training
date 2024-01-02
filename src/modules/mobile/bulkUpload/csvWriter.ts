/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
import { createObjectCsvWriter } from 'csv-writer';
import generateMobileData from './Data';
// import IMobile from '../entities/MobileInterface';
// import IMobile from '../entities/MobileInterface';

const numberOfMobiles: number = parseInt(process.argv[2] ?? '20', 10);
const batchSize = 30000;
const csvWriter = createObjectCsvWriter({
    path: '../../../../public/uploads/csv.csv',
    header: [
        { id: 'brand', title: 'brand' },
        { id: 'modelNumber', title: 'modelNumber' },
        { id: 'price', title: 'price' },
        { id: 'color', title: 'color' },
        { id: 'specifications.display', title: 'specifications.display' },
        { id: 'specifications.camera', title: 'specifications.camera' },
        { id: 'specifications.processor', title: 'specifications.processor' },
        { id: 'specifications.storage', title: 'specifications.storage' },
        { id: 'releaseDate', title: 'releaseDate' },
        { id: 'batteryCapacity', title: 'batteryCapacity' },
        { id: 'connectivity.wifi', title: 'connectivity.wifi' },
        { id: 'connectivity.bluetooth', title: 'connectivity.bluetooth' },
        { id: 'connectivity.cellular', title: 'connectivity.cellular' },
        { id: 'weight', title: 'weight' },
        { id: 'operatingSystem', title: 'operatingSystem' },
        { id: 'isWaterResistant', title: 'waterResistant' },
        { id: 'additionalFeatures', title: 'additionalFeatures' },
        { id: 'accessories', title: 'accessories' },
        { id: 'warranty.validUntil', title: 'warranty.validUntil' },
        { id: 'warranty.type', title: 'warranty.type' },
        { id: 'image', title: 'image' },
    ],
    headerIdDelimiter: '.',
});
// console.time('Generate Data');
// const records = [];
// const listing = 50;
// for (let i = 0; i < listing; i += 1) {
//     records.push(generateMobileData());
// }
// csvWriter.writeRecords(records)
//     .then(() => {
//         console.log('...Done');
//     });
// console.log(records);
// console.timeEnd('Generate Data');

const generateRecords = async (length:number):Promise<void> => {
    const records = Array.from({ length }, () => generateMobileData());
    await csvWriter.writeRecords(records);
};
(async ():Promise<void> => {
    console.time('generated data');
    let recordsGenerated = 0;
    while (recordsGenerated < numberOfMobiles) {
        const length = Math.min(batchSize, numberOfMobiles - recordsGenerated);
        await generateRecords(length);
        recordsGenerated += length;
        console.log(`${recordsGenerated} mobiles created`);
    }
    console.timeEnd('generated data');
})();
