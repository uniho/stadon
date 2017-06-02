/*
  静的サイトジェネレータ Stadon
  作成者: UNI法務行政書士事務所 http://uni.s17.xrea.com/
  どなたも自由かつ無料でこのコードを利用できます。
  ただしこのコードを利用したことにより生じうる結果につき作成者は一切保証しません。
*/

const fs = require('fs');
const path = require("path");
const mkdirp = require('mkdirp'); // https://github.com/substack/node-mkdirp
const requireFromString = require('require-from-string'); // https://github.com/floatdrop/require-from-string

// 各種パス
EXEC_PATH = `${process.cwd()}${path.sep}`;
SCRIPT_PATH = `${EXEC_PATH}source${path.sep}script${path.sep}`;
COPY_PATH = `${EXEC_PATH}source${path.sep}copy${path.sep}`;
WEB_PATH = `${EXEC_PATH}web${path.sep}`;


function getFileList(startPath, filter) {
  let result = [], files = [];
  if (fs.existsSync(startPath)) {
    files = fs.readdirSync(startPath);
  }  
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      result.push({type:"d", name:files[i]});  
    } else if (!filter || filter.test(files[i])) {
      result.push({type:"f", name:files[i]});  
    }
  }
  return result;
}


function writeFileSub(fn, data, dt) {
  if (!fs.existsSync(path.dirname(fn))) {
    mkdirp.sync(path.dirname(fn));  
  }    
  fs.writeFileSync(fn, data);
  if (dt) fs.utimesSync(fn, dt, dt);
}

// copyディレクトリのファイルはそのままコピーする
function copyFiles(dir) {
  const t = getFileList(dir);
  for (let i = 0; i < t.length; i++) {
    if (t[i].type == "d") {
      copyFiles(`${dir}${t[i].name}${path.sep}`);
    } else {
      const src = `${dir}${t[i].name}`;  
      const dst = src.replace(COPY_PATH, WEB_PATH);
      const src_mtime = fs.statSync(src).mtime;
      const dst_mtime = fs.existsSync(dst) ? fs.statSync(dst).mtime : null;
      if (dst_mtime != src_mtime) {
        writeFileSub(dst, fs.readFileSync(src), src_mtime);
      }  
    }
  }
}


// スクリプトファイル群をビルドする関数
// ファイル名の1文字目が$で始まらず拡張子がjsであるスクリプトだけを実行する
function buildScripts(dir) {
  const t = getFileList(dir, /^(?!\$).*\.js$/i);
  for (let i = 0; i < t.length; i++) {
    if (t[i].type == "d") {
      // サブディレクトリ内を再帰処理
      if (!buildScripts(`${dir}${t[i].name}${path.sep}`)) return false;
    } else {
      const src = `${dir}${t[i].name}`;
      const data = 'module.exports=()=>{ ' + fs.readFileSync(src) + ' };';
      const r = requireFromString(data, src)();
      if (r) {
        // 出力
        if (typeof(r) == "string") {
          // .jsという拡張子を除去したファイルとして出力する
          const dst = (dir + (t[i].name).replace(/\.js$/i, "")).replace(SCRIPT_PATH, WEB_PATH);
          writeFileSub(dst, r);
        } else if (typeof(r) == "object") {
          // 複数のファイルを出力する
          for (let j = 0; j < r.length; j++) {
            const dst = WEB_PATH + r[j].name;
            writeFileSub(dst, r[j].data);
          }  
        }
      } else {
        console.log(`Runtime Error: in ${dir}${t[i].name}`);
        return false
      }
    }
  }
  return true;
} 


// COPY_PATHの中のファイルはそのままコピーする
copyFiles(COPY_PATH);

// スクリプトファイル群をビルドする
if (buildScripts(SCRIPT_PATH))
  console.log("ビルドが完了しました！");

