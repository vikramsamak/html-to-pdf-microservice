const path = require("path")
const fs = require('fs');

function checkExtension(req, res, next) {
    const filePath = req.file.path;

    const ext = path.extname(req.file.originalname);
    if (ext !== '.html') {
        fs.unlinkSync(filePath);
        return res.status(400).send('Only HTML files are allowed');
    }
    else {
        next();
    }
}

module.exports = {
    checkExtension
}