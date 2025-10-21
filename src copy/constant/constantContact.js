/* eslint-disable no-undef */
import path from 'path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const CONTACT_SORTABLE_FIELDS = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'avgMisFavouriteark',
  'contactType',
  'createdAt',
  'updatedAt',
];
export const FIFTEEN_MINUITES = 15 * 60 * 1000; // for access token
export const ONE_DAY = 24 * 60 * 60 * 1000; // for refresh token

export const TEMP_FOLDER = path.join(process.cwd(), 'temp');
export const UPLOAD_FOLDER = path.join(process.cwd(), 'uploads');
