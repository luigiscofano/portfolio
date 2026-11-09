import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const data = JSON.parse(fs.readFileSync(new URL('../content/portfolio.json',import.meta.url),'utf8'));
const root = path.resolve(new URL('..',import.meta.url).pathname);
test('six distinct projects and required truthful content',()=>{
 assert.equal(data.projects.length,6);
 assert.equal(new Set(data.projects.map(p=>p.id)).size,6);
 for(const p of data.projects){for(const key of ['name','summary','details','contribution','limitation','url']) assert.ok(p[key],`${p.id}.${key}`); assert.ok(['IA','Dados','Software','Hardware'].includes(p.category)); assert.ok(p.url.startsWith('https://github.com/luigiscofano/'));}
});
test('all referenced local images exist and have descriptions',()=>{
 assert.ok(fs.existsSync(path.join(root,'public',data.profile.photo)));
 for(const p of data.projects) if(p.image){assert.ok(fs.existsSync(path.join(root,'public',p.image))); assert.ok(p.imageAlt); assert.ok(p.imageSource.startsWith('https://'));}
});
test('navigation IDs are unique and rendered',()=>{
 const page=fs.readFileSync(path.join(root,'app/page.tsx'),'utf8');
 assert.equal(new Set(data.navigation.map(n=>n.id)).size,data.navigation.length);
 for(const n of data.navigation) assert.ok(page.includes(`id="${n.id}"`),n.id);
});
test('links use expected safe protocols',()=>{
 const urls=[data.profile.github,data.profile.linkedin,...data.projects.flatMap(p=>[p.url,p.demo,p.imageSource]),...data.research.map(r=>r.url)].filter(Boolean);
 for(const value of urls) assert.equal(new URL(value).protocol,'https:');
 assert.match(data.profile.email,/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
});
test('important scope boundaries remain explicit',()=>{
 const byId=Object.fromEntries(data.projects.map(p=>[p.id,p]));
 assert.match(byId.intuicao.limitation,/IA clássica/);
 assert.match(byId.tupi.limitation,/fictícios/);
 assert.match(byId.kaggle.contribution,/colaborativo/);
 assert.match(byId.kaggle.limitation,/Não são apresentados pontuação/);
 assert.match(byId.gesturelab.contribution,/pré-treinados/);
 assert.match(byId.labdig.limitation,/pendente/);
});

test('self-hosted fonts and clear icon licenses exist',()=>{
 for(const file of ['fonts/quicksand-400.ttf','fonts/quicksand-500.ttf','fonts/quicksand-700.ttf','fonts/playfair-display-700.ttf','licenses/Quicksand-OFL.txt','licenses/PlayfairDisplay-OFL.txt','licenses/FontAwesome-LICENSE.txt'])assert.ok(fs.statSync(path.join(root,'public',file)).size>100,file);
 const icons=JSON.parse(fs.readFileSync(path.join(root,'content/icons.json'),'utf8'));for(const name of ['github','linkedin','envelope','graduation-cap','book-open']){assert.ok(icons[name].viewBox);assert.ok(icons[name].paths.length);}
});
test('education uses accessible controlled accordion and content stays editable',()=>{
 const page=fs.readFileSync(path.join(root,'app/page.tsx'),'utf8');assert.ok(page.includes('aria-controls={`education-panel-${index}`}'));assert.ok(page.includes('hidden={educationOpen!==index}'));assert.ok(page.includes('aria-expanded={educationOpen===index}'));assert.equal(data.profile.aboutOverview.length,3);assert.ok(data.profile.documentation.startsWith('https://github.com/'));
});
test('approved section order matches navigation and rendered sections',()=>{
 const expected=['sobre','projetos','pesquisa','formacao','trajetoria','contato'];
 assert.deepEqual(data.navigation.map(n=>n.id),expected);
 const page=fs.readFileSync(path.join(root,'app/page.tsx'),'utf8');
 assert.deepEqual([...page.matchAll(/<section id="([^"]+)"/g)].map(m=>m[1]),expected);
});
test('only real approved screenshots are promoted to project previews',()=>{
 assert.deepEqual(data.projects.filter(p=>p.showImagePreview).map(p=>p.id),['intuicao','pokedex']);
 for(const p of data.projects.filter(p=>p.showImagePreview)){assert.ok(p.imageWidth>0);assert.ok(p.imageHeight>0);assert.match(p.imageSource,/github\.com\/luigiscofano\//);assert.ok(p.caption);}
 const page=fs.readFileSync(path.join(root,'app/page.tsx'),'utf8');
 assert.ok(page.includes('project.image&&!project.showImagePreview'));
});
test('personal signature remains editable and has accessible text',()=>{
 assert.equal(data.visualSignature.enabled,true);assert.ok(data.visualSignature.alt.includes('bem-te-vi'));
 const asset=fs.readFileSync(path.join(root,'public',data.visualSignature.image),'utf8');assert.ok(asset.includes('<svg'));assert.ok(!asset.includes('<script'));
});
test('authentic Sintonia sprite uses the exact original atlas and frame',async()=>{
 const {createHash}=await import('node:crypto');const sprite=data.profile.nameSprite;
 assert.equal(sprite.enabled,false, 'O sprite junto ao nome fica desativado conforme solicitado');assert.equal(sprite.backgroundSize,'400% 400%');assert.equal(sprite.backgroundPosition,'66.66666666666666% 0%');
 assert.equal(createHash('sha256').update(fs.readFileSync(path.join(root,'public',sprite.image))).digest('hex'),'d7d4b80f054b8f16d44c0d0b8805bf0f5074caaae443e69394156ccc84211b18');
 const page=fs.readFileSync(path.join(root,'app/page.tsx'),'utf8');assert.equal((page.match(/<NameSprite\/>/g)||[]).length,1);assert.equal((page.match(/<ProfileName\/>/g)||[]).length,2);
 assert.equal(sprite.source,'https://github.com/luigiscofano/intuicao/blob/main/dist/sintonia/assets/chibi-user-roster.svg');
});
test('full name and sprite stay together on the last name line',()=>{
 assert.equal(data.profile.name,'Luigi Scofano de Araujo');
 const page=fs.readFileSync(path.join(root,'app/page.tsx'),'utf8');const css=fs.readFileSync(path.join(root,'app/globals.css'),'utf8');
 assert.ok(page.includes('const words=data.profile.name.trim().split'));assert.ok(page.includes('className="name-ending">{suffix}<NameSprite/>'));
 assert.ok(css.includes('.name-ending{white-space:nowrap}'));assert.ok(css.includes('vertical-align:calc(var(--sprite-size) * -0.0494417863)'));
});

test('personal and professional emails remain separate and editable',()=>{
 assert.equal(data.profile.personalEmail,'luigiaraujo23@gmail.com');
 assert.equal(data.profile.email,'luigiscofano.dev@gmail.com');
 const page=fs.readFileSync(path.join(root,'app/page.tsx'),'utf8');
 assert.ok(page.includes('email:data.profile.personalEmail'));
 assert.ok(page.includes('onClick={()=>copyEmail(email)}'));
});
