const { writeDataToSheet } = require("../googleSheetApi/googleSheetApi");
const createLoggerData = require("../helpers/helpers");

const loggerMiddleware = async (req, res, next) => {

    const data = createLoggerData(req);
    await writeDataToSheet(data)

    next();
};

module.exports = loggerMiddleware;
