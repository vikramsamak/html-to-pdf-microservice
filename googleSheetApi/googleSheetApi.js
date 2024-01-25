const { google } = require('googleapis');

const credentials = require('./html-to-pdf-logger-5f8a48bb1ddd.json');

var spreadsheet = "1y4Sj2lVq3_Wxzf5ZNxQFoLm8bUsqiVlGa68esWGzems"

const jwtClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

jwtClient.authorize();

const getSheetData = async () => {
    try {
        const sheets = google.sheets({ version: 'v4', auth: jwtClient });

        const spreadsheetId = spreadsheet;
        const range = 'Sheet1!A1:Z';

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const values = response.data.values;

        return values;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const writeDataToSheet = async (data) => {
    try {
        const sheets = google.sheets({ version: 'v4', auth: jwtClient });

        const spreadsheetId = spreadsheet;
        const range = 'Sheet1!A1';

        const values = data;

        const resource = {
            values,
        };

        const appendRequest = {
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource,
        };

        const response = await sheets.spreadsheets.values.append(appendRequest);

        return response.data;

    } catch (error) {
        console.error('Error writing data:', error);
    }
};

module.exports = {
    writeDataToSheet,
    getSheetData
};

