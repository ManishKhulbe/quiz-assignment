"use strict";

//========================== Load Modules Start =======================
//========================== Load External modules ====================
const Promise = require("bluebird");
const AWS = require('aws-sdk');
const fs = require("fs");
const path = require("path");
const dotenv = require('dotenv')
dotenv.config();
//========================== Load internal modules ====================


AWS.config = {
    accessKeyId: process.env.IAM_KEY_ID,
    secretAccessKey:process.env.IAM_ACCESS_KEY,
    region: 'us-east-1',
    bucketName: process.env.S3_BUCKET_NAME,
    signatureVersion: "v2",
};
var Bucket = process.env.S3_BUCKET_NAME

var photoBucket = new AWS.S3({params: {Bucket: Bucket}});


//========================== Load Modules End ==============================================
function __deleteTempFile(filePath) {
    fs.stat(filePath, function (err, stats) {
        //console.log(stats);//here we got all information of file in stats variable

        if (err) {
            console.error(err);
        }

        fs.unlink(filePath, function (err) {
            if (err) {
                console.log(err);
            }
            console.log('file deleted successfully');
        });
    });
};

function __uploadToS3(file, buffer) {
    return new Promise(function (resolve, reject) {
        photoBucket.upload({
            Key: file.filename,
            ContentType: file.mimetype,
            Body: buffer,
            ACL: 'public-read'
        }, function (err, data) {
            if (err) {
                console.log("upload fail: ",err);
                reject(err);
            } else {
                resolve(data);
            }
        });

    })
}


function uploadFile(file) {
    console.log(file);
    let buffer = fs.createReadStream(file.path);
    return __uploadToS3(file, buffer)
        .then(function (data) {
            __deleteTempFile(file.path);
            return data
        })
}

function uploadImageThumb(file) {
    let size = 128;
    let dest = path.join(file.path, "../");
    let resizeName = size + "x" + size + file.filename;
    dest += resizeName;
    return new Promise(function (resolve, reject) {

        gm(file.path)
            .resize(size, size)
            .autoOrient()
            .write(dest, function (err) {
                if (err) {
                    reject(err);
                }
                let buffer = fs.createReadStream(dest);
                let resizeImage = file;
                resizeImage.filename = resizeName;
                // resizeImage.path = dest;
                // resizeImage;
                return __uploadToS3(resizeImage, buffer)
                    .then(function (data) {
                        __deleteTempFile(dest);
                        resolve(data);
                    })
                    .catch(function (err) {
                        throw err
                    })
            });
    });
}

//========================== Export Module Start ==============================

module.exports = {uploadFile, uploadImageThumb};

//========================== Export Module End ===============================

