const { SERVICE_URL } = require('./helpers/constants')
const axios = require('axios')
const savePdf = require('./helpers/savePdf');
const fs = require('fs')
const FormData = require('form-data')
const readline = require('readline')

const htmlFilePath = './sample.html';

const genratePdfFromHtmlFile = async () => {
    const formData = new FormData();
    formData.append('htmlFile', fs.createReadStream(htmlFilePath));

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    try {
        rl.question('Enter the filename for the PDF: ', async (filename) => {
            rl.close();

            try {
                const response = await axios.post(`${SERVICE_URL}/convert-from-file`, formData);
                savePdf(response.data, filename);
                console.log(`Converted PDF saved to ${filename}.pdf`);
            } catch (error) {
                console.error('Error converting from file:', error.response?.data || error.message);
            }
        });
    }
    catch (error) {
        console.error('Error reading user input:', error.message);
    }
}

genratePdfFromHtmlFile();