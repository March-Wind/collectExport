"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var babelParse = require("@babel/parser");
var transAST = function (filePath) {
    var code = fs.readFileSync("src/" + filePath, { encoding: 'utf-8' });
    var AST = babelParse.parse(code, {
        sourceType: 'module',
        allowImportExportEverywhere: true,
        allowSuperOutsideMethod: true,
        plugins: [
            "typescript",
            "jsx",
            "classProperties",
            "classPrivateProperties",
            "classPrivateMethods",
            "classStaticBlock",
            ["decorators", {
                    decoratorsBeforeExport: true
                }],
            "exportDefaultFrom",
            "topLevelAwait",
            "asyncGenerators",
            "objectRestSpread",
            "exportNamespaceFrom"
        ]
    });
    return AST;
};
exports.default = transAST;
