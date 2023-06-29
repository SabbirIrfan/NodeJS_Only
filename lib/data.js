// dependenC

const fs = require('fs');
const path = require('path');

// module scaffolding

const lib = {};

// getting the base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');

// library file which will be used to write data to file
/// write
lib.create = (dir, file, data, callback) => {
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
// Read
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};

// update
lib.update = (dir, file, data, callback) => {
    // file open for writting
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert the data to string
            const stringData = JSON.stringify(data);

            // truncate the file
            fs.ftruncate(fileDescriptor, (err1) => {
                if (!err1) {
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if (!err2) {
                            fs.close(fileDescriptor, (err3) => {
                                if (!err3) {
                                    callback(false);
                                } else {
                                    console.log(`error while closing ${err3}`);
                                    callback(err3);
                                }
                            });
                        } else {
                            console.log('writting error');
                            callback(err2);
                        }
                    });
                } else {
                    console.log(`error while truncating ${err1}`);
                    callback(err1);
                }
            });
        } else {
            console.log(err);
            callback(err);
        }
    });
};

// delete file

lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else callback('error deleting file');
    });
};

module.exports = lib;
