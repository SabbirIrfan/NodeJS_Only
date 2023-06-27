// dependenC

const fs = require('fs');
const path = require('path');

// module scaffolding

const lib = {};

// getting the base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');

// library file which will be used to write data to file

lib.create = function (dir, file, data, callback) {
    // here dir means which dir to write (sub dir if needed in .data directory)
    // file = filename
    // data = what data to write
    // callback to return with a callback function

    // open file for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert data to  string
            const stringData = JSON.stringify(data);

            // write data to file then close it
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (!err2) {
                    fs.close(fileDescriptor, (err3) => {
                        if (!err3) {
                            callback('no error , file closed perfectly');
                        } else callback(err3);
                    });
                } else {
                    callback(err);
                }
            });
        } else {
            callback(err);
        }
    });
};

module.exports = lib;
