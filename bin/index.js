#!/usr/bin/env node
if(process.env.Idebugger){
    module.exports =  require('../src/index');
}else{
    module.exports =  require('../lib/index');
}