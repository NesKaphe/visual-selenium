/**
 * Created by Alain DIAS on 08/07/2017.
 */
let fs = require('fs');

let fileExists = filePath => new Promise(resolve => fs.stat(filePath, (error) => {
    if(error) {
        if(error.code === 'ENOENT') {
            resolve(false);
        } else {
            resolve(true);
        }
    } else {
        resolve(true);
    }
}));

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

let openFileWrite = (filePath, append) => new Promise((resolve, reject) => fs.open(filePath, append === true ? 'w+' : 'w', (error, fd) => {
    if(error) {
        reject(error);
    } else {
        resolve(fd);
    }
}));

let writeFile = (fileDescriptor, content) => new Promise((resolve, reject) => fs.write(fileDescriptor, content, 'utf8', (error, written, string) => {
    if(error) {
        reject(error);
    } else if(written !== string.length) {
        reject("File not completely written");
    } else {
        fs.close(fileDescriptor);
        resolve();
    }
}));

module.exports = {
    openFileRead : openFileRead,
    readFile : readFile,
    openFileWrite : openFileWrite,
    writeFile : writeFile,
    fileExists : fileExists
};