#!/usr/bin/env ts-node-script
import fs  = require('fs')
import collectFile from './collectFile';
import transAST from './transAST';
import traverse from './traverseAST';

interface ExportMap {
    [x: string]: {
        variable: string[];
    };
}

const files = collectFile();
// debugger
// const AST = transAST('1.ts');
// debugger
// const exportMap = traverse(AST, 'src/constants/EnumKey.ts')
// debugger
const schma:ExportMap[][] = [];
files.forEach((file, index) => {
    const AST = transAST(file);
    file = file.replace(/\.(js|jsx|ts|tsx)$/,'');
    const exportMap = traverse(AST, file)
    schma.push(exportMap)
});
const allExport = schma.flat(2);
const result:ExportMap = {}
const checkRepeatingName = [];
allExport.forEach((item: ExportMap) => {
    const filePath = Object.keys(item)[0];
    const variabl = item[filePath].variable[0];
    // 检查是否有重复命名
    if(checkRepeatingName.indexOf(variabl) !== -1){
        throw new Error(`有重复命名，将导致按需加载找不到期望的文件,重复变量：${variabl}`);
    }
    checkRepeatingName.push(variabl);
    if(result[filePath]){
        if(result[filePath].variable.indexOf(variabl) === -1){
            result[filePath].variable.push(variabl)
        }
    }else{
        result[filePath] = {
            variable: item[filePath].variable
        }
    }
});
// debugger
const resultString = JSON.stringify(result,null, 2)
const resultPath = process.cwd() + '/src/schma.json'; 
fs.writeFileSync(resultPath, resultString, {encoding:'utf8'});