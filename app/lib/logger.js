var log4js = require('log4js');
var moment = require('moment');

layout = {
  type: 'pattern',
  pattern: '[%d{yyyy-MM-ddThh:mm:ss.SSS}%x{timeZone}] [%p] %c - %m',
  tokens: {
    timeZone: function () { return moment().format("ZZ"); }
  }  
};

var appenders = [
  {
    type: 'dateFile',
    filename: "/var/log/torwolf/torwolf.log",
    pattern: '-yyyy-MM-dd',
    level: 'DEBUG',
    layout: layout
  }, {
    type: 'console',
    level: 'DEBUG',
    layout: layout
  }
];

log4js.configure({
  appenders: appenders
});

var logging = {
  logger: log4js.getLogger(),
  expressLogger: log4js.connectLogger(log4js.getLogger('[express]'),
    {
      level: log4js.levels.DEBUG,
      format: ':remote-addr ":method :url HTTP/:http-version" :response-time :status :content-length ":referrer" ":user-agent"'
    })
};

module.exports = logging