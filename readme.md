### 安装 配合```replaceSource```这个babel插件使用
1. npm i -D collectexport

### 使用
1. 在目标库里写入package.json命令 
```
script:{
    "creat:schma": "collectexport"
}
```
2. ```npm run creat:schma```,将生成```schma.json```文件。

### 规则
1. 只会收录原文件的export
2. 只对以下形式进行收集
```
export {
    a,
    b
}
export const c = 1;
export enum D {
    Red,
    Green
}
```
3. 不收集```export default```
### 不支持写法
1. ```<QueryObject>addQuery``尖括号常常出现错误，会被当做JSX来解析
    > ```<QueryObject>addQuery``` ===> ```addQuery as  QueryObject```