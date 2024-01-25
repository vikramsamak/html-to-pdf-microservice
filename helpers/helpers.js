const createLoggerData = (req) => {

    return [
        [
            req.url,
            req.method,
            JSON.stringify(req.params),
            JSON.stringify(req.query),
            JSON.stringify(req.headers),
            JSON.stringify(req.body),
            req.ip,
            req.hostname,
            req.protocol,
            new Date().toLocaleString()
        ]
    ];
}

module.exports = createLoggerData;