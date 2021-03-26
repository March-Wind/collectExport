import fs from 'fs';
import * as babelParse from '@babel/parser';
import {File} from '@babel/types';
const transAST = (filePath:string):File => {
    const code = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const AST = babelParse.parse(code, {
        sourceType: 'module',
        allowImportExportEverywhere: true, // 允许import和export在文件的任何位置
        allowSuperOutsideMethod: true, // 默认情况下，super不允许在类和对象方法之外使用。设置它以true接受这样的代码。
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
}
export default transAST;