const { SERVICE_URL } = require('./helpers/constants')
const axios = require('axios')
const savePdf = require('./helpers/savePdf');
const readline = require('readline')

// Example for /convert-from-code endpoint
const htmlCode = '<html><body><h1>Hello, world!</h1></body></html>';

const genratePdfFromHtmlCode = async () => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {

        rl.question('Enter the filename for the PDF: ', async (filename) => {
            rl.close();

            try {
                const response = await axios.post(`${SERVICE_URL}/convert-from-code`, { htmlCode: htmlCode });
                savePdf(response.data, filename);
                console.log(`Converted PDF saved to ${filename}.pdf`);
            } catch (error) {
                console.error('Error converting from code:', error.response?.data || error.message);
            }
        });
    } catch (error) {
        console.error('Error reading user input:', error.message);
    }
};


genratePdfFromHtmlCode();