import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = (destination?: string) => ({
  storage: diskStorage({
    destination: (req, file, callback) => {
      // แยก folder ตาม field name
      if (file.fieldname === 'hdFile') {
        callback(null, `${process.env.UPLOAD_BASE_PATH}/hdfile`);
      } else if (file.fieldname === 'hdImgs') {
        callback(null, `${process.env.UPLOAD_BASE_PATH}/hdimage`);
      } else {
        callback(null, `${process.env.UPLOAD_BASE_PATH}/${destination}`);
      }
    },
    // destination: `${process.env.UPLOAD_BASE_PATH}/${destination}`,
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  }),
});
