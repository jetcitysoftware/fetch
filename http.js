'use strict';

const superagent = require('superagent');
const isUrl = require('is-url');

class HTTP {

    constructor(url, method, body) {
        this.url = url;
        this.method = method;
        this.body = body;
    }

    fetch() {
      superagent(this.method, this.url)
        .send(this.body)
        .then(results => {
            this.logStatus(results.res);
            this.blankLine();
            this.logHeaders(results.headers);
            this.blankLine();
            this.logOutput(results.body);
            this.blankLine();
         })
        .catch( console.error );
    }

    blankLine() {
      console.log('');
    }

    logStatus(results) {
      console.log(`HTTP/${results.httpVersion} ${results.statusCode} ${results.statusMessage}`)
    }

    logHeaders(headers) {
      for( let key in headers ) {
        console.log(`${key}: ${headers[key]}`);
      }
    }

    logOutput(body) {
      try {
        console.log(JSON.stringify(body, null, 2));
      }
      catch(e) { console.log(body); }
    }

}

module.exports = HTTP;
