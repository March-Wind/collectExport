"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var importVisitor = {
    /**
     *  const memoryCache = '1'
     *  const sessionCache = 2;
     *  const asd = 3;
     *
     *  export default asd;
     *  // export default function(){};
     *  export const localCache = 3;
     *  export const a = function(){}
     *  export {
     *  memoryCache,
     *  sessionCache as default
     *  }
     *
     *  export * from './a'
     *  export {fg} from './a'
     *  module.exports = asd;
     */
    ExportDeclaration: function (path) {
    },
    ExportNamedDeclaration: function (path) {
        // export default asd;
        // export const localCache = 3;
        // export const a = function(){}
        // export {
        //  memoryCache,
        //  sessionCache as default
        // }
        // export * from './a'
        /**
         * 这两种不走这里
         *  export {fg} from './a'
         *  export default asd;
         */
    },
    ExportAllDeclaration: function (path) {
        /**
         * export * from './a'
         */
    },
    ExportDefaultDeclaration: function (path) {
        /**
         * export default declaration
         */
    },
    ModuleSpecifier: function (path) {
        /**
         * export {memoryCache, sessionCache as default}
         *
         * export {fg} from './a'
         */
        // path.node.exported
    },
    ExportSpecifier: function (path) {
        /**
         * export {memoryCache, sessionCache as default}
         *
         * export {fg} from './a'
         */
    },
    DeclareModule: function (path) {
    },
    DeclareModuleExports: function (path) {
    },
};
