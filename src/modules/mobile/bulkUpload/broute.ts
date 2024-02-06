import express, { Express } from 'express';
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';
import BulkController from './Controller';

const bulkController = new BulkController();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

const bulk: Express = express();
bulk.use(bodyParser.urlencoded({ extended: true }));
bulk.use(express.static(path.resolve(__dirname, 'public')));
bulk.post('/bulk-upload', upload.single('file'), bulkController.bulkUpload);
bulk.get('/bulk-uploads-list', bulkController.getAllBulkUploads);
bulk.get('/bulk-errors/:sessionId', bulkController.getBulkUploadErrorDetails);

export default bulk;
