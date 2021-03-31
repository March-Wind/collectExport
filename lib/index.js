#!/usr/bin/env ts-node-script
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var collectFile_1 = require("./collectFile");
var transAST_1 = require("./transAST");
var traverseAST_1 = require("./traverseAST");
var files = collectFile_1.default();
// debugger
// const AST = transAST('1.ts');
// debugger
// const exportMap = traverse(AST, 'src/constants/EnumKey.ts')
// debugger
var schma = [];
files.forEach(function (file, index) {
    var AST = transAST_1.default(file);
    file = file.replace(/\.(js|jsx|ts|tsx)$/, '');
    var exportMap = traverseAST_1.default(AST, file);
    schma.push(exportMap);
});
var allExport = schma.flat(2);
var result = {};
var checkRepeatingName = [];
allExport.forEach(function (item) {
    var filePath = Object.keys(item)[0];
    var variabl = item[filePath].variable[0];
    // 检查是否有重复命名
    if (checkRepeatingName.indexOf(variabl) !== -1) {
        throw new Error("\u6709\u91CD\u590D\u547D\u540D\uFF0C\u5C06\u5BFC\u81F4\u6309\u9700\u52A0\u8F7D\u627E\u4E0D\u5230\u671F\u671B\u7684\u6587\u4EF6,\u91CD\u590D\u53D8\u91CF\uFF1A" + variabl);
    }
    checkRepeatingName.push(variabl);
    if (result[filePath]) {
        if (result[filePath].variable.indexOf(variabl) === -1) {
            result[filePath].variable.push(variabl);
        }
    }
    else {
        result[filePath] = {
            variable: item[filePath].variable
        };
    }
});
// debugger
var resultString = JSON.stringify(result, null, 2);
var resultPath = process.cwd() + '/src/schma.json';
fs.writeFileSync(resultPath, resultString, { encoding: 'utf8' });
