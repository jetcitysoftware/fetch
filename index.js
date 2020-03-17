#!/usr/bin/env node

'use strict';

const fs = require('fs');
const isUrl = require('is-url');
const args = require('minimist')(process.argv.slice(2));

const HTTP = require('./http.js');

// -h option sent, show help and quit
if ( args.h ) { help(); }

// -m is the method. default to "GET", validate anything else
let method = args.m || "GET";
if ( ! method.match(/get|put|patch|post|delete/i) ) {
  console.log('Unsupported HTTP Method');
  process.exit();
}

// -b is the body. Try and make it JSON, otherwise, leave as text
let body = args.b || null;
    try { body = JSON.parse(body); }
    catch(e) {console.log(e)}

// -u is the URL. First, prefix it with localhost if they just give a port
let url = args.u.startsWith(':') ? `http://localhost${args.u}` : args.u;

// Then ... make sure it's valid
if ( ! isUrl(url) ) {
    console.log('Invalid URL');
    process.exit();
}

// Use superagent to fetch, based on the command line input
const http = new HTTP(url, method, body);
http.fetch();


function help() {
  console.log(`

  api USAGE: api -m <method> -u <url> -b '<body>'

   -m - HTTP Method (get/post/put/patch/delete)
   -u - URL (leading :port presumes localhost)
   -b - Body to send for post/put/patch
        Enclosed in single quotes
        JSON must be valid
  `);

   process.exit();
}
