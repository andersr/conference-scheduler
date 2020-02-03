import fs from 'fs';

export const readFile = (path: string) => {
    let data;
    try {
        if (!fs.existsSync(path)) {
            throw new Error("No file named 'talks.txt' found.  Please try again.");
        }
        
        data = fs.readFileSync(path, 'utf8');

        if (!data) {
            throw new Error('Sorry, there was a problem reading the file.  Please try again.')
        }

    } catch (error) {
        console.log(error.message);
    }
    return data;

}