function areResultsEqual(result1, result2) {
    let columnSame = true;
    let valuesSame = true;


    if (result1.length !== result2.length) {
        valuesSame = false;
    }


    for (let i = 0; i < result1.length; i++) {
        const values1 = Object.values(result1[i]);
        const matchingRow = result2.find(row => {
            const values2 = Object.values(row);
            return JSON.stringify(values1) === JSON.stringify(values2);
        });

        if (!matchingRow) {
            valuesSame = false;
        }
    }


    if (JSON.stringify(Object.keys(result1[0] || {})) !== JSON.stringify(Object.keys(result2[0] || {}))) {
        columnSame = false;
    }

    return [columnSame, valuesSame];
}

module.exports = areResultsEqual;