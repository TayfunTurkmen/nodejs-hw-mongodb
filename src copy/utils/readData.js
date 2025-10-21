import fs from 'fs/promises';

export const readData = async (PATH) => {
  try {
    const data = await fs.readFile(PATH, 'utf8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error('Error has ocured: readData', error);
  }
};
