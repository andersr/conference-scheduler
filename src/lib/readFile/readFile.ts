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
        
        convertConfData(data)
    }


    // const lines = raw.split('\n');
    // const records = lines.slice(1, lines.length);
    // const cleaned = {};
    // let requestURL;

    // Array.from(records).forEach((record) => {
    //   const fields = record.split(',');

    //   if (requestURL) {
    //     if (fields[2] === '200') {
    //       cleaned[requestURL] = fields[3];
    //       requestURL = undefined;
    //     }
    //   }

    //   if (fields[2] === '301') {
    //     requestURL = fields[3];
    //   }
    // });

    // const cleanedJSON = JSON.stringify(cleaned);

    // await writeFile('./ouput.json', cleanedJSON);
  } catch (error) {
    console.warn('error: ', error);
  }
};


