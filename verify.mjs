import vm from 'node:vm';import fs from 'node:fs';import assert from 'node:assert/strict';
const events={},docEvents={},storage=new Map(),intervals=new Map();let id=0;
const root={innerHTML:'',addEventListener:(k,v)=>events[k]=v,querySelector:()=>null};
const fake={console,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},document:{getElementById:k=>k==='app'?root:null,querySelectorAll:()=>[],addEventListener:(k,v)=>docEvents[k]=v,body:{style:{},append(){}},createElement:()=>({setAttribute(){},remove(){}})},window:{scrollTo(){},AudioContext:class{currentTime=0;resume(){return Promise.resolve()}}},setTimeout:()=>++id,clearTimeout(){},setInterval:(f,t)=>{intervals.set(++id,{f,t});return id},clearInterval:i=>intervals.delete(i)};
vm.createContext(fake);vm.runInContext(fs.readFileSync('dist/app.js','utf8'),fake);
const click=a=>events.click({preventDefault(){},target:{closest:()=>({dataset:{action:a},disabled:false,focus(){}})}});
assert(root.innerHTML.includes('Commencer ma première séance'));
click('tab:parcours');assert.equal((root.innerHTML.match(/class="lesson-row"/g)||[]).length,12);
click('tab:exercices');click('filter:Groove');assert.equal((root.innerHTML.match(/class="library-card panel"/g)||[]).length,2);
click('lesson:5');assert(root.innerHTML.includes('repeat(8,1fr)'));assert(root.innerHTML.includes('1 et 2 et 3 et 4 et'));
click('close');click('settings');click('mode:kit');assert(JSON.parse(storage.get('tempo-v1')).mode==='kit');
events.change({target:{id:'left-handed',checked:true}});click('close');click('lesson:3');assert(root.innerHTML.includes('pied gauche'));assert(root.innerHTML.includes('main gauche'));
click('toggle');await new Promise(r=>setImmediate(r));assert([...intervals.values()].some(x=>x.t===1000));
const counter=[...intervals.values()].find(x=>x.t===1000);for(let n=0;n<60;n++)counter.f();click('complete');
const state=JSON.parse(storage.get('tempo-v1'));assert.equal(state.sessions.length,1);assert.equal(state.sessions[0].seconds,60);assert.equal(state.sessions[0].minutes,1);assert(state.done.includes(3));
click('tab:progres');assert(root.innerHTML.includes('Le pied entre en scène'));events.input({target:{id:'notes',value:'À retravailler à 55 BPM'}});assert.equal(JSON.parse(storage.get('tempo-v1')).note,'À retravailler à 55 BPM');
assert.equal(intervals.size,0);console.log('OK : 12 étapes, filtres, croches, équipement, jeu gaucher, minuteur, enregistrement, notes et arrêt des timers.');

