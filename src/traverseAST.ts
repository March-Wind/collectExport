import * as types from '@babel/types';
import traverse, {NodePath, TraverseOptions, Node} from '@babel/traverse';
import useImportVisitorCb from './ASTTypes/import';
import useTSVisitorCb from './ASTTypes/tsDeclaration'
interface ExportMap {
    [x: string]: {
        variable: string[];
    };
}
const traverseAST = (ast:types.File, filePath:string):ExportMap[] => {
    // 收集import过来的变量，在export中药剔除import的变量。从而保证同一个变量只在源文件导出，从而避免命名重复的问题。
    const ImportVariable = [];
    const useImportVisitor = useImportVisitorCb(filePath, ImportVariable);
    // 收集ts的interface 和type命名的变量，然后从export中去除
    const tsExportVariable = [];
    const useTSVisitor = useTSVisitorCb(filePath, tsExportVariable)
    // 搜集export
    const exportVariable = []
    const visitor:TraverseOptions<Node> = {
        ...useImportVisitor,
        ...useTSVisitor,
        ExportSpecifier(path){
            if(types.isIdentifier(path.node.exported)){
                let variable = path.node.exported.name;
                if(path.node.exported.name === 'default'){ //  sessionCache as default 就是取sessionCache
                    variable = path.node.local.name
                }
                const exportMap = {
                    [filePath]: {
                        variable:[
                            variable
                        ]
                    }
                }
                exportVariable.push(exportMap)
            }
        },  
        ExportNamedDeclaration(path){
            if(path.node.source){// 过滤 export {fg} from './a' 
                path.node.specifiers.forEach((node:Node) => {
                    if(types.isExportSpecifier(node) && types.isIdentifier(node.exported)){
                        const exportMap = {
                            [filePath]: {
                                variable: [node.exported.name]
                            }
                        }
                        ImportVariable.push(exportMap)                        
                    }
                })
                return;
            }
            const  declarationNode = path.node.declaration;
            if(declarationNode && (types.isVariableDeclaration(declarationNode))){
                let variable = declarationNode.declarations.map(node => {
                    if(types.isIdentifier(node.id)){
                        return node.id.name;
                    }
                });
                const exportMap = {
                    [filePath]: {
                        variable: variable.filter(item => !!item)
                    }
                }
                exportVariable.push(exportMap)
            }
            if(declarationNode && (types.isTSEnumDeclaration(declarationNode))){// enum表达式
                const exportMap = {
                    [filePath]: {
                        variable: [declarationNode.id.name]
                    }
                }
                exportVariable.push(exportMap)
            }

        },
        
    }
    traverse(ast,visitor);
    const result = exportVariable.filter(exportItem => {
        const exportFilePath = Object.keys(exportItem)[0];
        const exportVariable = exportItem[exportFilePath].variable[0];
        const isImportflag = ImportVariable.find((ImportItem) => {
            const ImportFilePath = Object.keys(ImportItem)[0];
            return ImportItem[ImportFilePath].variable[0] === exportVariable
        });
        const isTSFlag = tsExportVariable.find((tsItem) => {
            const ImportFilePath = Object.keys(tsItem)[0];
            return tsItem[ImportFilePath].variable[0] === exportVariable
        });

        
        return !(isTSFlag || isImportflag);
    });
    return result;
}

export default traverseAST;