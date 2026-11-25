/* A short workplace conversation. Personal card reviews live in the host application. */
const Werktaal = (() => {
  const byId = new Map(werkSituaties.map(scene => [scene.id, scene]));
  const modeLabels = {listen: 'Anla', speak: 'Söyle'};
  const speakerLabels = {Collega: 'İş arkadaşın', Inwoner: 'Başvuran kişi', Medewerker: 'Kurum çalışanı'};
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const day = () => {
    const d = new Date();
    return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-');
  };
  const dateLabel = () => new Intl.DateTimeFormat('tr-TR', {day:'numeric',month:'long',weekday:'long'}).format(new Date());
  const sceneFor = id => byId.get(id) || werkSituaties[0];
  const validModes = mode => Object.hasOwn(modeLabels,mode);
  function read(storageName,key,fallback) {
    try { return JSON.parse(window[storageName].getItem(key)) ?? fallback; } catch { return fallback; }
  }
  function write(storageName,key,value) {
    try { window[storageName].setItem(key,JSON.stringify(value)); } catch { /* Practice also works in memory. */ }
  }
  const prefix = document.documentElement.dataset.workPreview ? 'kv_work_preview56_' : 'kv_work56_';
  const initialFocus = read('localStorage',prefix+'focus',{});
  let mode = validModes(initialFocus.mode) ? initialFocus.mode : 'listen';
  let selection = initialFocus.day === day() && byId.has(initialFocus.scene) ? initialFocus.scene : null;
  let session = read('sessionStorage',prefix+'session',null);
  if (!session || !byId.has(session.scene) || !validModes(session.mode) || !['recall','model','transfer','compare','question','done'].includes(session.phase)) session = null;
  let ownAnswer = '';
  let adapter;
  let playback;
  function focusChoice() {
    if(selection) return sceneFor(selection);
    const last = new Map();
    for (const event of adapter.events()) {
      if (event.mode===mode && (!last.has(event.scene) || event.at>last.get(event.scene).at)) last.set(event.scene,event);
    }
    const rank=e=>e?.result==='review' && e.day<day() ? 0 : e ? 2 : 1;
    return [...werkSituaties].sort((a,b)=>{
      const x=last.get(a.id),y=last.get(b.id);
      return rank(x)-rank(y)||(x?.at||'').localeCompare(y?.at||'');
    })[0];
  }
  function saveFocus() {
    write('localStorage',prefix+'focus',{scene:selection,mode,day:day()});
  }
  function saveSession() {
    write('sessionStorage',prefix+'session',session);
  }
  function mount(host) {
    adapter = host;
    renderHome();
  }
  function changeMode(value) {
    if (!validModes(value)) return;
    selection = focusChoice().id;
    mode = value;
    saveFocus();
    renderHome();
    document.querySelector('#work-home [data-mode="'+value+'"]')?.focus({preventScroll:true});
  }
  function choose(value) {
    if (!byId.has(value)) return;
    selection = value; saveFocus(); renderHome();
    document.querySelector('#work-home .work-select select')?.focus({preventScroll:true});
  }
  function renderHome() {
    if (!adapter) return;
    const el = document.getElementById('work-home');
    const scene = focusChoice();
    const resume = session && session.phase !== 'done' && session.mode === mode && session.scene === scene.id;
    const options = werkSituaties.map(s => '<option value="'+s.id+'"'+(s.id===scene.id?' selected':'')+'>'+escape(s.title)+'</option>').join('');
    const modes = Object.entries(modeLabels).map(([value,label]) => '<button type="button" data-mode="'+value+'" aria-pressed="'+(value===mode)+'" onclick="Werktaal.changeMode(this.dataset.mode)">'+ic(value==='listen'?'headphones':'message')+label+'</button>').join('');
    const cards = adapter.cardPanel ? adapter.cardPanel() : '';
    const markup =
      '<div class="work-home-grid'+(cards?'':' work-home-single')+'"><section class="work-hero">' +
        '<div class="work-hero-head"><span class="work-kicker">İş durumu</span><label class="work-select"><span>Durum değiştir</span><select aria-label="İş durumunu seç" onchange="Werktaal.choose(this.value)">'+options+'</select></label></div>'+
        '<div class="work-place" lang="nl">'+escape(scene.place)+'</div><h2>'+escape(scene.title)+'</h2>'+
        '<p class="work-context">'+escape(scene.context)+'</p>'+
        '<div class="work-hero-foot"><div class="work-mode" role="group" aria-label="Çalışma hedefi">'+modes+'</div>'+
        '<p class="work-mode-help">'+(mode==='listen'?'Karşındaki kişiyi dinle. Ne demek istiyor?':'Kısa bir cevap ver. Sonra kalıbı değiştir.')+'</p>'+
        '<button type="button" class="work-start" onclick="Werktaal.start()">'+ic('play')+(resume?'Kaldığın yerden devam et':mode==='listen'?'Dinlemeye başla':'Söylemeye başla')+'</button></div></section>'+cards+'</div>';
    if(el.lastWorkMarkup!==markup) { el.innerHTML=markup; el.lastWorkMarkup=markup; }
    const date = document.querySelector('#work-date');
    if(date) date.textContent = dateLabel();
  }
  function shuffleChoices() {
    const order=[0,1,2];
    for(let i=order.length-1;i>0;i--){
      const pick=Math.floor(Math.random()*(i+1));
      [order[i],order[pick]]=[order[pick],order[i]];
    }
    return order;
  }
  function start(forceNew=false) {
    const scene = focusChoice();
    selection = scene.id; saveFocus(); stopAudio();
    if(forceNew || !session || session.phase==='done' || session.scene!==scene.id || session.mode!==mode) {
      const count = adapter.events().filter(e=>e.scene===scene.id && e.mode==='speak').length;
      const id = globalThis.crypto?.randomUUID?.() || Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
      session = {id,scene:scene.id,mode,phase:mode==='listen'?'question':'recall',variant:count%scene.variants.length,choice:null,order:shuffleChoices(),usedHint:false};
      ownAnswer = '';
    }
    saveSession();
    adapter.showSession(); renderSession(true);
  }
  function leave() {
    stopAudio(); adapter.showHome(); renderHome();
    document.querySelector('.work-start')?.focus({preventScroll:true});
  }
  function changePhase(to) {
    if (!session) return;
    const next = {recall:'model',model:'transfer',transfer:'compare'};
    if(next[session.phase]!==to) return;
    stopAudio(); ownAnswer=''; session.phase=to; saveSession(); renderSession(true);
  }
  function pick(index) {
    if(!session || session.mode!=='listen' || session.phase!=='question' || session.choice!==null || !Number.isInteger(index) || index<0 || index>2) return;
    stopAudio(); session.choice=index; saveSession(); renderSession(true);
  }
  function finish(result) {
    if(!session || session.phase==='done') return;
    const scene=sceneFor(session.scene);
    if(session.mode==='listen') {
      if(session.phase!=='question' || session.choice===null) return;
      result=session.choice===scene.correct?'understood':'review';
    } else if(session.phase!=='compare' || !['independent','with-help','review'].includes(result)) return;
    if(session.mode==='speak' && session.usedHint && result==='independent') result='with-help';
    const event={id:session.id,scene:scene.id,mode:session.mode,result,variant:session.variant,at:new Date().toISOString(),day:day()};
    adapter.record(event);
    session.phase='done'; session.result=result; ownAnswer=''; stopAudio(); saveSession(); renderSession(true);
  }
  function switchMode() {
    if(!session) return;
    selection=session.scene; mode=session.mode==='listen'?'speak':'listen'; start(true);
  }
  function otherVariant() {
    if(!session || session.mode!=='speak' || session.phase!=='done') return;
    const next=(session.variant+1)%sceneFor(session.scene).variants.length;
    selection=session.scene; mode='speak'; start(true);
    session.variant=next; session.phase='transfer'; saveSession(); renderSession(true);
  }
  function button(text,action,style='work-primary') {
    return '<button type="button" class="'+style+'" onclick="'+action+'">'+text+'</button>';
  }
  function textDetails(label,body,classes='') {
    return '<details class="work-disclosure '+classes+'"><summary>'+label+'</summary>'+body+'</details>';
  }
  function translated(text) {
    return textDetails('Türkçeyi göster','<p lang="tr">'+escape(text)+'</p>');
  }
  function listenButton(key,label='Dinle') {
    return '<button type="button" class="work-audio" data-sound="'+key+'" aria-pressed="false" onclick="Werktaal.play(this)">'+ic('volume')+'<span>'+label+'</span></button>';
  }
  function audioStatus() {
    return '<p class="work-audio-status" role="status"></p>';
  }
  function transcript(scene,open=false) {
    return '<details class="work-disclosure work-transcript"'+(open?' open':'')+'><summary>Hollandaca metin</summary><p class="work-quote" lang="nl">'+escape(scene.heard.nl)+'</p>'+translated(scene.heard.tr)+'</details>';
  }
  function labelForSpeaker(scene){return speakerLabels[scene.speaker];}
  function incoming(scene,compact=false) {
    return '<div class="work-incoming"><div class="work-soundrow"><span>'+escape(labelForSpeaker(scene))+'</span>'+listenButton('heard','Cümleyi dinle')+'</div>'+
      (compact?'<p class="work-quote" lang="nl">'+escape(scene.heard.nl)+'</p>'+translated(scene.heard.tr):transcript(scene,session.choice!==null))+'</div>';
  }
  function showChoicesTR(button) {
    const box=button.closest('.work-question');
    const on=button.getAttribute('aria-expanded')!=='true';
    button.setAttribute('aria-expanded',String(on));
    button.textContent=on?'Türkçe seçenekleri gizle':'Türkçe seçenekleri göster';
    box.querySelectorAll('.work-choice-tr').forEach(p=>p.hidden=!on);
  }
  function question(scene) {
    const answer=session.choice;
    const order=session.order||[0,1,2];
    const choices=order.map((i,position)=>{
      const s=scene.choicesNl[i];
      const marked=answer!==null;
      const status=marked && i===scene.correct?'Doğru anlam':marked && i===answer?'Seçimin':'';
      return '<button type="button" class="work-choice'+(status?' marked':'')+'"'+(marked?' disabled':'')+' onclick="Werktaal.pick('+i+')"><span class="work-option-sign" aria-hidden="true">'+(marked&&i===scene.correct?'✓':marked&&i===answer?'×':String.fromCharCode(65+position))+'</span><span><span lang="nl">'+escape(s)+'</span><span hidden class="work-choice-tr" lang="tr">'+escape(scene.choices[i])+'</span>'+(status?'<small>'+status+'</small>':'')+'</span></button>';
    }).join('');
    const feedback=answer===null?'':'<div class="work-feedback" role="status"><h3 tabindex="-1" data-work-focus>'+ (answer===scene.correct?'Doğru anladın.':'Birlikte açalım.')+'</h3><p lang="nl">'+escape(scene.choicesNl[scene.correct])+'</p>'+textDetails('Kalıbın anlamı','<p><b lang="nl">'+escape(scene.chunk.nl)+'</b> · '+escape(scene.chunk.tr)+'</p>')+'</div>';
    return incoming(scene)+audioStatus()+'<section class="work-question"><h2 tabindex="-1"'+(answer===null?' data-work-focus':'')+'>Ne demek istiyor?</h2><div class="work-choices">'+choices+'</div><button class="work-textbtn" type="button" aria-expanded="false" onclick="Werktaal.showChoicesTR(this)">Türkçe seçenekleri göster</button></section>'+feedback+(answer===null?'':button('Anlamayı bitir','Werktaal.finish()'));
  }
  function framed(scene,phrase) {
    const [start,end]=scene.frame;
    const change=phrase.slice(start.length,phrase.length-end.length);
    return escape(start)+'<mark>'+escape(change)+'</mark>'+escape(end);
  }
  function optionalInput() {
    return '<details class="work-disclosure work-write"'+(ownAnswer?' open':'')+'><summary>Cevabımı yazmak istiyorum</summary><label><span>Kendi cümlen</span><textarea lang="nl" maxlength="900" rows="2" oninput="Werktaal.keepAnswer(this.value)">'+escape(ownAnswer)+'</textarea></label></details>';
  }
  function answerCompare() {
    return ownAnswer.trim()?'<div class="work-myanswer"><span>Senin cümlen</span><p lang="nl">'+escape(ownAnswer)+'</p></div>':'';
  }
  function recall(scene) {
    return incoming(scene,true)+audioStatus()+'<section class="work-question"><h2 tabindex="-1" data-work-focus>Sen nasıl söylersin?</h2><p class="work-intent">'+escape(scene.cue)+'</p>'+optionalInput()+'</section>'+button('Örnek cevabı gör',"Werktaal.reveal('model')");
  }
  function hintOpened(el) {
    if(el.open && session?.phase==='transfer'){session.usedHint=true;saveSession();}
  }
  function model(scene) {
    return '<section class="work-question"><h2 tabindex="-1" data-work-focus>Bir cevap örneği</h2><p class="work-model" lang="nl">'+framed(scene,scene.line.nl)+'</p><div class="work-controls">'+listenButton('line')+translated(scene.line.tr)+'</div>'+audioStatus()+answerCompare()+textDetails('Kalıp ve hitap','<p><b lang="nl">'+escape(scene.tip.nl)+'</b> · '+escape(scene.tip.tr)+'</p>')+'</section>'+button('Şimdi kalıbı değiştir',"Werktaal.changePhase('transfer')");
  }
  function transfer(scene,item) {
    return '<section class="work-question"><h2 tabindex="-1" data-work-focus>Şimdi kalıbı değiştir</h2><p class="work-intent">'+escape(item.cue)+'</p>'+'<details class="work-disclosure" ontoggle="Werktaal.hintOpened(this)"><summary>Kalıptan ipucu al</summary><p class="work-frame" lang="nl">'+escape(scene.frame[0])+'<mark>…</mark>'+escape(scene.frame[1])+'</p></details>'+optionalInput()+'</section>'+button('Bir örnekle karşılaştır',"Werktaal.reveal('compare')");
  }
  function compare(scene,item) {
    return '<section class="work-question"><h2 tabindex="-1" data-work-focus>Değişen bölüm</h2><p class="work-model" lang="nl">'+framed(scene,item.nl)+'</p><div class="work-controls">'+listenButton('variant')+translated(item.tr)+'</div>'+audioStatus()+answerCompare()+'</section>'+
      '<fieldset class="work-grades"><legend>Örneği açmadan önce nasıl söyledin?</legend>'+
      (session.usedHint?'':button('Kendim söyledim',"Werktaal.finish('independent')"))+
      '<div>'+button('Yardımla söyledim',"Werktaal.finish('with-help')",'work-secondary')+button('Tekrar çalışacağım',"Werktaal.finish('review')",'work-secondary')+'</div></fieldset>';
  }
  function reveal(to) {
    if (!session || !((session.phase==='recall'&&to==='model')||(session.phase==='transfer'&&to==='compare'))) return;
    stopAudio(); session.phase=to; saveSession(); renderSession(true);
  }
  function done(scene) {
    const listening=session.mode==='listen';
    const labels={understood:'Anlamı ilk denemede seçtin.',review:listening?'İlk denemede başka bir anlam seçtin. Cümleyi yeniden dinleyebilirsin.':'Bu kalıbı tekrar çalışmak üzere işaretledin.',
      independent:'Değişen cümleyi kendin söylediğini kaydettin.','with-help':'Değişen cümleyi yardımla söylediğini kaydettin.'};
    const line=listening?scene.heard:scene.variants[session.variant];
    return '<span class="work-done-icon">'+ic('check')+'</span><h2 data-work-focus tabindex="-1">Bu çalışma tamam.</h2><p class="work-context-done">'+escape(labels[session.result]||'')+'</p><p class="work-model" lang="nl">'+escape(line.nl)+'</p><div class="work-controls">'+listenButton(listening?'heard':'variant')+translated(line.tr)+'</div>'+audioStatus()+
      button('Bugüne dön','Werktaal.leave()')+
      button(listening?'Aynı durumda cevap ver':'Aynı durumu dinle','Werktaal.switchMode()','work-secondary')+
      (listening && session.result==='review'?button('Cümleyi tekrar çalış','Werktaal.start(true)','work-textbtn'):'')+
      (listening?'':button('Diğer değişikliği dene','Werktaal.otherVariant()','work-textbtn'))+(adapter.related ? adapter.related(scene,session.mode) : '');
  }
  function renderSession(moveFocus=false) {
    if(!session || !adapter) return;
    const scene=sceneFor(session.scene), variant=scene.variants[session.variant]||scene.variants[0];
    const html={question:()=>question(scene),recall:()=>recall(scene),model:()=>model(scene),transfer:()=>transfer(scene,variant),compare:()=>compare(scene,variant),done:()=>done(scene)}[session.phase]();
    const root=document.getElementById('work-session');
    const step=session.mode==='listen'?'Dinlediğini anlama':session.phase==='recall'||session.phase==='model'?'Kendi cevabın · 1/2':session.phase==='done'?'Konuşma çalışması':'Kalıbı değiştirme · 2/2';
    root.innerHTML='<div class="work-session-head"><button type="button" class="work-back" onclick="Werktaal.leave()">'+ic('arrow-left')+'Bugün</button><span>'+step+'</span></div>'+
      '<article class="work-paper"><header><span class="work-kicker" lang="nl">'+escape(scene.place)+'</span><h1>'+escape(scene.title)+'</h1></header>'+html+'</article>';
    if(moveFocus) {
      window.scrollTo(0,0);
      root.querySelector('[data-work-focus]')?.focus({preventScroll:true});
    }
  }
  function stopAudio() {
    const old=playback; playback=null;
    if(!old) return;
    old.controller?.abort();
    if(old.player){old.player.pause(); old.player.onended=null; old.player.onerror=null;}
    if(old.url) URL.revokeObjectURL(old.url);
    if(old.utterance) window.speechSynthesis?.cancel();
    old.button.setAttribute('aria-pressed','false');
    old.button.querySelector('span').textContent=old.label;
  }
  function audioFailed(ticket) {
    if(playback!==ticket) return;
    stopAudio();
    const root=document.getElementById('work-session');
    const text=root.querySelector('.work-transcript');
    if(text) text.open=true;
    const status=root.querySelector('.work-audio-status');
    if(status) status.textContent='Ses şu an kullanılamıyor. Hollandaca metni okuyabilirsin.';
  }
  function speakLocally(ticket,text) {
    if(ticket.utterance || playback!==ticket) return;
    const synth=window.speechSynthesis;
    if (!synth || typeof SpeechSynthesisUtterance==='undefined') return audioFailed(ticket);
    const voices=synth.getVoices(), voice=voices.find(v=>v.lang.toLowerCase()==='nl-nl') || voices.find(v=>v.lang.toLowerCase().startsWith('nl'));
    if(voices.length && !voice) return audioFailed(ticket);
    const utterance=new SpeechSynthesisUtterance(text);
    ticket.utterance=utterance; utterance.lang='nl-NL'; utterance.rate=0.88;
    if(voice) utterance.voice=voice;
    utterance.onend=()=>{if(playback===ticket)stopAudio();};
    utterance.onerror=()=>audioFailed(ticket);
    synth.speak(utterance);
  }
  async function play(button) {
    if(!session) return;
    const same=playback?.button===button; stopAudio(); if(same) return;
    const scene=sceneFor(session.scene);
    const line={heard:scene.heard,line:scene.line,variant:scene.variants[session.variant]}[button.dataset.sound];
    if(!line) return;
    const ticket={button,label:button.querySelector('span').textContent,controller:new AbortController()};
    playback=ticket; button.setAttribute('aria-pressed','true'); button.querySelector('span').textContent='Durdur';
    const status=document.querySelector('#work-session .work-audio-status'); if(status)status.textContent='';
    if(!adapter.cloudAudio || !navigator.onLine) return speakLocally(ticket,line.nl);
    const timer=setTimeout(()=>ticket.controller.abort(),5500);
    try {
      const blob=await adapter.cloudAudio(line.nl,ticket.controller.signal);
      if(playback!==ticket) return;
      ticket.url=URL.createObjectURL(blob); ticket.player=new Audio(ticket.url);
      ticket.player.onended=()=>{if(playback===ticket)stopAudio();};
      ticket.player.onerror=()=>{if(playback===ticket)speakLocally(ticket,line.nl);};
      await ticket.player.play();
    } catch { if(playback===ticket && !ticket.utterance)speakLocally(ticket,line.nl); }
    finally { clearTimeout(timer); }
  }
  return {mount,renderHome,choose,changeMode,start,leave,stopAudio,play,pick,showChoicesTR,hintOpened,
    changePhase,reveal,finish,switchMode,otherVariant,keepAnswer:text=>{ownAnswer=text;},renderSession};
})();
