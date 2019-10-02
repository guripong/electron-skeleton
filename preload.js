// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// 딱한번 실행됨


//window.ipcRenderer = require('electron').ipcRenderer;
//global.appRoot = window.appRoot = __dirname;




window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
    

    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type]);
    }
  
    replaceText(`mytestid`,"이부분은 preload.js 에서 미리 load되었습니다");
    
  
  
  
  });
  