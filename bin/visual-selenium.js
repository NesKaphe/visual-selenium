#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var program = require('commander');
var VisualSelenium = require('../');

var pkg = require('../package.json');

var cmd;

program
    .version(pkg.version)
    .option('--create', 'Create a new project.')
    .option('--launch', 'Launch a server to start recording with selenium')
    .option('--config [json config]', 'if provided, will use the json config instead of a prompt')
    .option('--browser [driver]', 'if provided, will use the browser to launch record')
    .parse(process.argv);

if(program.create && program.launch) {
    // Error, bad params
    console.log("Error, bad params. Don't use create and launch at the same time !");
    program.outputHelp();
}

if(program.create) {
    console.log("TODO");
    VisualSelenium.create({
        config: program.config
    });
}


if(program.launch) {
    console.log("TODO");
}