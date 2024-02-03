const multer = require("multer")
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniquePreffix = new Date().valueOf();
        cb(null, uniquePreffix + '-' + file.originalname)
    }
})

module.exports = {
    upload: multer({ storage: storage })
}