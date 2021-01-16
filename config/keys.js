if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else if (process.env.NODE_ENV === 'ci') {
  module.exports = require('./ci');
} else {
  module.exports = require('./dev');
}

//git ssh key= bd:8a:62:4d:f3:92:c5:f0:f5:a3:5f:29:83:bc:7e:d0
