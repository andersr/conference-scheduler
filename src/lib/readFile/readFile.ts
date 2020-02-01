import { convertConfData } from '../convertConfData/convertConfData';

const fs = require('fs');

const getFile = (path: string) => {
  let fileContent: string;

  return new Promise<string>(((resolve) => {
    fileContent = fs.readFileSync(path, { encoding: 'utf8' });
    resolve(fileContent);
  }));
};

// const writeFile = (path, content) => new Promise(((resolve) => {
//   fs.writeFileSync(path, content, (err) => {
//     if (err) { throw err; }
//     resolve();
//   });
// }));

export const readFile = async() => {

    
  try {
    const data = await getFile('./test.txt');
    // console.log('data: ', data);

    if (data) {

        return data;
        
        // const talks = convertConfData(data)
    }

    throw new Error('Error reading file.  Please try again.')

    // 



    // const cleanedJSON = JSON.stringify(cleaned);

    // await writeFile('./ouput.json', cleanedJSON);
  } catch (error) {
    console.warn('error: ', error);
  }

};


