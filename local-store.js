/* Couche de stockage locale pour la démonstration THOT. Aucune requête réseau. */
const DB_KEY='thot-demo-db-v1', AUTH_KEY='thot-demo-session-v1';
const FILE_STORE_PREFIX='THOT_DEMO_SESSION:';
function fileStoreRead(){try{const raw=window.name||'';if(!raw.startsWith(FILE_STORE_PREFIX))return {};return JSON.parse(raw.slice(FILE_STORE_PREFIX.length))||{};}catch(e){return {};}}
function storeGet(key){if(location.protocol==='file:')return fileStoreRead()[key]??null;try{return sessionStorage.getItem(key);}catch(e){return fileStoreRead()[key]??null;}}
function storeSet(key,value){if(location.protocol==='file:'){const all=fileStoreRead();all[key]=String(value);window.name=FILE_STORE_PREFIX+JSON.stringify(all);return;}try{sessionStorage.setItem(key,value);}catch(e){const all=fileStoreRead();all[key]=String(value);window.name=FILE_STORE_PREFIX+JSON.stringify(all);}}
function storeRemove(key){if(location.protocol==='file:'){const all=fileStoreRead();delete all[key];window.name=FILE_STORE_PREFIX+JSON.stringify(all);return;}try{sessionStorage.removeItem(key);}catch(e){const all=fileStoreRead();delete all[key];window.name=FILE_STORE_PREFIX+JSON.stringify(all);}}
const plus=(days)=>{const d=new Date();d.setDate(d.getDate()+days);return d.toISOString().slice(0,10)};
function seed(){return {
 A:{'DEMOADMIN001':{nivol:'DEMOADMIN001',I:'Administrateur Démonstration',F:'Administrateur',nom:'Administrateur Démonstration',role:'admin'}},
 U:{'DEMOUSER0001':{nivol:'DEMOUSER0001',I:'Utilisateur Démonstration',nom:'Utilisateur Démonstration',role:'user'}},
 I:{'sac-secours':{nom:'Sac de secours – équipe A',objets:{'Protection et hygiène':{'Gants nitrile':{q:10,d:plus(400)},'Masques chirurgicaux':{q:5,d:plus(25)},'Gel hydroalcoolique':{q:1,d:plus(-8)},'Lunettes de protection':{q:2},'Paire de ciseaux (absente)':{q:0}},'Matériel de bilan':{'Consommables':{'_sub':true,'Piles AA':{q:4},'Embouts thermomètre':{q:10,d:plus(500)}},'Tensiomètre':{q:1},'Oxymètre de pouls':{q:1,d:plus(150)},'Thermomètre':{q:1}},'Soins et pansements':{'Compresses stériles':{q:10,d:plus(250)},'Pansements':{q:12},'Bande extensible':{q:3},'Sérum physiologique':{q:5,d:plus(12)}}},checks:[],logs:[]},
 'vpsp-inventaire':{nom:'VPSP – lot embarqué',objets:{'Sécurité véhicule':{'Triangle de présignalisation':{q:1},'Gilet haute visibilité':{q:4},'Lampe torche':{q:2}},'Matériel de secours':{'Sac O2':{q:1},'Masque à haute concentration adulte':{q:2,d:plus(500)},'Masque pédiatrique':{q:1,d:plus(-2)},'Bouteille O2 de réserve':{q:1}},'Brancardage':{'Arrimage':{'_sub':true,'Sangles de maintien':{q:4},'Couverture de survie':{q:3}},'Brancard principal':{q:1},'Chaise portoir':{q:1}}},checks:[],logs:[]}},
 P:{'AB_123_CD':{im:'AB-123-CD',n:'VPSP Démonstration',car:'Diesel',km:48250,ass:plus(150),ct:plus(45),en:[{type:'Contrôle périodique',date:plus(12),description:'Contrôle des équipements embarqués'},{type:'Rendez-vous garage',date:plus(5),description:'Révision et vérification des feux'}],inc:[{type:'Pneumatique',date:plus(-3),description:'Crevaison lente roue arrière droite',statut:'À traiter'}],h:[]}}
};}
function read(){try{const d=JSON.parse(storeGet(DB_KEY));if(d&&d.I&&d.P){d.A??={};d.U??={};if(d.A.DEMOADMIN001){d.A.DEMOADMIN001.I??=d.A.DEMOADMIN001.nom??'Administrateur Démonstration';d.A.DEMOADMIN001.F??='Administrateur';}if(d.U.DEMOUSER0001){d.U.DEMOUSER0001.I??=d.U.DEMOUSER0001.nom??'Utilisateur Démonstration';}storeSet(DB_KEY,JSON.stringify(d));return d;}}catch(e){}const d=seed();storeSet(DB_KEY,JSON.stringify(d));return d}
function write(d){storeSet(DB_KEY,JSON.stringify(d));window.dispatchEvent(new CustomEvent('thot-demo-data-changed'))}
function initializeLocalApp(x){return x||{}}
function getLocalSession(){return {get currentUser(){try{return JSON.parse(storeGet(AUTH_KEY))}catch{return null}}}}
async function startDemoSession(auth){const user={uid:'demo-local-user',displayName:null};storeSet(AUTH_KEY,JSON.stringify(user));return {user}}
async function updateDemoProfile(user,profile){const u={...(authUser()||user),...profile};storeSet(AUTH_KEY,JSON.stringify(u));Object.assign(user,u)}
function authUser(){try{return JSON.parse(storeGet(AUTH_KEY))}catch{return null}}
async function clearDemoSession(){storeRemove(AUTH_KEY)}
async function endDemoSession(){storeRemove(AUTH_KEY)}
function onDemoSessionChanged(auth,callback){queueMicrotask(()=>callback(authUser()));return ()=>{}}
function getLocalStore(){read();return {__local:true}}
function localDoc(db,collectionName,id){return {collectionName,id}}
function localCollection(db,collectionName){return {collectionName,__collection:true}}
function removeField(){return {__deleteField:true}}
class Snap{constructor(id,data){this.id=id;this._data=data}exists(){return this._data!==undefined}data(){return this._data}}
async function readDoc(ref){const d=read();return new Snap(ref.id,d[ref.collectionName]?.[ref.id])}
async function readCollection(ref){const vals=read()[ref.collectionName]||{};return {docs:Object.entries(vals).map(([id,data])=>new Snap(id,data)),forEach(fn){this.docs.forEach(fn)},empty:!Object.keys(vals).length,size:Object.keys(vals).length}}
function setPath(obj,path,value){const bits=path.split('.');let cur=obj;for(let i=0;i<bits.length-1;i++){if(!cur[bits[i]]||typeof cur[bits[i]]!=='object')cur[bits[i]]={};cur=cur[bits[i]]}if(value&&value.__deleteField)delete cur[bits.at(-1)];else cur[bits.at(-1)]=value}
async function writeDoc(ref,data){const d=read();d[ref.collectionName]??={};d[ref.collectionName][ref.id]=structuredClone(data);write(d)}
async function patchDoc(ref,updates){const d=read();const obj=d[ref.collectionName]?.[ref.id];if(!obj)throw new Error('Élément introuvable dans les données locales');for(const [k,v] of Object.entries(updates)){if(k.includes('.'))setPath(obj,k,v);else if(v&&v.__deleteField)delete obj[k];else obj[k]=v}write(d)}
async function removeDoc(ref){const d=read();if(d[ref.collectionName])delete d[ref.collectionName][ref.id];write(d)}

function onLocalChange(ref,callback){const run=async()=>callback(ref.__collection?await readCollection(ref):await readDoc(ref));run();const handler=(e)=>{if(e.key===DB_KEY)run()};window.addEventListener('storage',handler);window.addEventListener('thot-demo-data-changed',run);return ()=>{window.removeEventListener('storage',handler);window.removeEventListener('thot-demo-data-changed',run)}}

// API locale exposée aux pages, sans modules ES : compatible avec l'ouverture directe de index.html.
window.THOTLocal = {initializeLocalApp,getLocalSession,startDemoSession,updateDemoProfile,clearDemoSession,endDemoSession,onDemoSessionChanged,getLocalStore,localDoc,localCollection,removeField,readDoc,readCollection,writeDoc,patchDoc,removeDoc,onLocalChange};
window.THOTDemo = { reset(){storeRemove(DB_KEY);storeRemove(AUTH_KEY);location.reload();}, storage:(location.protocol==='file:'?'window.name (session de l’onglet)':'sessionStorage') };
