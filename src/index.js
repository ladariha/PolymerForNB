"use strict";

const configuration = require("./configuration.json");
const Parser = require("./parser");
const fs = require("fs");

let parser = new Parser();
parser.parse(configuration.catalogUrl, configuration.elementBase).then(createJSONFile).catch(e => console.error(e));



function createJSONFile(polymerElements) {
    var o = {
        elements: {}
    };

    for (let i = 0, max = polymerElements.length; i < max; i++) {
        o.elements[polymerElements[i].name] = polymerElements[i].simplify();
    }

    var res = JSON.stringify(o, null, 2);

    fs.writeFileSync("dist/customs.json", res);

}