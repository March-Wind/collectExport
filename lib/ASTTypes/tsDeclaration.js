"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsVisitor = {
    TSInterfaceBody: function (path) {
        /**
         * {
         *       [x: string]: {
         *          variable: string[];
         *       };
         *  }
         */
    },
    TSInterfaceDeclaration: function (path) {
        /**
         * interface TSDeclarationMap {
         *      [x: string]: {
         *          variable: string[];
         *      };
         */
        // path.node.id.name;
    },
    TSEnumDeclaration: function (path) {
        /**
         * enum Color {
         *     Red,
         *     Green
         * }
         */
    },
    TSTypeAliasDeclaration: function (path) {
        /**
         * type Asd = '1'
         */
        // path.node.id.name;
    }
};
var useTSVisitor = ['TSInterfaceDeclaration', 'TSTypeAliasDeclaration'];
var useTSVisitorCb = function (filePath, tsVariable) {
    var useImportVisitor = {};
    useTSVisitor.forEach(function (item) {
        useImportVisitor[item] = function (path) {
            var _a;
            var variable = path.node.id.name;
            var tsDeclarationMap = (_a = {},
                _a[filePath] = {
                    variable: [
                        variable
                    ]
                },
                _a);
            tsVariable.push(tsDeclarationMap);
        };
    });
    return useImportVisitor;
};
exports.default = useTSVisitorCb;
