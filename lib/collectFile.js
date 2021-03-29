"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glob = require("glob");
var tool_1 = require("./tool");
/**
 * 默认是在当前目录的src下寻找文件
 */
var collectFile = function () {
    var cwd = process.cwd(); // 当前进程目录
    return glob.sync(tool_1.formatURL("**/*.*(js|ts|jsx|tsx)"), {
        dot: true,
        matchBase: true,
        cwd: cwd + "/src/",
        // ignore: [
        //     'node_modules/**',
        //     'webpack/**',
        //     'script/**',
        //     'test/**',
        //     '.*', // '.*'去去掉.eslintrc.js文件;
        //     '*.config.js', // ‘*.config.js’是去掉babel.confog.js等
        //     'server/**'
        // ]
    });
};
exports.default = collectFile;
