import fs from 'node:fs';
const lessons=JSON.parse(fs.readFileSync(new URL('./src/lessons.json',import.meta.url),'utf8'));
if(lessons.length!==12||lessons.some(l=>!l.title||!Array.isArray(l.pattern)||!l.pattern.length))throw new Error('Les 12 exercices doivent contenir un titre et un motif.');
const dir=new URL('./dist/',import.meta.url);fs.mkdirSync(dir,{recursive:true});
const runtime=fs.readFileSync(new URL('./src/app.js',import.meta.url),'utf8');
const js='const lessons='+JSON.stringify(lessons)+';\n'+runtime;
fs.writeFileSync(new URL('app.js',dir),js);
for(const file of ['index.html','tempo.css','tempo-icon.svg'])fs.copyFileSync(new URL('./src/'+file,import.meta.url),new URL(file,dir));
const css=fs.readFileSync(new URL('tempo.css',dir),'utf8').replace(/^@import[^;]+;/,'');
const html=fs.readFileSync(new URL('index.html',dir),'utf8').replace('<link rel="stylesheet" href="tempo.css">',()=>'<style>'+css+'</style>').replace('<script src="app.js" defer></script>','').replace('</body>',()=>'<script>'+js.replaceAll('</script','<\\/script')+'</script></body>');
fs.writeFileSync(new URL('Tempo.html',dir),html);
console.log('Build OK : dist/ contient Tempo et ses 12 exercices.');

