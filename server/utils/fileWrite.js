const fs = require('fs');

function fileWrite(filePath, resultString) {
    fs.writeFile(filePath, resultString, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log(`Successfully wrote to ${filePath}`);
        }
    });
}

module.exports = fileWrite