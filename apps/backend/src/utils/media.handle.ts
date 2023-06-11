import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ALLOWED_EXTENSIONS,
  FILE_DIRECTORY,
} from '../config/constants/file.constants';

export const storage = diskStorage({
  destination: FILE_DIRECTORY,
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    const fileExtension = extname(originalName);

    if (!isExtensionValid(fileExtension)) {
      return cb(new BadRequestException('Invalid file type'), null);
    }

    const uniqueFileName = generateUniqueFileName(fileExtension);
    cb(null, uniqueFileName);
  },
});

const generateUniqueFileName = (extension: string): string =>
  `${Date.now()}${extension}`;

const isExtensionValid = (extension: string): boolean =>
  ALLOWED_EXTENSIONS.includes(extension);
