/**
 * Created by Alain DIAS on 02/07/2017.
 */
let fs = require('fs');
let path = require('path');
let npminstall = require('npminstall');

let pathToUse = process.cwd();

let openFileRead = filePath => new Promise((resolve, reject) => fs.open(filePath, 'r', (error, fd) => {
    if(error) {
        if(error.code === 'ENOENT') {
            resolve();
        } else {
            reject(error);
        }
    } else {
        resolve(fd);
    }
}));

let readFile = fileDescriptor => new Promise((resolve, reject) => fs.readFile(fileDescriptor, 'utf8', (error, data) => {
    if(error) {
        reject(error);
    } else {
        resolve(data);
    }
}));

let create = function create(options) {
    let configFile = options.config || options.config;
    let config = {};

    openFileRead(configFile)
    .then(fd => {
        if(fd) {
            return JSON.parse(readFile(fd));
        }
        return {};
     })
    .then(config => {
        config.webdrivers = config.webdrivers || [];
        //TODO: proxy handling
        //TODO: install deps and store to user package.json
    })
    .catch(error => {
         console.log("An error occured " + error);
    });
};

module.exports = create;