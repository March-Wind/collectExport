"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var types = require("@babel/types");
var traverse_1 = require("@babel/traverse");
var import_1 = require("./ASTTypes/import");
var tsDeclaration_1 = require("./ASTTypes/tsDeclaration");
var traverseAST = function (ast, filePath) {
    // 收集import过来的变量，在export中药剔除import的变量。从而保证同一个变量只在源文件导出，从而避免命名重复的问题。
    var ImportVariable = [];
    var useImportVisitor = import_1.default(filePath, ImportVariable);
    // 收集ts的interface 和type命名的变量，然后从export中去除
    var tsExportVariable = [];
    var useTSVisitor = tsDeclaration_1.default(filePath, tsExportVariable);
    // 搜集export
    var exportVariable = [];
    var visitor = __assign(__assign(__assign({}, useImportVisitor), useTSVisitor), { ExportSpecifier: function (path) {
            var _a;
            if (types.isIdentifier(path.node.exported)) {
                var variable = path.node.exported.name;
                if (path.node.exported.name === 'default') { //  sessionCache as default 就是取sessionCache
                    variable = path.node.local.name;
                }
                var exportMap = (_a = {},
                    _a[filePath] = {
                        variable: [
                            variable
                        ]
                    },
                    _a);
                exportVariable.push(exportMap);
            }
        },
        ExportNamedDeclaration: function (path) {
            var _a;
            if (path.node.source) { // 过滤 export {fg} from './a' 
                path.node.specifiers.forEach(function (node) {
                    var _a;
                    if (types.isExportSpecifier(node) && types.isIdentifier(node.exported)) {
                        var exportMap = (_a = {},
                            _a[filePath] = {
                                variable: [node.exported.name]
                            },
                            _a);
                        ImportVariable.push(exportMap);
                    }
                });
                return;
            }
            var declarationNode = path.node.declaration;
            if (declarationNode && types.isVariableDeclaration(declarationNode)) {
                var variable = declarationNode.declarations.map(function (node) {
                    if (types.isIdentifier(node.id)) {
                        return node.id.name;
                    }
                });
                var exportMap = (_a = {},
                    _a[filePath] = {
                        variable: variable.filter(function (item) { return !!item; })
                    },
                    _a);
                exportVariable.push(exportMap);
            }
        } });
    traverse_1.default(ast, visitor);
    var result = exportVariable.filter(function (exportItem) {
        var exportFilePath = Object.keys(exportItem)[0];
        var exportVariable = exportItem[exportFilePath].variable[0];
        var isImportflag = ImportVariable.find(function (ImportItem) {
            var ImportFilePath = Object.keys(ImportItem)[0];
            return ImportItem[ImportFilePath].variable[0] === exportVariable;
        });
        var isTSFlag = tsExportVariable.find(function (tsItem) {
            var ImportFilePath = Object.keys(tsItem)[0];
            return tsItem[ImportFilePath].variable[0] === exportVariable;
        });
        return !(isTSFlag || isImportflag);
    });
    return result;
};
exports.default = traverseAST;
