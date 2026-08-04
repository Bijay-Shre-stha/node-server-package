const morgan = require('morgan');
morgan.token('body', (req) => JSON.stringify(req.body));
morgan.token('params', (req) => JSON.stringify(req.params));
morgan.token('query', (req) => JSON.stringify(req.query));
const loggerFormat = ':method :url :status :res[content-length] - :response-time ms :body :params :query';
const logger = morgan(loggerFormat);
module.exports = logger;
