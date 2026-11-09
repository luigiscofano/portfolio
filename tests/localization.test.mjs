import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
const pt=JSON.parse(fs.readFileSync('content/portfolio.json','utf8'));
const en=JSON.parse(fs.readFileSync('content/portfolio.en.json','utf8'));
test('English content preserves structure, links, assets and factual scope',()=>{
 const unchanged=new Set(['id','category','url','demo','image','imageSource','photo','github','linkedin','email','personalEmail','source','documentation','sourcesDate']);
 function walk(a,b,key=''){
  assert.equal(typeof a,typeof b,key);
  if(Array.isArray(a)){assert.equal(a.length,b.length,key);a.forEach((v,i)=>walk(v,b[i],key));}
  else if(a&&typeof a==='object'){assert.deepEqual(Object.keys(a),Object.keys(b));Object.keys(a).forEach(k=>walk(a[k],b[k],k));}
  else if(typeof a!=='string'||unchanged.has(key))assert.equal(a,b,key);
 }
 walk(pt,en);
 assert.equal(en.profile.aboutOverview.length,5);
 assert.ok(en.profile.aboutOverview[1].includes('coordinated by Professor Tereza Cristina Melo de Brito Carvalho'));
 assert.ok(en.projects.find(p=>p.id==='gesturelab').limitation.includes('No custom models are trained'));
});
test('Language selection and accessible navigation remain explicit',()=>{
 const page=fs.readFileSync('app/page.tsx','utf8');
 assert.ok(page.includes('htmlFor="portfolio-language"'));
 assert.ok(page.includes('document.documentElement.lang='));
 assert.ok(page.includes("localStorage.setItem('portfolio-language'"));
 assert.ok(page.includes("url.searchParams.set('lang',value)"));
 assert.ok(page.includes('id="conteudo" tabIndex={-1}'));
 assert.ok(page.includes("event.key==='Escape'"));
 assert.ok(page.includes('focus({preventScroll:true})'));
});
test('Key text and focus palettes meet WCAG AA contrast thresholds',()=>{
 const luminance=h=>h.match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
 const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
 for(const [fg,bg] of [['59675e','faf9f5'],['3d7095','faf9f5'],['3d7095','eff2f5'],['626e68','ffffff'],['4f7057','eaf0e8'],['4d6277','edf2f7'],['6e5d7b','f0edf5'],['73578a','f0edf5'],['ffffff','4d6b57']])assert.ok(contrast(fg,bg)>=4.5,`${fg}/${bg}`);
 // The hero subtitle is large text; timeline icons are graphical objects.
 for(const [fg,bg] of [['627b66','faf9f5'],['ffffff','548eb7'],['ffffff','6e9675']])assert.ok(contrast(fg,bg)>=3,`${fg}/${bg}`);
});
test('Localized title has one owner and approved PDF remains downloadable',()=>{
 const page=fs.readFileSync('app/page.tsx','utf8');
 const layout=fs.readFileSync('app/layout.tsx','utf8');
 assert.ok(page.includes("<title>{language==='en'?"));
 assert.ok(!page.includes('document.title='));
 assert.ok(!layout.includes('title:'));
 assert.equal(pt.profile.resume.url,en.profile.resume.url);
 const pdf=fs.readFileSync(`public${pt.profile.resume.url}`);
 assert.equal(pdf.subarray(0,5).toString(),'%PDF-');
 assert.equal(pdf.length,43686);
 assert.equal(createHash('sha256').update(pdf).digest('hex'),'49b07b4cbf364e2cda982e3f82388610a0b070f6eb12d1ff6f8c643bc689d13d');
 assert.ok(page.includes('download={resume.downloadName}'));
});

test('Portuguese resume is the reviewed native document',()=>{
 assert.equal(pt.profile.resumePt.url,en.profile.resumePt.url);
 const docx=fs.readFileSync(`public${pt.profile.resumePt.url}`);
 assert.equal(createHash('sha256').update(docx).digest('hex'),'576f67b1633b6c6f9e7bb5321be6103b469233a00139bf6d4e0c2de3bd020f42');
});
