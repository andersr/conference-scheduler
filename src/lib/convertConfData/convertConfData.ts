
interface Talk {
    name: string;
    time: number;
}

const convertMinToNum = (str: string) => {
    const num = str.match(/.\d/);
    if (num) {
        return parseInt(num[0], 10)
    }
    return null;
}

export const convertConfData = (data: string) => {
    const lines = data.split('\n');
    const talks: Talk[] = [];
    
    lines.forEach((line: string) => {
        if (line.match(/lightning/)) {
            const name = line.replace(/lightning/, '');
            talks.push({
                name,
                time: 5
            })
        } else {
            const minStr =  line.match(/.\dmin/);
            const name = line.replace(/.\dmin/, '');
            // console.log('time: ', minStr);
            if (minStr) {
                
                const time = convertMinToNum(minStr[0]);
                console.log(' time: ',  time);

                if (time) {         
                    talks.push({
                        name,
                        time,
                    })
                }

            }
        }
    })

}