/**
 * Created by Alain DIAS on 02/07/2017.
 */
let path = require('path');
let cp = require('child_process');
let deps = require(path.resolve(__dirname + '/../deps.json'));
let getConfig = require(__dirname + '/config.js');
let fileUtils = require(__dirname + '/fileutils.js');

let pathToUse = process.cwd();

let installDeps = config => {
    let install = cp.spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install', '--save'].concat(config.webdrivers).concat(deps.deps), {cwd: pathToUse});
    install.stdout.on('data', data => console.log(data.toString()));
    install.stderr.on('data', data => console.log(data.toString()));
};

let create = function create(options) {
    let configFile = path.resolve(pathToUse +'/'+ options.config);
    console.log(configFile);
    getConfig(configFile)
    .then(config => {
        config.webdrivers = config.webdrivers || [];
        // TODO: ask questions to install browser drivers
        if(config.webdrivers.length === 0) {
            config.webdrivers.push('chromedriver');
        }

        fileUtils.fileExists(path.resolve(pathToUse + '/package.json'))
        .then(exists => {
            if(!exists) {
                let init = cp.spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['init', '--yes'], {cwd: pathToUse});
                init.stdout.on('data', data => console.log(data.toString()));
                init.stderr.on('data', data => console.log(data.toString()));
                init.on('close', code => {
                    if(code === 0) {
                        installDeps(config);
                    }
                })
            } else {
                installDeps(config);
            }
        });

        //TODO update config file or create if no config file exists
    })
    .catch(error => {
        console.log("An error occured " + error);
    })
};

module.exports = create;