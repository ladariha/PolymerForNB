"use strict";

const net = require("./net");
        class PolymerElement {
    constructor(name, type, desc, properties, events, observers) {
        this.name = name;
        this.type = type || "";
        this.desc = desc || this.name;
        this.properties = properties || [];
        this.events = events || [];
        this.observers = observers || [];
    }
    simplify() {
        let o = {};
        o.name = this.name;
        o.description = this.desc.replace(/</g, "&lt").replace(/>/g, "&gt;");
        o.attributes = {};

        for (let i = 0; i < this.properties.length; i++) {
            o.attributes[this.properties[i].name] = {
                type: this.properties[i].type,
                description: this.properties[i].desc.replace(/</g, "&lt").replace(/>/g, "&gt;") || ""
            };
        }

        return o;
    }
}

class RawElement {
    constructor(el) {
        this._el = el;
        this.elements = [];
    }
    resolve(elementBaseUrl, resultArray) {
        var self = this;
        return net.get(elementBaseUrl + self._el.name + ".json", JSON.parse)
                .then(function (element) {

                    for (let e in element.elements) {
                        let el = element.elements[e];
                        resultArray.push(new PolymerElement(el.is, el.type, el.desc, el.properties, el.events, el.observers))
                    }

                    return resultArray;
                }, function (err) {
                    console.error(err);
                    for (let e in self._el.elements) {
                        resultArray.push(new PolymerElement(self._el.elements[e]))
                    }
                    return resultArray;
                })
                .then(r => r);
    }
}


class Parser {
    parse(catalogUrl, elementBaseUrl) {
        var self = this;
        return net.get(catalogUrl, JSON.parse)
                .then(function (catalog) {

                    let elements = catalog.elements;
                    let arr = [];
                    var promise = Promise.resolve(arr);
                    for (let e in elements) {
                        promise = self._getResolveElementPromise(promise, new RawElement(elements[e]), elementBaseUrl, arr);
                    }

                    return promise.then(function () {
                        return Promise.resolve(arr);
                    });
                })
                .catch(function (err) {
                    return Promise.reject(err);
                })

    }
    _getResolveElementPromise(promise, rawElement, elementBaseUrl, resultArray) {
        return promise.then(rawElement.resolve.bind(rawElement, elementBaseUrl, resultArray));
    }
}

module.exports = Parser;