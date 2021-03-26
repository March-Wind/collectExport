import traverse, {NodePath, TraverseOptions, Node} from '@babel/traverse';

const tsVisitor:TraverseOptions<Node> = {
    TSInterfaceBody(path){ // body：只有内容没有interface 和 ExportMap这种变量名称
        /**
         * {
         *       [x: string]: {
         *          variable: string[];
         *       };
         *  }
         */
    },
    TSInterfaceDeclaration(path){// 整个interface
        /**
         * interface TSDeclarationMap {
         *      [x: string]: {
         *          variable: string[];
         *      };
         */

        // path.node.id.name;
     
    },
    TSEnumDeclaration(path){// enum表达式
        /**
         * enum Color {
         *     Red,
         *     Green
         * }
         */
    },
    TSTypeAliasDeclaration(path){ // type表达式
        /**
         * type Asd = '1'
         */ 

        // path.node.id.name;
    }
}


interface TSDeclarationMap {
    [x: string]: {
        variable: string[];
    };
}

const useTSVisitor = ['TSInterfaceDeclaration', 'TSTypeAliasDeclaration'];
const useTSVisitorCb = (filePath:string, tsVariable:TSDeclarationMap[]) => {
    const useImportVisitor:TraverseOptions<Node> = {};
    useTSVisitor.forEach((item) => {
        useImportVisitor[item] = (path) => {
            const variable = path.node.id.name;
            const tsDeclarationMap = {
                [filePath]: {
                    variable:[
                        variable
                    ]
                }
            }
            tsVariable.push(tsDeclarationMap)
        } 
    });
    return useImportVisitor;
}

export default useTSVisitorCb;