/**
 * Created by Nes on 08/07/2017.
 */
let fileUtils = require(__dirname + '/fileutils.js');

let getConfig = pathFile => new Promise((resolve, reject) => {
    fileUtils.openFileRead(pathFile)
        .then(fd => {
            if(fd) {
                return fileUtils.readFile(fd);
            }
            return {};
        })
        .then(data =>{
            if(typeof data === "string") {
                resolve(JSON.parse(data));
            }
            resolve(data);
        })
        .catch(error => {
            reject(error);
        });
});

module.exports = getConfig;