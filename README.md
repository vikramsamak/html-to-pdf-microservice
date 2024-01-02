# HTML to PDF Microservice

A simple microservice that converts HTML content to PDF using Puppeteer.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v7 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vikramsamak/html-to-pdf-microservice.git

2. Navigate to the project directory:

    ```bash
    cd html-to-pdf-microservice

3. Install dependencies:

    ```bash
    npm install

### Usage

```bash
    npm run api
```

### Example

```javascript
import { testhtml } from "./htmlContent.js"; //html code stored in another js file as string
import { promises as fsPromises } from 'fs';

async function getPDF() {
    try {
        const response = await fetch('https://html-to-pdf-microservice.onrender.com/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ htmlContent: testhtml })
        })
        const pdfData = await response.json()
        try {
            const pdfDataURI = pdfData;
            const base64String = pdfDataURI.split(',')[1]
            await fsPromises.writeFile('output.pdf', base64String, 'base64');
        } catch (error) {
            console.log(error)
        }
    }
    catch (error) {
        console.log(error)
    }

}
getPDF();
```

### Dependencies

Express.js: Web server framework

Puppeteer: Headless Chrome Node API for PDF generation

### Contributing

Feel free to contribute by opening issues or pull requests.
