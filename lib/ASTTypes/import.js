"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var importVisitor = {
    ImportSpecifier: function (path) {
        // path.node.local.name
    },
    ImportDefaultSpecifier: function (path) {
        // path.node.local.name
    },
    ImportNamespaceSpecifier: function (path) {
        // path.node.local.name
    },
    ImportDeclaration: function (path) {
        // path.node.specifiers.forEach((item) => {
        //     if(types.isImportDefaultSpecifier(item)){
        //     }
        //     if(types.isImportNamespaceSpecifier(item)){/
        //     }
        //     if(types.isImportSpecifier(item){ /
        //     }
        // })
    }
};
var useVisitorKeys = ['ImportSpecifier', 'ImportDefaultSpecifier', 'ImportNamespaceSpecifier'];
var useImportVisitorCb = function (filePath, importVariable) {
    var useImportVisitor = {};
    useVisitorKeys.forEach(function (item) {
        useImportVisitor[item] = function (path) {
            var _a;
            var variable = path.node.local.name;
            var importMap = (_a = {},
                _a[filePath] = {
                    variable: [
                        variable
                    ]
                },
                _a);
            importVariable.push(importMap);
        };
    });
    return useImportVisitor;
};
exports.default = useImportVisitorCb;
