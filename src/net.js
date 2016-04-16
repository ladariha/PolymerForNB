"use strict";

const https = require("https");
const http = require("http");

exports.get = function (url, formatter) {
    return new Promise(function (resolve, reject) {
        let resolver = url.startsWith("https") ? https : http;
        resolver
                .get(url, (response) => {
                    let res_data = "";
                    response.on("data", function (chunk) {
                        res_data += chunk;
                    });
                    response.on("end", function () {
                        if (typeof formatter === "function") {
                            resolve(formatter(res_data));
                        } else {
                            resolve(res_data);
                        }
                    });
                })
                .on("error", (e) => {
                    console.error(e);
                    reject(e);
                });
    });
};