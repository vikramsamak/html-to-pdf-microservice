const fs = require('fs')

const savePdf = (pdfData, fileName) => {
    const base64String = pdfData.split(',')[1]
    fs.writeFileSync(`${fileName}.pdf`, base64String, 'base64');
}

module.exports = savePdf;