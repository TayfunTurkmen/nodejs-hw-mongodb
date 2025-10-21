import fs from 'fs/promises';

export const writeData = async (PATH, updatedData) => {
  try {
    const data = await fs.readFile(PATH, 'utf8');
    const existingData = JSON.parse(data);

    const newData = [...existingData, ...updatedData];
    const stringData = JSON.stringify(newData, null, 2);
    await fs.writeFile(PATH, stringData);
    console.log('Contacts have been updated successfully!');
  } catch (error) {
    console.error('Error has occured: writeData', error);
  }
};
