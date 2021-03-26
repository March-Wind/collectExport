import glob from 'glob';
import { formatURL } from '../src/tool'
/**
 * 默认是在当前目录的src下寻找文件
 */
const collectFile = ():string[] => {
    const cwd = process.cwd(); // 当前进程目录
    return glob.sync(formatURL(`**/*.*(js|ts|jsx|tsx)`), {
        dot: true,
        matchBase: true,
        cwd: `${cwd}/src/`,
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
}
export default collectFile