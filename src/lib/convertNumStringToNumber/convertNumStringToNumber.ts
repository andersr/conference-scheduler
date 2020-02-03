export const convertNumStringToNumber = (str: string) => {
    const num = str.match(/.\d/);
    if (num) {
        return parseInt(num[0], 10)
    }
    return null;
}
