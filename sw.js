if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let t={};const c=e=>n(e,r),f={module:{uri:r},exports:t,require:c};i[r]=Promise.all(s.map((e=>f[e]||c(e)))).then((e=>(o(...e),t)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-0cbf1dc0.js",revision:null},{url:"assets/workbox-window.prod.es5-295a6886.js",revision:null},{url:"index.html",revision:"6f2efa04180f8065ea437aa505c34164"},{url:"icon-192x192.png",revision:"8d3b60e66b92cc9153a3c026a2ff8ebc"},{url:"icon-512x512.png",revision:"f7d4d2b0534320b589d83eb31d5febea"},{url:"icon-512x512-mask.png",revision:"4cf0c17340acfdeec978e1b7a5ce4b0f"},{url:"manifest.webmanifest",revision:"d1f4679bf6b10b6da854a2372fb7549d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
