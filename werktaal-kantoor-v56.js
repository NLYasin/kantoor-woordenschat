/* Integrates the workplace player with the existing collection, sync and backup. */
const werkKey56 = (date,head) => String(date).trim()+'|'+String(head).trim();
const werkRegels56 = new Map();
for (const rule of werkRedactieRegels) {
  for (const head of new Set([rule.head,rule.after.dutch||rule.head])) {
    const key=werkKey56(rule.date,head), group=werkRegels56.get(key)||[];
    group.push(rule); werkRegels56.set(key,group);
  }
}
function werkRedactie56(card,manual=false) {
  if(!card || manual) return card;
  const matches=werkRegels56.get(werkKey56(card.date,card.dutch));
  if(!matches) return card;
  const result={...card};
  for(const rule of matches) {
    for(const [field,value] of Object.entries(rule.after)) {
      const flag=field==='is_legal'||field==='isLegal';
      const old=flag?(result.isLegal??result.is_legal):result[field];
      if(JSON.stringify(old??null)!==JSON.stringify(rule.before[field]??null)) continue;
      if(flag){result.isLegal=value;result.is_legal=value;}
      else result[field]=value;
    }
    if(rule.review) result._needsReview=true;
  }
  return result;
}
const enrichedBeforeWork56=enrich28;
enrich28=function(card) {
  const isManual=meta28(card).editorVersion>=56;
  if(isManual) {
    const result={...card}, meta=meta28(card);
    if(meta.raw) result._raw=meta.raw;
    if(typeof meta.needsReview==='boolean') result._needsReview=meta.needsReview;
    const pending=outbox28['card:'+card.id];
    if(pending) Object.assign(result,pending.body,{isLegal:pending.body.is_legal});
    return result;
  }
  return werkRedactie56(enrichedBeforeWork56(card),Boolean(outbox28['card:'+card.id]));
};
const correctedBeforeWork56=contentFix48;
contentFix48=function(card){
  if(!card || meta28(card).editorVersion>=56 || outbox28['card:'+card.id]) return card;
  return werkRedactie56(correctedBeforeWork56(card));
};

const werkIdSet56=new Set(werkSituaties.map(s=>s.id));
function validWerkEvent56(key,e) {
  return !!(e && typeof e.id==='string' && e.id.length<=120 && key==='werk56:'+e.id &&
    werkIdSet56.has(e.scene) && Number.isFinite(Date.parse(e.at)) &&
    ((e.mode==='listen' && ['understood','review'].includes(e.result)) ||
     (e.mode==='speak' && ['independent','with-help','review'].includes(e.result))));
}
function werkEvents56() {
  return Object.entries(rows28).filter(([key,e])=>validWerkEvent56(key,e) &&
    (!rows28.review_reset_at||e.at>rows28.review_reset_at)).map(([,e])=>e);
}
function saveWerkEvent56(e) {
  const key='werk56:'+e.id;
  if(validWerkEvent56(key,e) && !rows28[key]) state28(key,e);
}
const applyBeforeWork56=applyRows28;
applyRows28=function(){
  applyBeforeWork56();
  let changed=false;
  for(const {key,value} of lastServerRows28) {
    if(validWerkEvent56(key,value) && !rows28[key]) {rows28[key]=value; changed=true;}
  }
  if(changed)persist28();
};
const restoreBeforeWork56=restoreBackup28;
restoreBackup28=async function(data) {
  if(!Array.isArray(data?.cards)) return restoreBeforeWork56(data);
  // Earlier versions keyed restores by surface form. Normalize reviewed historical
  // matches first so an edited headword cannot create a second card or lose its history.
  const cards=data.cards.map(c=>{
    const manual=data.appState?.['cardmeta:'+c?.id]?.editorVersion>=56;
    const normalized=werkRedactie56(c,manual);
    if(!c || manual) return normalized;
    const rule=werkRegels56.get(werkKey56(c.date,c.dutch));
    if(!rule) return normalized;
    const same=CARDS.find(x=>x.id===Number(c.id)&&x.date===c.date &&
      (x.dutch===normalized.dutch || x.dutch===c.dutch));
    return same?{...normalized,dutch:same.dutch,type:same.type}:normalized;
  });
  const result=await restoreBeforeWork56({...data,cards});
  for(const [key,value] of Object.entries(data.appState||{})) {
    if(validWerkEvent56(key,value)&&!rows28[key]) saveWerkEvent56(value);
  }
  await flush28();
  if(Object.keys(outbox28).length) throw new Error('İş durumu sonuçları cihazda. Bağlantı gelince eşitlenecek.');
  if(currentScreen==='tekrar')Werktaal.renderHome();
  return result;
};

const werkRole56 = {use:new Set(),hear:new Set()};
for(const scene of werkSituaties) for(const kind of ['use','hear']) {
  scene.related[kind].forEach(head=>werkRole56[kind].add(compactText44(head)));
}
function roleOfCard56(card) {
  if(!card||source42(card.date)!=='kantoor'||!ready28(card)) return '';
  const head=compactText44(card.dutch);
  return werkRole56.use.has(head)?'use':werkRole56.hear.has(head)?'hear':'';
}
let werkFilter56='all';
const previousFilter56=getFiltered;
getFiltered=function(){return previousFilter56().filter(c=>werkFilter56==='all'||roleOfCard56(c)===werkFilter56);};
document.querySelector('.library-source55').insertAdjacentHTML('beforeend',
  '<div class="library-goal55"><label for="work-fit">İşinde ne için?</label><select id="work-fit" onchange="workSetFit56(this.value)"><option value="all">Bütün kartlar</option><option value="use">Söylemek için önerilenler</option><option value="hear">Duyunca veya okuyunca anla</option></select></div>');
const libraryTools56=document.getElementById('library-filters');
libraryTools56.appendChild(document.querySelector('#screen-cards .stats-row'));
function workSetFit56(kind) {
  werkFilter56=Object.hasOwn(werkRole56,kind)?kind:'all';
  document.getElementById('work-fit').value=werkFilter56;
  renderAll();
}
function openRoleCards56(kind,cardId) {
  const target=cardId==null?null:CARDS.find(c=>Number(c.id)===Number(cardId));
  currentFilter='all';currentDate='all';currentTema='all';searchQuery='';goalFilter55='all';
  document.getElementById('search').value='';document.getElementById('goal-filter55').value='all';
  document.querySelectorAll('#type-filters .fbtn').forEach(b=>b.classList.toggle('active',b.dataset.filter==='all'));
  collectionSource42='kantoor';
  v28Store('kv_collection_source42',collectionSource42);
  workSetFit56(target?'all':kind);
  if(target) {
    openGroups.add(groupMode==='tema'?getTema(target):target.date);
    openCardBodies.add(target.id);
  } else {
    const pool=getFiltered();
    const key=groupMode==='tema'?TEMAS.find(t=>pool.some(c=>getTema(c)===t.id))?.id:sortDates([...new Set(pool.map(c=>c.date))])[0];
    if(key) openGroups.add(key);
  }
  showScreen('cards');buildDateFilters();renderAll();
  document.getElementById('library-filters').open=false;
  if(target) document.getElementById('card-'+target.id)?.scrollIntoView({block:'start'});
  else document.getElementById('work-fit').focus({preventScroll:true});
}
function ownCardsPanel56(){
  const plan=recognitionPlan55(), due=prodQueue55(),pool=activePool55();
  const ref=(icon,title,desc,action)=>'<button type="button" class="work-refrow" onclick="'+action+'"><span class="work-reficon">'+ic(icon)+'</span><span><b>'+title+'</b><small>'+desc+'</small></span><span class="work-ref-end" aria-hidden="true">›</span></button>';
  return '<section class="work-reference"><h2>Kendi kartlarım</h2>'+
    ref('book','Anlama tekrarı',plan.queue.length?plan.queue.length+' kartlık günlük plan':CARDS.length?'Şimdilik hazır kart yok':'Kartlarını görüntüle',plan.queue.length?'startRecognition55()':"showScreen('cards')")+
    ref('message','Söyleme tekrarı',due.length?Math.min(5,due.length)+' ifadelik kısa tur':pool.length?pool.length+' seçili hedef':'Söylemek istediğin ifadeleri seç',due.length?'startProduction55()':pool.length?'showProductionList55()':"openRoleCards56('use')")+
    '<div class="work-moreline"><button type="button" class="work-personal-link" onclick="openRoleCards56(\'use\')">İşe göre kart seç</button>'+
    (pool.length?' · <button type="button" class="work-personal-link" onclick="showProductionList55()">Hedeflerim</button>':'')+'</div></section>';
}
function workRelated56(scene,mode) {
  const kind=mode==='speak'?'use':'hear';
  const found=scene.related[kind].map(head=>CARDS.find(c=>roleOfCard56(c)===kind && compactText44(c.dutch)===compactText44(head))).filter(Boolean).slice(0,3);
  if(!found.length) return '';
  const links=found.map(c=>'<div class="work-related-row"><button type="button" class="work-personal-link" lang="nl" onclick="openRoleCards56(\'all\','+Number(c.id)+')">'+esc28(c.dutch)+'</button>'+(kind==='use'?goalButton55(c,true):'')+'</div>').join('');
  return '<details class="work-related work-disclosure"><summary>Kendi kartlarımda bu konu</summary>'+links+'</details>';
}
const oldCardForWork56=renderCard;
renderCard=function(card) {
  const html=oldCardForWork56(card), kind=roleOfCard56(card);
  if(!kind)return html;
  const label=kind==='use'?'İşte söylemek için öneri':'Duyunca veya okuyunca anla';
  return html.replace('<div class="card-primary-actions44">','<div class="work-library-fit">'+label+'</div><div class="card-primary-actions44">');
};
const oldScheduleView56=renderTekrar;
renderTekrar=function(){
  if(document.getElementById('work-extras').open) oldScheduleView56();
  else Werktaal.renderHome();
};
document.getElementById('work-extras').addEventListener('toggle',function(){if(this.open)renderTekrar();});
const oldProgressForWork56=renderProgress;
renderProgress=function(){
  oldProgressForWork56();
  const events=werkEvents56();
  if(!events.length)return;
  const listen=events.filter(e=>e.mode==='listen'),speak=events.filter(e=>e.mode==='speak');
  const summary=document.createElement('details');summary.className='work-history work-disclosure';
  summary.innerHTML='<summary>İş durumlarında son çalışmalar</summary><p>'+listen.length+' anlama · '+speak.length+' konuşma çalışması</p>';
  const latest=[...events].sort((a,b)=>b.at.localeCompare(a.at)).slice(0,6);
  const labels={understood:'İlk denemede anladım',review:'Tekrar çalışacağım',independent:'Kendim söyledim','with-help':'Yardımla söyledim'};
  for(const e of latest){
    const scene=werkSituaties.find(s=>s.id===e.scene),row=document.createElement('div');
    row.className='work-history-row';
    const name=document.createElement('strong');name.textContent=scene.title;
    const detail=document.createElement('span');detail.textContent=[new Date(e.at).toLocaleDateString('tr-TR',{day:'numeric',month:'short'}),e.mode==='speak'?'Söyle':'Anla',labels[e.result]].join(' · ');
    row.append(name,detail);summary.append(row);
  }
  document.getElementById('progress-content').prepend(summary);
};
Werktaal.mount({
  events:werkEvents56, record:saveWerkEvent56, cardPanel:ownCardsPanel56, related:workRelated56,
  showSession:()=>showScreen('werk'),showHome:()=>showScreen('tekrar'),
  cloudAudio:async (text,signal)=>{
    const response=await fetch(EDGE_TTS_URL,{method:'POST',signal,headers:{'Content-Type':'application/json'},body:JSON.stringify({text,voice:EDGE_TTS_VOICE,rate:'-10%'})});
    if(!response.ok) throw new Error('Audio unavailable');
    return response.blob();
  }
});
