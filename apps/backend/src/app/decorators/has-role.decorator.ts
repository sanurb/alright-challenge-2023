import { SetMetadata } from '@nestjs/common';

export const HAS_ROLE_KEY = 'hasRole';
export const HasRole = (...args: string[]) => SetMetadata(HAS_ROLE_KEY, args);
