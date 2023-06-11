import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';

export const storage = diskStorage({
  destination: './tmp',
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

const isExtensionValid = (extension: string): boolean => {
  const allowedExtensions = ['.pdf'];
  return allowedExtensions.includes(extension);
};
