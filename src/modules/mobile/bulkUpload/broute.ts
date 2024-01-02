import express, { Express } from 'express';
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';
import importUser from './controller';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

const bulk: Express = express();
bulk.use(bodyParser.urlencoded({ extended: true }));
bulk.use(express.static(path.resolve(__dirname, 'public')));

bulk.post('/importUser', upload.single('file'), importUser);

export default bulk;
