import traverse, {NodePath, TraverseOptions, Node} from '@babel/traverse';

const importVisitor:TraverseOptions<Node> = {
    ImportSpecifier(path){// 解构的说明符 例如：import { Component } from 'react';
        // path.node.local.name
    },
    ImportDefaultSpecifier(path){ // default的说明符，例如：import React from "react";
        // path.node.local.name
    },
    ImportNamespaceSpecifier(path){// 命名空间的说明符 例如：import * as React from "react";
        // path.node.local.name
    },
    ImportDeclaration(path){ // import都走,里面判断是那种类型的import
        // path.node.specifiers.forEach((item) => {
        //     if(types.isImportDefaultSpecifier(item)){

        //     }
        //     if(types.isImportNamespaceSpecifier(item)){/

        //     }
        //     if(types.isImportSpecifier(item){ /

        //     }
        // })
    }
}

interface ImportMap {
    [x: string]: {
        variable: string[];
    };
}

let useVisitorKeys = ['ImportSpecifier', 'ImportDefaultSpecifier', 'ImportNamespaceSpecifier']
const useImportVisitorCb = (filePath:string, importVariable:ImportMap[]) => {
    const useImportVisitor:TraverseOptions<Node> = {};
    useVisitorKeys.forEach((item) => {
        useImportVisitor[item] = (path) => {
            const variable = path.node.local.name;
            const importMap = {
                [filePath]: {
                    variable:[
                        variable
                    ]
                }
            }
            importVariable.push(importMap)
        } 
    });
    return useImportVisitor;
}

export default useImportVisitorCb;