const { createLogger, format, transports } = require('winston');
 
// Ignore log messages if they have { private: true }
// const ignorePrivate = format((info, opts) => {
//   if (info.private) { return false; }
//   return info;
// });
 
const logger = createLogger({
    transports: [
      new transports.File({
        filename: 'combined.log',
        level: 'info',
        format: format.combine(format.timestamp(),format.simple())
          }),
          new transports.File({
            filename: 'combined.log',
            level: 'debug',
            format: format.combine(format.timestamp(),format.simple())
              }),
      new transports.File({
        filename: 'errors.log',
        level: 'log'
      })
    ]
  });
module.exports = logger;