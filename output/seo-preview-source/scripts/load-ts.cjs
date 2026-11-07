/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test harness. */
const ts = require("typescript");
const fs = require("node:fs");
const Module = require("node:module");
exports.load = (path, overrides = {}) => {
 const mod = new Module(path, module); mod.filename = path; mod.paths = module.paths;
 const normalRequire = mod.require.bind(mod); mod.require = name => overrides[name] ?? normalRequire(name);
 mod._compile(ts.transpileModule(fs.readFileSync(path,"utf8"),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,path);
 return mod.exports;
};
