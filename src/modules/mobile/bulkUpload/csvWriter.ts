/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
import { createObjectCsvWriter } from 'csv-writer';
import generateMobileData from './dataGenerate';

const numberOfMobiles: number = parseInt(process.argv[2] ?? '20', 10);
const batchSize = 30000;
const getcsvWriter = (csvPath:string) => createObjectCsvWriter({
    path: csvPath,
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
        { id: 'isWaterResistant', title: 'isWaterResistant' },
        { id: 'additionalFeatures', title: 'additionalFeatures' },
        { id: 'accessories', title: 'accessories' },
        { id: 'warranty.validUntil', title: 'warranty.validUntil' },
        { id: 'warranty.type', title: 'warranty.type' },
        { id: 'image', title: 'image' },
    ],
    headerIdDelimiter: '.',
});

const generateRecords = async (writer:any, length:number):Promise<void> => {
    const records = Array.from({ length }, () => generateMobileData());

    const fixedRecords = records.map((mobile) => ({
        ...mobile, brand: mobile.modelNumber.split(' ')[0],
    }));

    await writer.writeRecords(fixedRecords);
};
const generateCsv = async (totalLength:number, csvPath:string):Promise<void> => {
    const csvWriter = getcsvWriter(csvPath);
    console.time('generated data');
    let recordsGenerated = 0;
    console.log('in generate csv');
    while (recordsGenerated < totalLength) {
        const length = Math.min(batchSize, totalLength - recordsGenerated);

        await generateRecords(csvWriter, length);
        recordsGenerated += length;
        console.log(`${recordsGenerated} mobiles created`);
    }
    console.timeEnd('generated data');
};

generateCsv(numberOfMobiles, 'file.csv');

export default generateCsv;
