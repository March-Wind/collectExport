import traverse, {NodePath, TraverseOptions, Node} from '@babel/traverse';

const importVisitor:TraverseOptions<Node> = {
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

    ExportDeclaration(path){// 所有的export都会走这里
    },
    ExportNamedDeclaration(path){ // export { a, b as c }
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
    ExportAllDeclaration(path){
        /**
         * export * from './a'
         */
    },
    ExportDefaultDeclaration(path){
        /**
         * export default declaration
         */
    },
    ModuleSpecifier(path){
        /**
         * export {memoryCache, sessionCache as default}
         * 
         * export {fg} from './a'
         */

        // path.node.exported
    },
    ExportSpecifier(path){
        /**
         * export {memoryCache, sessionCache as default}
         * 
         * export {fg} from './a'
         */
    },

    DeclareModule(path){// 不懂
    },
    DeclareModuleExports(path){// 不懂
    },
}