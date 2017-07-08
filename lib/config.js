/**
 * Created by Alain DIAS on 08/07/2017.
 */
let fs = require('fs')
let fileUtils = require(__dirname + '/fileutils.js');

let getConfig = pathFile => new Promise((resolve, reject) => {
    let fileDescriptor;

    fileUtils.openFileRead(pathFile)
        .then(fd => {
            if(fd) {
                fileDescriptor = fd;
                return fileUtils.readFile(fd);
            }
            return {};
        })
        .then(data => {
            if(fileDescriptor) {
                fs.close(fileDescriptor);
            }
            
            if(typeof data === 'string') {
                resolve(JSON.parse(data));
            }
            resolve(data);
        })
        .catch(error => {
            reject(error);
        });
});

module.exports = getConfig;