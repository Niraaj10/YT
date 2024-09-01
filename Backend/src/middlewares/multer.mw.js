import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Navigate from src/middleware to the public folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../../public/temp');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // const uploadPath = path.join(__dirname, 'public/temp');
//         // cb(null, uploadPath)
//         cb(null, "../../public/temp")
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

export const upload = multer({ storage })