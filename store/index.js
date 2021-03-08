import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)

import createLogger from "vuex/dist/logger"; // 修改日志

const modulesFiles = require.context('./modules/', true, /\.js$/);   //第一个参数 -读取文件的路径，第二个参数 -是否遍历文件的子目录，第三个参数  -匹配文件的正则
console.log("modulesFiles",modulesFiles);
let modules = {};
modulesFiles.keys().reduce((module, modulePath) => {

  if(!/\index.js$/.test(modulePath)) return;

  console.log("modulePath",modulePath);
  const moduleName = modulePath.replace(/^\.\/(.*)\/index\.\w+$/, '$1');
  console.log("moduleName",moduleName);
  const value = modulesFiles(modulePath);
  console.log("value",value);
  modules[moduleName] = value.default

}, {});

console.log("modules1",modules);
const debug = process.env.NODE_ENV !== "production"; // 开发环境中为true，否则为false


const store = new Vuex.Store({
	namespaced:true,
	modules,
	
	plugins: debug ? [createLogger()] : [] // 开发环境下显示vuex的状态修改
})
export default store