import fs from 'fs';
import generateCsv from '../modules/mobile/bulkUpload/csvWriter';

describe('API Integration Tests', () => {
    test('generator', async () => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const csvPath = `./public/uploads/file-${uniqueSuffix}.csv`;
        await generateCsv(10, csvPath);
        const doesCsvExist = fs.existsSync(csvPath);
        expect(doesCsvExist).toBe(true);
        fs.unlinkSync(csvPath);
    });
});
