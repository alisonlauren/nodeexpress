function radLogger(req, res, next) {
    //sending request to console log with req at end
    console.log("SWEET REQUEST BRO: ");
    console.log(`New ${req.method} requrest at ${req.originalUrl}`);
    console.log('Req Query: ', req.query);

    next();
}
module.exports = radLogger;