module.exports = rows => {
    return new Promise((resolver, reject) => {
        try {
            const words = rows
                .filter(filterValidRow)
                .map(removePunctuation)
                .map(removeTags)
                .reduce(mergeRows)
                .split(' ')
                .map(word => word.toLowerCase())
                .map(word => word.replace('"', ''));

            resolver(words);
        } catch (e) {
            reject(e);
        }
    }); 
};

function filterValidRow(row) {
    const notNumber = !parseInt(row.trim());
    const notEmpty = !!row.trim();
    const noteInterval = !row.includes('-->');
    return notNumber && notEmpty && noteInterval;
}

const removePunctuation = row => row.replace(/[,?!.-]/g, '');
const removeTags = row => row.replace(/(<[^>]+)>/ig, '').trim();
const mergeRows = (fullText, row) => `${fullText} ${row}`;