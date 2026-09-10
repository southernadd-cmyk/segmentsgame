'use strict';
const KEY = 'segment-studio-v1';
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle = a => { const r=[...a]; for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]];} return r; };
const fresh = () => ({version:1,round:0,order:shuffle(CLUES.map((_,i)=>i)),sortIndex:0,sortAnswers:{},missionIndex:0,missionPicks:{},connections:{},missionOrder:MISSIONS.map(m=>shuffle(m.options.map((_,i)=>i))),missionResults:{},claimIndex:0,claimAnswers:{},claimOrder:CLAIMS.map(c=>shuffle(c.answers.map((_,i)=>i))),notes:{siteA:'1',siteB:'4'},checks:{},finished:false,ui:{designStep:0,verdictStep:0,siteTab:'A',connectionKind:'audience'},siteDrafts:{}});
let state=fresh(),storageOK=true,loadWarning='';
try {
 const saved=JSON.parse(localStorage.getItem(KEY));
 if(saved?.version===1 && Array.isArray(saved.order) && saved.order.length===CLUES.length && new Set(saved.order).size===CLUES.length && saved.order.every(n=>Number.isInteger(n)&&n>=0&&n<CLUES.length)){
  state={...state,...saved,ui:{...state.ui,...saved.ui}};
  for(const [k,max] of [['round',3],['sortIndex',CLUES.length],['missionIndex',MISSIONS.length],['claimIndex',CLAIMS.length]])state[k]=Math.max(0,Math.min(max,Number(state[k])||0));
  for(const k of ['sortAnswers','missionPicks','connections','missionResults','claimAnswers','notes','checks','siteDrafts'])if(!state[k]||typeof state[k]!=='object'||Array.isArray(state[k]))state[k]={};
  for(const [k,list,prop]of [['missionOrder',MISSIONS,'options'],['claimOrder',CLAIMS,'answers']])if(!Array.isArray(state[k])||state[k].length!==list.length||list.some((item,i)=>!Array.isArray(state[k][i])||state[k][i].length!==item[prop].length||new Set(state[k][i]).size!==item[prop].length||state[k][i].some(n=>!Number.isInteger(n)||n<0||n>=item[prop].length)))state[k]=list.map(item=>shuffle(item[prop].map((_,i)=>i)));
  for(const k of ['siteA','siteB']){if(!BRANDS[Number(state.notes[k])])state.notes[k]=k==='siteA'?'1':'4';state.notes[k]=String(state.notes[k]);}
  state.ui.designStep=state.ui.designStep===1?1:0;
  state.ui.verdictStep=Math.max(0,Math.min(4,Number(state.ui.verdictStep)||0));
  state.ui.siteTab=state.ui.siteTab==='B'?'B':'A';
  if(!['audience','feature','benefit','outcome'].includes(state.ui.connectionKind))state.ui.connectionKind='audience';
 }
} catch { loadWarning='Saved progress could not be loaded. A new session is ready.'; }
const roundNames=['Decode','Design','Challenge','The verdict'];
const roundSubs=['Sort audience details','Choose & connect features','Question the evidence','Compare two websites'];
let interaction='pointer',toastTimer,dialogTrigger=null;
function announce(text){$('#live-status').textContent=text;}
function toast(text){const t=$('#toast');t.textContent=text;t.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{t.hidden=true;},4500);}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));storageOK=true;}catch{storageOK=false;}$('#save-status').textContent=storageOK?'Progress saved on this device':'Saving unavailable — download before leaving';$('#save-status').classList.toggle('save-failed',!storageOK);}
function correctSort(){return Object.entries(state.sortAnswers).filter(([id,a])=>CLUES[id]&&a===CLUES[id][2]).length;}
function correctClaims(){return Object.entries(state.claimAnswers).filter(([id,a])=>CLAIMS[id]&&a===CLAIMS[id].correct).length;}
function xp(){return correctSort()*5+Object.values(state.missionResults).reduce((a,b)=>a+(Number(b.score)||0),0)+correctClaims()*10+(state.finished?100:0);}
function isAllPlayed(){return Object.keys(state.sortAnswers).length===20&&Object.keys(state.missionResults).length===5&&Object.keys(state.claimAnswers).length===8;}
function roundDone(i){return [Object.keys(state.sortAnswers).length===20,Object.keys(state.missionResults).length===5,Object.keys(state.claimAnswers).length===8,state.finished][i];}
function draftProgress(){return ['audienceA','evidenceA','performanceA','audienceB','evidenceB','performanceB','compare','analyse','evaluate'].filter(k=>String(state.notes[k]||'').trim().length>=(['compare','analyse','evaluate'].includes(k)?100:40)).length;}
function syncHud(){
 const counts=[`${Object.keys(state.sortAnswers).length}/20 clues`,`${Object.keys(state.missionResults).length}/5 briefs`,`${Object.keys(state.claimAnswers).length}/8 claims`,state.finished?'Case file complete':`${draftProgress()}/9 entries`];
 $('#round-nav').innerHTML=roundNames.map((n,i)=>`<button class="navitem ${state.round===i?'active':''} ${roundDone(i)?'done':''}" data-round="${i}" ${state.round===i?'aria-current="step"':''}><span class="navnum">${roundDone(i)?'✓':i+1}</span><span class="navcopy"><b>${n}</b><small>${counts[i]}</small></span></button>`).join('');
 const total=xp();$('#xp').innerHTML=`${total}<span> / 400</span>`;$('#progress').value=total;$('#rank').textContent=total>=320?'Creative director':total>=220?'Strategist':total>=100?'Designer':'Recruit';$('#round-count').textContent=`${[0,1,2,3].filter(roundDone).length} of 4 rounds complete`;
}
function render(focus=false){syncHud();[renderSort,renderDesign,renderClaims,renderVerdict][state.round]();save();if(focus)$('#main').focus({preventScroll:true});}
function moveView(){render(true);window.scrollTo({top:0,behavior:'instant'});}
function setRound(r){if(!Number.isInteger(r)||r<0||r>3)return;state.round=r;moveView();}
function action(label,act,extra=''){return `<button class="primary" data-action="${act}" ${extra}>${label}</button>`;}
function header(k,title,desc,tag){return `<div class="roundhead"><div><div class="eyebrow">ROUND ${String(k).padStart(2,'0')} <span>/</span> ${roundNames[k-1]}</div><h2>${title}</h2><p>${desc}</p></div><span class="tag">${tag}</span></div>`;}
function meter(label,index,total,right=''){return `<div class="round-meter"><div><b>${label} ${Math.min(index+1,total)} <span>/ ${total}</span></b><span>${right}</span></div><div class="ticks" role="img" aria-label="${index} of ${total} completed">${Array.from({length:total},(_,i)=>`<i class="${i<index?'complete':i===index?'current':''}"></i>`).join('')}</div></div>`;}
function brand(name){return `<span class="brandpill brand-${name.toLowerCase()}">${name}</span>`;}
function showFeedback(){const el=$('.feedback');if(!el)return;if(interaction!=='keyboard'&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&el.animate)el.animate([{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:160,easing:'cubic-bezier(0.23,1,0.32,1)'});if(interaction==='keyboard')$('.feedback [data-action]')?.focus({preventScroll:true});el.scrollIntoView({behavior:'instant',block:'nearest'});}
function renderSort(){
 let h=header(1,'Who, why, where or how?','Read the audience detail. Choose the category it describes.','20 clues · 100 XP');
 if(state.sortIndex>=CLUES.length){
  h+=`<section class="completion"><span class="completion-mark" aria-hidden="true">✓</span><div class="eyebrow">ROUND COMPLETE</div><h3>Audience decoded.</h3><p>${correctSort()} of 20 first answers correct. Every detail has a design implication.</p>${action('Next: choose website features →','goto-design')}</section><div class="category-results">${CATEGORIES.map((c,i)=>{const qs=CLUES.map((q,id)=>({q,id})).filter(x=>x.q[2]===i);const correct=qs.filter(x=>state.sortAnswers[x.id]===i).length;return `<div class="category-result tone-${i}"><span>${c.cue}</span><b>${c.name}</b><strong>${correct}<small> / ${qs.length}</small></strong></div>`;}).join('')}</div><section class="panel"><h3>What to take into the next round</h3><p>Use the detail you actually know. A person’s age or gender cannot tell you their interests, ability or design preferences.</p><details ${correctSort()<20?'open':''}><summary>${20-correctSort()} clues to revisit</summary>${CLUES.map((c,i)=>state.sortAnswers[i]!==c[2]?`<div class="reviewrow"><b>${esc(c[1])}</b><p><span class="answer-label">${CATEGORIES[c[2]].name}</span> ${esc(c[3])}</p></div>`:'').join('')||'<p>You classified every clue correctly.</p>'}</details><details><summary>Review all 20 explanations</summary>${CLUES.map((c,i)=>`<div class="reviewrow"><b>${state.sortAnswers[i]===c[2]?'✓':'↺'} ${esc(c[1])}</b><p>${CATEGORIES[c[2]].name} — ${esc(c[3])}</p></div>`).join('')}</details></section>`;
 }else{
  const id=state.order[state.sortIndex],c=CLUES[id],answer=state.sortAnswers[id],answered=answer!==undefined;
  let streak=0;for(let n=state.sortIndex-(answered?0:1);n>=0;n--){const q=state.order[n];if(state.sortAnswers[q]===CLUES[q][2])streak++;else break;}
  h+=meter('Clue',state.sortIndex,20,streak?`${streak} correct in a row`:'First correct answer earns 5 XP');
  h+=`<div class="question-stage"><div class="missioncard"><div class="card-top">${brand(c[0])}<span class="scenario-label">Fictional audience detail</span></div><h3>${esc(c[1])}</h3></div><div class="categorygrid" aria-label="Choose a segmentation category">${CATEGORIES.map((cat,i)=>`<button class="category tone-${i} ${answered&&i===c[2]?'correct':''} ${answered&&i===answer&&i!==c[2]?'wrong':''}" data-cat="${i}" ${answered?'disabled':''}><span class="category-top"><span>${cat.cue}</span><kbd>${i+1}</kbd></span><b>${cat.name}</b><small>${cat.examples}</small>${answered&&i===c[2]?'<span class="result-label">✓ Correct category</span>':answered&&i===answer?'<span class="result-label">Your choice</span>':''}</button>`).join('')}</div>`;
  if(answered)h+=`<div class="feedback ${answer===c[2]?'':'bad'}" role="status"><div class="feedback-title"><span class="feedback-icon">${answer===c[2]?'✓':'↺'}</span><h3>${answer===c[2]?'Correct · +5 XP':'A useful distinction'} <small>${CATEGORIES[c[2]].name}</small></h3></div><p>${esc(c[3])}</p><div class="design-takeaway"><b>For the website</b><span>${esc(c[4])}</span></div><div class="actionrow">${action(state.sortIndex===19?'See round results →':'Next clue →','next-sort')}<span class="micro">Read the explanation before moving on.</span></div></div>`;
  else h+='<div class="answer-hint"><span>Choose one card, or use keys <kbd>1</kbd>–<kbd>4</kbd>.</span><button class="textbutton" data-action="guide">Need the definitions?</button></div>';
  h+='</div>';
 }
 $('#main').innerHTML=h;
}
const CONNECTION_KINDS=['audience','feature','benefit','outcome'];
const CONNECTION_LABELS={audience:'Audience detail',feature:'Selected feature',benefit:'Audience benefit',outcome:'Client outcome'};
const CONNECTION_PROMPTS={audience:'Which detail in this brief explains your choice?',feature:'Which of your purchased features responds to that detail?',benefit:'How does that feature help this audience?',outcome:'How does this support the client’s goal?'};
function connectionChoices(i,kind){const m=MISSIONS[i];if(kind==='audience')return m.facts.map((text,id)=>({id,text}));if(kind==='feature')return (state.missionPicks[i]||[]).map(id=>({id,text:m.options[id][0]}));if(kind==='benefit')return m.options.map((o,id)=>({id,text:BENEFITS[i][id]}));return CONNECTIONS[i].outcomes.map((text,id)=>({id,text}));}
function connectionLabel(i,kind,id){return connectionChoices(i,kind).find(c=>c.id===id)?.text||'';}
function connectionIssue(i){
 const c=state.connections[i]||{},p=state.missionPicks[i]||[];
 if(!p.length)return{kind:'feature',text:'Choose features using your six-credit budget first.'};
 const missing=CONNECTION_KINDS.filter(k=>!Number.isInteger(c[k]));
 if(missing.length)return{kind:missing[0],text:`Add ${CONNECTION_LABELS[missing[0]].toLowerCase()} to continue. ${missing.length} of 4 slots still need a card.`};
 if(!p.includes(c.feature))return{kind:'feature',text:'This feature is no longer in your budget. Pick one of your selected features.'};
 if(!CONNECTIONS[i].links[c.feature])return{kind:'feature',text:'This feature does not solve the audience’s task. Use “Edit features” to choose an option you can connect to the brief.'};
 if(!CONNECTIONS[i].links[c.feature].includes(c.audience))return{kind:'audience',text:'That audience detail does not explain this feature. Find a stated need, motivation, location or habit that it directly supports.'};
 if(c.benefit!==c.feature)return{kind:'benefit',text:'That benefit describes a different feature. Think about what your chosen feature actually helps the visitor do.'};
 if(c.outcome!==0)return{kind:'outcome',text:'That outcome is not this client’s goal. Compare it with the goal in the brief.'};
 return null;
}
function connectionError(i){return connectionIssue(i)?.text||'';}
function connectionText(i){return CONNECTION_KINDS.map(k=>`${CONNECTION_LABELS[k]}: ${connectionLabel(i,k,state.connections[i]?.[k])}`).join('\n');}
let connectionFeedback=null,budgetFeedback='';
function renderConnection(i){
 const c=state.connections[i]||{},kind=state.ui.connectionKind;
 state.connectionOrder??={};state.connectionOrder[i]??={};
 const choices=connectionChoices(i,kind);let order=state.connectionOrder[i][kind];
 if(!order||order.length!==choices.length||choices.some(o=>!order.includes(o.id)))order=state.connectionOrder[i][kind]=shuffle(choices.map(o=>o.id));
 const filled=CONNECTION_KINDS.filter(k=>connectionLabel(i,k,c[k])).length;
 return `<section class="connection-builder"><div class="section-heading"><div><span class="eyebrow">STEP 2 · MAKE THE CONNECTION</span><h3>Build an explanation from the cards.</h3><p>Choose a slot, then drag or click a card to fill it. Connect all four ideas.</p></div><span class="count-chip">${filled} / 4 filled</span></div><div class="connection-workspace"><div class="connection-slots">${CONNECTION_KINDS.map((k,n)=>{const value=connectionLabel(i,k,c[k]);return `<div class="connection-slot ${kind===k?'active':''} ${value?'filled':''} ${connectionFeedback?.kind===k?'has-error':''}" data-drop-kind="${k}"><button class="slot-button" data-connection-kind="${k}" aria-pressed="${kind===k}" aria-label="${CONNECTION_LABELS[k]}: ${esc(value||'empty')}. Show choices."><span class="slot-index">${value?'✓':n+1}</span><span class="slot-copy"><span>${['Because the audience…','We would use…','So visitors can…','Helping the client…'][n]}</span><strong>${esc(value||'Add '+CONNECTION_LABELS[k].toLowerCase())}</strong></span></button>${value?`<button class="clear-card" data-clear-connection="${k}" aria-label="Remove ${CONNECTION_LABELS[k].toLowerCase()}">×</button>`:''}</div>`;}).join('')}</div><div class="connection-bank"><div class="bank-heading"><span class="eyebrow">${CONNECTION_KINDS.indexOf(kind)+1} / 4 · ${CONNECTION_LABELS[kind]}</span><h4>${CONNECTION_PROMPTS[kind]}</h4></div><div class="bank-cards">${choices.length?order.map(id=>{const o=choices.find(x=>x.id===id);return `<button class="connection-card ${c[kind]===id?'chosen':''}" draggable="true" data-connection-card="${id}" data-kind="${kind}" aria-pressed="${c[kind]===id}"><span class="drag-handle" aria-hidden="true">⠿</span><span>${kind==='audience'?`<small>${CATEGORIES[id].cue}</small>`:''}${esc(o.text)}</span><span class="card-check" aria-hidden="true">${c[kind]===id?'✓':'+'}</span></button>`;}).join(''):'<p>Choose features from the budget first.</p>'}</div><p class="micro">Cards can be replaced. A filled slot does not necessarily mean a correct connection.</p></div></div><div id="design-error" class="inline-alert ${connectionFeedback?'visible':''}" role="status">${esc(connectionFeedback?.text||'')}</div><div class="actionbar"><button class="quiet" data-design-step="0">← Edit features</button><span class="micro">${filled===4?'All four slots filled. Check how the ideas fit.':'Fill every slot, then check your reasoning.'}</span>${action('Check & submit pitch →','submit-design')}</div></section>`;
}
function placeConnection(kind,id,target){
 const i=state.missionIndex;
 if(state.round!==1||!MISSIONS[i]||state.missionResults[i]||!CONNECTION_KINDS.includes(kind))return;
 if(kind!==target){announce(`Use the ${CONNECTION_LABELS[kind].toLowerCase()} slot for this card.`);toast(`Drop this into the ${CONNECTION_LABELS[kind].toLowerCase()} slot.`);return;}
 if(!connectionChoices(i,kind).some(c=>c.id===id))return;
 state.connections[i]??={};state.connections[i][kind]=id;connectionFeedback=null;
 state.ui.connectionKind=CONNECTION_KINDS.find(k=>!connectionLabel(i,k,state.connections[i][k]))||kind;
 state.ui.designStep=1;render();announce(`${CONNECTION_LABELS[kind]} added. ${CONNECTION_KINDS.filter(k=>connectionLabel(i,k,state.connections[i][k])).length} of 4 slots filled.`);
 if(interaction==='keyboard')$(`[data-connection-kind="${state.ui.connectionKind}"]`)?.focus({preventScroll:true});
}
function missionScore(picks,m){return Math.round(picks.reduce((s,i)=>s+m.options[i][2],0)/12*24);}
function briefPanel(i,compact=false){const m=MISSIONS[i],b=BRANDS[m.brand],clue=state.connections[i]?.audience;return `<section class="brief ${compact?'compact':''}"><div class="card-top">${brand(b.name)}<span class="scenario-label">Fictional brief</span></div><h3>${m.title}</h3><div class="client-goal"><span>CLIENT GOAL</span><p>${m.client}</p></div><div class="brief-facts">${m.facts.map((f,k)=>`<div class="fact ${clue===k?'linked':''}"><b>${CATEGORIES[k].cue}</b><span>${f}</span></div>`).join('')}</div>${!compact?`<div class="brief-task"><b>Your visitor’s task</b><p>${m.need}</p></div>`:''}<details class="source-note"><summary>Real website evidence ↗</summary><p>${b.feature}. Your design is a proposed response to this fictional brief.</p><a href="${SOURCES[b.source].url}" target="_blank" rel="noopener noreferrer">Read the feature explanation ↗</a></details></section>`;}
function renderDesign(){
 let h=header(2,'Design for the person.','Spend six credits on useful features, then explain one choice with the matching cards.','5 briefs · 120 XP');
 if(state.missionIndex>=MISSIONS.length){
  h+=`<section class="completion"><span class="completion-mark">✓</span><div class="eyebrow">FIVE BRIEFS COMPLETE</div><h3>Your portfolio is taking shape.</h3><p>${Object.values(state.missionResults).reduce((a,b)=>a+b.score,0)} / 120 XP for matching features to the briefs.</p>${action('Next: challenge the claims →','goto-claims')}</section><section class="panel"><h3>Your pitches</h3>${MISSIONS.map((m,i)=>`<details><summary>${BRANDS[m.brand].name} <span class="detail-score">${state.missionResults[i]?.score??0}/24 XP</span></summary><p>${(state.missionResults[i]?.picks||[]).map(j=>m.options[j][0]).join(' · ')}</p><p class="connection-summary">${esc(state.notes['pitch'+i]||'No pitch recorded.')}</p></details>`).join('')}</section>`;$('#main').innerHTML=h;return;
 }
 const i=state.missionIndex,m=MISSIONS[i],picks=state.missionPicks[i]||[],result=state.missionResults[i],spent=picks.reduce((a,j)=>a+m.options[j][1],0),step=result?2:state.ui.designStep;
 h+=meter('Brief',i,5,BRANDS[m.brand].name);
 h+=`<div class="stage-nav" aria-label="Steps for this brief">${['Choose features','Connect ideas','Review pitch'].map((label,n)=>`<button data-design-step="${n}" class="${step===n?'active':''}" ${result||n===2?'disabled':''} ${step===n?'aria-current="step"':''}><span>${n+1}</span>${label}</button>`).join('')}</div>`;
 if(step===0){
  h+=`<div class="design-layout">${briefPanel(i)}<section class="feature-shop"><div class="budget"><div><span class="eyebrow">YOUR BUDGET</span><strong>${6-spent}<small> credits left</small></strong></div><div class="credit-dots" role="img" aria-label="${spent} of 6 credits spent">${Array.from({length:6},(_,j)=>`<i class="${j<spent?'spent':''}"></i>`).join('')}</div></div><div class="options">${state.missionOrder[i].map(j=>{const o=m.options[j],chosen=picks.includes(j),over=!chosen&&spent+o[1]>6;return `<button class="option ${chosen?'selected':''} ${over?'over-budget':''}" data-option="${j}" aria-pressed="${chosen}"><div class="option-top"><span class="selection-box" aria-hidden="true">${chosen?'✓':'+'}</span><span class="cost">${o[1]} credits</span></div><b>${o[0]}</b><small class="principle-label">${o[3]}</small><p>${o[4]}</p><span class="option-state">${chosen?'Selected · click to remove':over?'Exceeds remaining budget':'Click to select'}</span></button>`;}).join('')}</div><div id="budget-error" class="inline-alert ${budgetFeedback?'visible':''}" role="status">${esc(budgetFeedback)}</div><div class="actionbar"><span class="micro">${picks.length} feature${picks.length===1?'':'s'} selected. You can edit your choices before submitting.</span>${action('Connect your choices →','to-connection')}</div></section></div>`;
 }else if(step===1){h+=`<details class="brief-recap"><summary><span>${brand(BRANDS[m.brand].name)} View the audience & client goal</span><span>${picks.length} features · ${spent}/6 credits</span></summary>${briefPanel(i,true)}</details>${renderConnection(i)}`;
 }else{
  h+=`<section class="pitch-result"><div class="result-heading"><span class="completion-mark">✓</span><div><span class="eyebrow">PITCH SUBMITTED</span><h3>${m.title}</h3></div><strong class="result-xp">+${result.score}<small> / 24 XP</small></strong></div><p class="connection-summary">${esc(state.notes['pitch'+i]||'Previously completed pitch.')}</p><div class="feedback" role="status"><h3>Now consider the trade-offs.</h3><p>A matching explanation is a starting point. What could make each feature less effective?</p>${result.picks.map(j=>{const o=m.options[j];return `<div class="reviewrow"><div class="review-heading"><b>${o[0]}</b><span class="fit-chip">${o[2]}/4 fit</span></div><p>${o[5]}</p><div class="tradeoff"><b>Consider</b> ${o[6]}</div></div>`;}).join('')}<details><summary>Compare with a strong six-credit approach</summary><p>${m.options.slice(0,3).map(o=>o[0]).join(' + ')}. These address the task, motivation and access needs. Other combinations may be defensible with evidence.</p></details><div class="actionrow">${action(i===4?'See your portfolio →':'Next brief →','next-design')}<span class="micro">Feature-fit scores are game feedback, not real business predictions.</span></div></div></section>`;
 }
 $('#main').innerHTML=h;
}
function renderClaims(){
 let h=header(3,'Does the claim hold up?','Choose the response that uses evidence and sound design reasoning.','8 claims · 80 XP');
 if(state.claimIndex>=CLAIMS.length){h+=`<section class="completion"><span class="completion-mark">✓</span><div class="eyebrow">CLAIMS CHECKED</div><h3>Confidence needs evidence.</h3><p>${correctClaims()} of 8 decisions correct · ${correctClaims()*10} XP earned.</p>${action('Next: build your two-site verdict →','goto-verdict')}</section><section class="panel"><h3>Take these ideas into your evaluation</h3>${CLAIMS.map((c,i)=>`<details ${state.claimAnswers[i]!==c.correct?'open':''}><summary>${state.claimAnswers[i]===c.correct?'✓':'↺'} ${c.brand}</summary><p>${esc(c.claim)}</p><div class="design-takeaway"><b>Reasoning</b><span>${esc(c.why)}</span></div></details>`).join('')}</section>`;
 }else{const i=state.claimIndex,c=CLAIMS[i],ans=state.claimAnswers[i];h+=meter('Claim',i,8,'A sound judgement earns 10 XP');h+=`<div class="question-stage"><div class="missioncard"><div class="card-top"><span class="brandpill">${c.brand}</span><span class="scenario-label">Draft website report</span></div><h3>${esc(c.claim)}</h3></div><div class="claimoptions">${state.claimOrder[i].map((j,n)=>`<button data-claim="${j}" class="${ans===j?'selected':''} ${ans!==undefined&&j===c.correct?'correct':''}" ${ans!==undefined?'disabled':''}><kbd>${n+1}</kbd><span>${esc(c.answers[j])}</span>${ans!==undefined&&j===c.correct?'<span class="result-label">✓ Best response</span>':''}</button>`).join('')}</div>`;if(ans!==undefined)h+=`<div class="feedback ${ans===c.correct?'':'bad'}" role="status"><div class="feedback-title"><span class="feedback-icon">${ans===c.correct?'✓':'↺'}</span><h3>${ans===c.correct?'Good judgement · +10 XP':'Check the reasoning'}</h3></div><p>${esc(c.why)}</p><div class="actionrow">${action(i===7?'See round results →':'Next claim →','next-claim')}</div></div>`;else h+='<div class="answer-hint">Choose a response, or use keys <kbd>1</kbd>–<kbd>3</kbd>.</div>';h+='</div>';}
 $('#main').innerHTML=h;
}
const CHECKS=[
 'I have compared specific design features on two websites, linking them to audience and purpose.',
 'I have explained the effects on users and the client’s goals for both sites.',
 'I have considered creativity, accessibility and performance without inventing test results.',
 'I have weighed strengths and limitations, justified judgements and prioritised improvements.',
 'I have labelled assumptions and observations, with sources and dates.',
 'A partner or I have reviewed the reasoning, not just the amount of writing.'
];
const INVESTIGATION_KEYS=['audience','evidence','performance'];
function noteReady(k){return String(state.notes[k]||'').trim().length>=(['compare','analyse','evaluate'].includes(k)?100:40);}
function field(id,label,hint,placeholder='',min=40){const ready=noteReady(id);return `<div class="field"><label for="${id}">${label}</label><p class="fieldhint" id="${id}-hint">${hint}</p><textarea id="${id}" data-note="${id}" aria-describedby="${id}-hint ${id}-count" placeholder="${esc(placeholder)}">${esc(state.notes[id]||'')}</textarea><div id="${id}-count" class="counter ${ready?'ready':''}" data-count="${id}">${ready?'✓ Draft ready for review':`${Math.max(0,min-String(state.notes[id]||'').trim().length)} more characters to start a review`}</div></div>`;}
function investigationReady(){return state.notes.siteA!==state.notes.siteB&&['A','B'].every(s=>INVESTIGATION_KEYS.every(k=>noteReady(k+s)));}
function verdictReady(step){return step===0?investigationReady():step===4?state.finished:noteReady(WRITING[step-1][0]);}
function sitePanel(side){const key='site'+side,b=BRANDS[Number(state.notes[key])];return `<section class="panel site-panel"><div class="site-controls"><div><label for="${key}">Website ${side}</label><select id="${key}" data-site="${key}">${BRANDS.map((b,i)=>`<option value="${i}" ${String(i)===state.notes[key]?'selected':''}>${b.name}</option>`).join('')}</select></div><div class="linkrow"><a class="link-button" href="${b.url}" target="_blank" rel="noopener noreferrer">Open website ↗</a><a href="${SOURCES[b.source].url}" target="_blank" rel="noopener noreferrer">Feature evidence ↗</a></div></div><div class="purpose-note"><b>Purpose to consider</b><span>${b.purpose} Treat client goals as an inference unless sourced.</span></div>${state.notes.siteA===state.notes.siteB?'<p class="inline-alert visible">Choose two different websites for your comparison.</p>':''}${field('audience'+side,'1. Who is this website for?','Define one segment using who, why, where and how. State the site’s purpose and a possible client goal. Label assumptions.','A possible segment is… The purpose is… The client may want…')}${field('evidence'+side,'2. What can you actually see?','Record two design features and their principles. Add the page URL, date and device. If you use the public feature explanation, say so.','On [URL], viewed on [date/device], I observed… This uses…')}${field('performance'+side,'3. How well does it work?','Record a task or loading observation and a keyboard, readability or mobile check. If you cannot test, describe the test needed.','Task and conditions:… Result:… Accessibility:… Test still needed:…')}</section>`;}
function evidenceReference(){return `<details class="evidence-reference"><summary>Keep your website evidence to hand <span>${BRANDS[Number(state.notes.siteA)].name} + ${BRANDS[Number(state.notes.siteB)].name}</span></summary><div class="reference-grid">${['A','B'].map(s=>`<div><h4>${BRANDS[Number(state.notes['site'+s])].name}</h4>${INVESTIGATION_KEYS.map(k=>`<p><b>${{audience:'Audience & purpose',evidence:'Design evidence',performance:'Performance & access'}[k]}</b><span>${esc(state.notes[k+s]||'No notes yet. Return to Investigate to add them.')}</span></p>`).join('')}</div>`).join('')}</div></details>`;}
function completionIssues(){const missing=[];if(state.notes.siteA===state.notes.siteB)missing.push({step:0,label:'Choose two different websites.'});for(const side of ['A','B'])for(const k of INVESTIGATION_KEYS)if(!noteReady(k+side))missing.push({step:0,side,field:k+side,label:`Website ${side}: finish ${k==='audience'?'audience and purpose':k==='evidence'?'design evidence':'performance and access'}.`});WRITING.forEach(([id,title],i)=>{if(!noteReady(id))missing.push({step:i+1,field:id,label:`Finish your ${['comparison','analysis','evaluation'][i]}.`});});if(CHECKS.some((_,i)=>!state.checks[i]))missing.push({step:4,label:'Complete the six review checks below.'});return missing;}
function renderVerdict(){
 const step=state.ui.verdictStep;
 let h=header(4,'Make an evidence-based verdict.','Compare two real websites. Work through one task at a time; your notes stay saved.','P1 → M1 → D1');
 h+=`<div class="verdict-nav" aria-label="Case file steps">${['Investigate','Compare · P1','Analyse · M1','Evaluate · D1','Review & export'].map((n,i)=>`<button data-verdict-step="${i}" class="${i===step?'active':''} ${verdictReady(i)?'done':''}" ${i===step?'aria-current="step"':''}><span>${verdictReady(i)?'✓':i+1}</span>${n}</button>`).join('')}</div>`;
 if(step===0){
  h+=`<div class="task-intro"><div><h3>Collect evidence from both sites.</h3><p>Use the website links, or public feature explanations if access is blocked. No login or purchase is needed.</p></div><span class="count-chip">${['A','B'].reduce((n,s)=>n+INVESTIGATION_KEYS.filter(k=>noteReady(k+s)).length,0)} / 6 entries</span></div><div class="site-tabs" aria-label="Investigate a website">${['A','B'].map(s=>`<button data-site-tab="${s}" class="${state.ui.siteTab===s?'active':''}" aria-pressed="${state.ui.siteTab===s}"><span>Website ${s}</span><b>${BRANDS[Number(state.notes['site'+s])].name}</b><small>${INVESTIGATION_KEYS.filter(k=>noteReady(k+s)).length}/3 entries</small></button>`).join('')}</div>${sitePanel(state.ui.siteTab)}<div class="actionbar"><span class="micro">Observe design choices. Avoid guessing what all users are like.</span>${state.ui.siteTab==='A'?'<button class="quiet" data-site-tab="B">Investigate website B →</button>':''}${action('Next: compare →','next-verdict')}</div>`;
 }else if(step<4){const [id,title,prompt,start]=WRITING[step-1],structures=[['Compare','A similarity','A difference','Audience & purpose'],['Analyse','Design choice','User effect','Client outcome'],['Evaluate','Strength','Limitation','Justified judgement']][step-1];h+=`${evidenceReference()}<section class="panel writing-panel"><div class="section-heading"><div><span class="eyebrow">${title.split(' · ')[0]}</span><h3>${['Explain the similarity and the difference.','Show why the design choice matters.','Weigh the evidence. Reach a judgement.'][step-1]}</h3></div></div><div class="reasoning-route" aria-label="Reasoning structure">${structures.slice(1).map(t=>`<span>${t}</span>`).join('<i aria-hidden="true">→</i>')}</div>${field(id,'Your '+['comparison','analysis','evaluation'][step-1],prompt,start,100)}<details><summary>Show sentence starters</summary><p>${start}</p><p class="micro">Use these to organise your own evidence. They are not a model answer.</p></details></section><div class="actionbar"><button class="quiet" data-verdict-step="${step-1}">← Back</button><span class="micro">Draft checks measure completion, not the quality of your argument.</span>${action(['','','',''][step]||`Next: ${step===1?'analyse':step===2?'evaluate':'review'} →`,'next-verdict')}</div>`;
 }else{
  if(state.finished){h+=`<section class="completion"><span class="completion-mark">✓</span><div class="eyebrow">CASE FILE COMPLETE</div><h3>Your verdict is ready to share.</h3><p>${xp()} / 400 agency XP. Download your case file for your teacher or partner to review.</p><div class="badge-row"><span class="badge">Case file complete</span>${correctSort()>=16?'<span class="badge">Audience decoder</span>':''}${correctClaims()>=6?'<span class="badge">Evidence challenger</span>':''}</div>${action('Download your case file ↓','export')}<p class="micro">${isAllPlayed()?'All four rounds completed.':'You can still finish the earlier game rounds.'} Game XP is not a BTEC grade.</p></section>`;}
  h+=`<section class="panel"><div class="section-heading"><div><span class="eyebrow">FINAL CHECK</span><h3>Review the reasoning, then export.</h3><p>Check both sites against audience needs, purpose and client requirements.</p></div><span class="count-chip">${draftProgress()} / 9 drafts</span></div><label for="agency">Agency or pair name <span class="optional">optional</span></label><input id="agency" data-note="agency" maxlength="80" value="${esc(state.notes.agency||'')}" placeholder="Choose an agency name"><div class="review-map">${['Investigate both sites','Compare · P1','Analyse · M1','Evaluate · D1'].map((n,i)=>`<button data-verdict-step="${i}"><span>${verdictReady(i)?'✓':'○'}</span>${n}<small>${verdictReady(i)?'Review draft':'Continue'}</small></button>`).join('')}</div><ul class="checklist">${CHECKS.map((c,i)=>`<li><label><input type="checkbox" data-check="${i}" ${state.checks[i]?'checked':''}>${c}</label></li>`).join('')}</ul><div id="verdict-error" role="status"></div><div class="actionbar"><button data-action="export" class="quiet">Download current draft ↓</button>${action(state.finished?'Recheck case file':'Complete case file · +100 XP','complete')}</div><details><summary>How this supports Unit 6</summary><p>The investigation, comparison, analysis and evaluation practise learning aim A. Your teacher assesses the depth and validity of your evidence against the assignment brief. Completion checks require six investigation entries of 40 characters, three reasoning entries of 100 characters and your self-review. They do not award a grade.</p></details></section>`;
 }
 h+='<div id="step-notice" class="inline-alert" role="status"></div>';
 $('#main').innerHTML=h;
}
function dialog(title,content){dialogTrigger=document.activeElement;$('#dialog-title').textContent=title;$('#dialog-content').innerHTML=content;$('#info-dialog').showModal();}
function closeDialog(){$('#info-dialog').close();dialogTrigger?.focus?.({preventScroll:true});}
function guide(){dialog('The segmentation field guide',`<div class="guidegrid">${CATEGORIES.map((c,i)=>`<div class="panel" style="background:var(--${['demo','psy','geo','beh'][i]})"><div class="eyebrow">${c.cue}</div><h3>${c.name}</h3><p><b>${c.examples}</b></p><p>${c.detail}</p></div>`).join('')}</div><h3 style="margin-top:1.5rem">A profile can use all four</h3><p>A fictional 19-year-old student (demographic), who values discovering new artists (psychographic), lives in Exeter (geographic), and plays saved playlists daily (behavioural) may benefit from both discovery and a quick library shortcut. Test that inference.</p><h3>Design principles to investigate</h3><p>Navigation and usability; visual hierarchy and whitespace; typography and consistency; accessibility; responsive layout; multimedia and creativity; loading and task performance. Link each choice to a user task and the client’s purpose.</p><h3>Evidence desk</h3><p>Sources checked 10 September 2026. Live interfaces vary by device, region, login and experiments. These sources describe features, not the demographics of every user.</p><ol class="source-list">${SOURCES.map(s=>`<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.name} ↗</a><br><small>${s.note}</small></li>`).join('')}</ol>`);}
function teacher(){dialog('Run Segment Studio in a lesson',`<p><b>Audience:</b> BTEC Level 3 IT, Unit 6 Website Development, learning aim A. Designed for solo or paired play in Chrome, with no installation or student account. Every pair uses one device; scores are local, not a shared leaderboard.</p><div class="tablewrap"><table><thead><tr><th>Time</th><th>Activity</th><th>Teaching focus</th></tr></thead><tbody><tr><td>0–10 min</td><td>Brief and field guide</td><td>Model one profile using four different types of evidence.</td></tr><tr><td>10–25 min</td><td>Decode</td><td>20 clues; explain mistakes, especially motivation versus behaviour.</td></tr><tr><td>25–45 min</td><td>Design</td><td>Five six-credit briefs. Choose features, connect ideas, then review the pitch. Partners alternate decision-maker and challenger. Defend trade-offs aloud.</td></tr><tr><td>45–55 min</td><td>Challenge</td><td>Eight claims. Ask what evidence would change the judgement.</td></tr><tr><td>55–80 min</td><td>The verdict</td><td>Follow the five case-file steps: investigate, compare, analyse, evaluate and review. Extend writing as homework if needed.</td></tr><tr><td>80–90 min</td><td>Peer review and export</td><td>Share one justified decision and one assumption needing evidence.</td></tr></tbody></table></div><h3>Assessment alignment (paraphrased)</h3><ul><li><b>A.P1:</b> compare design principles across two sites and suitability for audience and purpose. The two-site investigation and comparison practise this.</li><li><b>A.M1:</b> analyse how design supports creative, effective, high-performance sites meeting client requirements. The budget pitches and causal analysis practise this.</li><li><b>A.D1:</b> evaluate design against client requirements, creativity and performance. The claims round and balanced final judgement practise this.</li></ul><p>Segmentation is one part of audience suitability. It does not replace coverage of wider design principles or a full assessment response. Use the <a href="${SOURCES[0].url}" target="_blank" rel="noopener noreferrer">Pearson specification</a>, Unit 6 printed pages 57–65, and your centre’s brief.</p><h3>Scoring and facilitation</h3><p>Decode: 5 XP per correct first answer (100). Design: up to 24 per brief (120), from authored feature-fit points; students must match an audience detail, a selected feature, its benefit and the client outcome before pitching. Incorrect connections receive feedback and can be retried. Challenge: 10 per correct first answer (80). Case file: 100 completion XP, never a BTEC grade. The total is 400. All rounds remain accessible for differentiation. Scores cannot be increased by revisiting answered questions.</p><p>Strong default designs are the three two-credit options worth four fit points each. A three-point alternative may be defensible: invite students to challenge the rubric with evidence. The simulator does not estimate real business metrics.</p><h3>Discussion answers to listen for</h3><ul><li>Age, gender or income cannot prove tastes, ability or accessibility needs.</li><li>Geography can inform localisation; it does not prove connection speed.</li><li>A recommendation feature is not proof of the audience’s demographics.</li><li>A clean page is not a measured fast page. Compare the same task, device and connection.</li><li>User control and task success may conflict with time-on-site or sales goals.</li></ul><h3>Access and saving</h3><p>Core game content works without external website access. Use linked public feature explanations if brand sites are blocked, and label conclusions based on secondary evidence. No purchases, accounts or personal details are needed. Text and progress are saved in this browser when available; a shared device’s next user can see them. Export, then use “Start a fresh game” to clear the saved game. No student data is sent by the application to a server.</p><p>Suggested extension: compare a third segment on one website, or run a five-minute usability test of a proposed improvement.</p>`);}
function exportFile(){
 const n=state.notes,lines=['SEGMENT STUDIO — CASE FILE',`Exported: ${new Date().toLocaleString('en-GB')}`,`Agency: ${n.agency||'Not named'}`,`Agency XP: ${xp()}/400 (game score, not a BTEC grade)`,'','ROUND 1 — DECODE',`Correct first answers: ${correctSort()}/20`];
 CLUES.forEach((c,i)=>{if(state.sortAnswers[i]!==undefined)lines.push(`• ${c[0]}: ${c[1]}`,`  Your answer: ${CATEGORIES[state.sortAnswers[i]]?.name||'Unknown'} | Expected: ${CATEGORIES[c[2]].name}`,`  Feedback: ${c[3]}`);});
 lines.push('','ROUND 2 — DESIGN (fictional briefs; authored fit rubric)');MISSIONS.forEach((m,i)=>{const r=state.missionResults[i];lines.push('',BRANDS[m.brand].name+' — '+m.title,'Client goal: '+m.client,'Profile: '+m.facts.join(' / '),r?`Scored choices: ${r.picks.map(j=>m.options[j][0]).join('; ')} (${r.score}/24 XP)`:'Not pitched','Your explanation: '+(n['pitch'+i]||(state.connections[i]?connectionText(i):'Not entered')));if(r)r.picks.forEach(j=>lines.push('Feedback: '+m.options[j][5]+' Trade-off: '+m.options[j][6]));});
 lines.push('','ROUND 3 — CHALLENGE',`Correct first answers: ${correctClaims()}/8`);CLAIMS.forEach((c,i)=>{if(state.claimAnswers[i]!==undefined)lines.push(c.claim,'Your response: '+c.answers[state.claimAnswers[i]],'Feedback: '+c.why);});
 lines.push('','ROUND 4 — WEBSITE INVESTIGATION');['A','B'].forEach(s=>{const b=BRANDS[Number(n['site'+s])];lines.push('',`Website ${s}: ${b.name} — ${b.url}`,'Audience and purpose:',n['audience'+s]||'Not entered','Design evidence:',n['evidence'+s]||'Not entered','Performance and access:',n['performance'+s]||'Not entered');});
 WRITING.forEach(([id,title])=>lines.push('',title,n[id]||'Not entered'));lines.push('','SELF-REVIEW');CHECKS.forEach((c,i)=>lines.push(`[${state.checks[i]?'x':' '}] ${c}`));lines.push('','Completion checks passed: '+(state.finished?'Yes — quality still requires teacher review.':'Not yet.'),'','SOURCE DESK — feature sources checked 10 September 2026');SOURCES.forEach(s=>lines.push(s.name,s.url,s.note));lines.push('','Fictional profiles and proposed redesigns are classroom scenarios, not measured brand audience data. Student-written conclusions require evidence and teacher review.');
 const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='segment-studio-case-file.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Case file exported. Check your Downloads folder.');
}

function invalidateVerdict(){state.finished=false;state.checks={};syncHud();}
function selectFeature(j){
 const i=state.missionIndex,m=MISSIONS[i];if(!m||state.missionResults[i]||!Number.isInteger(j)||!m.options[j])return;
 const p=state.missionPicks[i]||[];
 if(p.includes(j)){
  state.missionPicks[i]=p.filter(n=>n!==j);
  if(state.connections[i]?.feature===j){delete state.connections[i].feature;delete state.connections[i].benefit;state.ui.connectionKind='feature';}
 }else if(p.reduce((a,k)=>a+m.options[k][1],0)+m.options[j][1]<=6)state.missionPicks[i]=[...p,j];
 else{budgetFeedback='Not enough credits. Remove a selected feature to make room.';$('#budget-error').textContent=budgetFeedback;$('#budget-error').classList.add('visible');announce(budgetFeedback);return;}
 budgetFeedback='';connectionFeedback=null;render();announce(`${m.options[j][0]} ${p.includes(j)?'removed':'selected'}. ${6-(state.missionPicks[i]||[]).reduce((a,k)=>a+m.options[k][1],0)} credits left.`);
 if(interaction==='keyboard')$(`[data-option="${j}"]`)?.focus({preventScroll:true});
}
function setDesignStep(step){
 if(!MISSIONS[state.missionIndex]||state.missionResults[state.missionIndex])return;
 if(step===1&&!(state.missionPicks[state.missionIndex]||[]).length){budgetFeedback='Choose at least one feature before building your connection.';render();$('#budget-error')?.scrollIntoView({behavior:'instant',block:'nearest'});return;}
 if(step!==0&&step!==1)return;state.ui.designStep=step;connectionFeedback=null;moveView();
}
function setVerdictStep(step){if(!Number.isInteger(step)||step<0||step>4)return;state.ui.verdictStep=step;moveView();}
function dispatchAction(act){
 switch(act){
  case 'guide':guide();break;
  case 'next-sort':if(state.sortIndex<20&&state.sortAnswers[state.order[state.sortIndex]]!==undefined){state.sortIndex++;moveView();}break;
  case 'goto-design':setRound(1);break;
  case 'to-connection':setDesignStep(1);break;
  case 'submit-design':{
   const i=state.missionIndex,p=state.missionPicks[i]||[];if(!MISSIONS[i]||state.missionResults[i])return;
   const problem=connectionIssue(i);
   if(problem){connectionFeedback=problem;state.ui.connectionKind=problem.kind;state.ui.designStep=1;render();announce(problem.text);$('#design-error')?.scrollIntoView({behavior:'instant',block:'nearest'});if(interaction==='keyboard')$(`[data-connection-kind="${problem.kind}"]`)?.focus({preventScroll:true});return;}
   state.notes['pitch'+i]=connectionText(i);state.missionResults[i]={picks:[...p],score:missionScore(p,MISSIONS[i])};connectionFeedback=null;moveView();announce(`Pitch submitted. ${state.missionResults[i].score} of 24 XP. Read the feature trade-offs.`);break;
  }
  case 'next-design':if(state.missionResults[state.missionIndex]){state.missionIndex++;state.ui.designStep=0;state.ui.connectionKind='audience';connectionFeedback=null;budgetFeedback='';moveView();}break;
  case 'goto-claims':setRound(2);break;
  case 'next-claim':if(state.claimIndex<8&&state.claimAnswers[state.claimIndex]!==undefined){state.claimIndex++;moveView();}break;
  case 'goto-verdict':setRound(3);break;
  case 'next-verdict':{
   const step=state.ui.verdictStep;
   if(step<4&&!verdictReady(step)){
    const message=step===0?'Finish the three entries for each of two different websites before moving on. Use the A and B tabs above.':'Add your own reasoning before moving on. The counter below your draft shows what is still needed.';
    $('#step-notice').textContent=message;$('#step-notice').classList.add('visible');$('#step-notice').scrollIntoView({behavior:'instant',block:'nearest'});announce(message);return;
   }
   setVerdictStep(Math.min(4,step+1));break;
  }
  case 'complete':{
   if(state.ui.verdictStep!==4){setVerdictStep(4);return;}
   const missing=completionIssues();
   if(missing.length){$('#verdict-error').innerHTML=`<div class="inline-alert visible"><b>A few things still need attention</b><ul>${missing.map(m=>`<li><button class="textbutton" data-fix-step="${m.step}" ${m.side?`data-fix-side="${m.side}"`:''} ${m.field?`data-fix-field="${m.field}"`:''}>${m.label}</button></li>`).join('')}</ul></div>`;$('#verdict-error').scrollIntoView({behavior:'instant',block:'nearest'});announce(`${missing.length} items still need attention.`);return;}
   state.finished=true;moveView();announce('Case file complete. 100 completion XP. Download your work for review.');break;
  }
  case 'export':exportFile();break;
  case 'confirm-reset':state=fresh();connectionFeedback=null;budgetFeedback='';save();closeDialog();moveView();toast('Fresh game started. Previous saved work cleared.');break;
  case 'cancel-reset':closeDialog();break;
 }
}
document.addEventListener('pointerdown',()=>{interaction='pointer';document.documentElement.dataset.interaction='pointer';});
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b||b.disabled)return;
 if(e.detail===0){interaction='keyboard';document.documentElement.dataset.interaction='keyboard';}
 const d=b.dataset;
 if(d.round!==undefined){setRound(Number(d.round));return;}
 if(d.cat!==undefined){const id=state.order[state.sortIndex],answer=Number(d.cat);if(state.round===0&&CLUES[id]&&CATEGORIES[answer]&&state.sortAnswers[id]===undefined){state.sortAnswers[id]=answer;render();showFeedback();}return;}
 if(d.claim!==undefined){const i=state.claimIndex,answer=Number(d.claim);if(state.round===2&&CLAIMS[i]?.answers[answer]&&state.claimAnswers[i]===undefined){state.claimAnswers[i]=answer;render();showFeedback();}return;}
 if(d.option!==undefined){selectFeature(Number(d.option));return;}
 if(d.designStep!==undefined){setDesignStep(Number(d.designStep));return;}
 if(d.connectionKind){if(CONNECTION_KINDS.includes(d.connectionKind)){state.ui.connectionKind=d.connectionKind;render();if(interaction==='keyboard')$(`[data-connection-kind="${d.connectionKind}"]`)?.focus({preventScroll:true});}return;}
 if(d.connectionCard!==undefined){placeConnection(d.kind,Number(d.connectionCard),d.kind);return;}
 if(d.clearConnection){if(state.missionResults[state.missionIndex])return;delete state.connections[state.missionIndex]?.[d.clearConnection];state.ui.connectionKind=d.clearConnection;connectionFeedback=null;render();$(`[data-connection-kind="${d.clearConnection}"]`)?.focus({preventScroll:true});announce('Card removed. Choose a replacement.');return;}
 if(d.verdictStep!==undefined){setVerdictStep(Number(d.verdictStep));return;}
 if(d.siteTab){state.ui.siteTab=d.siteTab==='B'?'B':'A';render(true);if(interaction==='keyboard')$(`[data-site-tab="${state.ui.siteTab}"]`)?.focus({preventScroll:true});return;}
 if(d.fixStep!==undefined){if(d.fixSide)state.ui.siteTab=d.fixSide;setVerdictStep(Number(d.fixStep));if(d.fixField)$('#'+d.fixField)?.focus();return;}
 if(d.action)dispatchAction(d.action);
});
document.addEventListener('input',e=>{
 const k=e.target.dataset.note;if(!k)return;state.notes[k]=e.target.value;
 if(k!=='agency')invalidateVerdict();
 const counter=$(`[data-count="${k}"]`);if(counter){const min=['compare','analyse','evaluate'].includes(k)?100:40,ready=noteReady(k);counter.textContent=ready?'✓ Draft ready for review':`${Math.max(0,min-e.target.value.trim().length)} more characters to start a review`;counter.classList.toggle('ready',ready);}
 save();
});
document.addEventListener('change',e=>{
 const d=e.target.dataset;
 if(d.site){const side=d.site==='siteB'?'B':'A',old=String(state.notes[d.site]),next=String(e.target.value);if(!BRANDS[Number(next)]||next===old)return;
  state.siteDrafts[side+old]=Object.fromEntries(INVESTIGATION_KEYS.map(k=>[k,state.notes[k+side]||'']));state.notes[d.site]=next;
  for(const k of INVESTIGATION_KEYS)state.notes[k+side]=state.siteDrafts[side+next]?.[k]||'';
  invalidateVerdict();render();toast('Website changed. Its notes are separate; switch back to restore the previous draft.');
 }
 if(d.check!==undefined){state.checks[d.check]=e.target.checked;if(!e.target.checked)state.finished=false;render();if(interaction==='keyboard')$(`[data-check="${d.check}"]`)?.focus({preventScroll:true});}
});
document.addEventListener('keydown',e=>{
 interaction='keyboard';document.documentElement.dataset.interaction='keyboard';
 if(e.altKey||e.ctrlKey||e.metaKey||e.repeat||$('#info-dialog').open||e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
 const n=Number(e.key)-1;
 if(state.round===0&&n>=0&&n<4&&/^\d$/.test(e.key)){e.preventDefault();$(`[data-cat="${n}"]`)?.click();}
 if(state.round===2&&n>=0&&n<3&&/^\d$/.test(e.key)){e.preventDefault();$(`[data-claim="${state.claimOrder[state.claimIndex]?.[n]}"]`)?.click();}
});
let draggedConnection=null;
function clearDrag(){for(const el of document.querySelectorAll('.drop-ready,.drop-over,.being-dragged'))el.classList.remove('drop-ready','drop-over','being-dragged');draggedConnection=null;}
document.addEventListener('dragstart',e=>{const card=e.target.closest('[data-connection-card]');if(!card||state.missionResults[state.missionIndex])return;draggedConnection={kind:card.dataset.kind,id:Number(card.dataset.connectionCard)};e.dataTransfer.setData('text/plain',JSON.stringify(draggedConnection));e.dataTransfer.effectAllowed='copy';card.classList.add('being-dragged');$(`[data-drop-kind="${draggedConnection.kind}"]`)?.classList.add('drop-ready');announce(`Drag to the ${CONNECTION_LABELS[draggedConnection.kind].toLowerCase()} slot.`);});
document.addEventListener('dragover',e=>{const slot=e.target.closest('[data-drop-kind]');if(slot&&draggedConnection){e.preventDefault();const matches=slot.dataset.dropKind===draggedConnection.kind;e.dataTransfer.dropEffect=matches?'copy':'none';slot.classList.toggle('drop-over',matches);}});
document.addEventListener('dragleave',e=>{const slot=e.target.closest('[data-drop-kind]');if(slot&&!slot.contains(e.relatedTarget))slot.classList.remove('drop-over');});
document.addEventListener('drop',e=>{const slot=e.target.closest('[data-drop-kind]');if(!slot||!draggedConnection)return;e.preventDefault();const card=draggedConnection;clearDrag();placeConnection(card.kind,card.id,slot.dataset.dropKind);});
document.addEventListener('dragend',clearDrag);
$('#guide-button').addEventListener('click',guide);
$('#teacher-button').addEventListener('click',teacher);
$('#close-dialog').addEventListener('click',closeDialog);
$('#export').addEventListener('click',exportFile);
$('#reset').addEventListener('click',()=>dialog('Start a fresh game?',`<p>This clears the answers, writing and XP saved in this browser. Download your case file first if you want to keep it.</p><div class="toolbar"><button data-action="export">Download first ↓</button><button class="primary" data-action="confirm-reset">Clear & restart</button><button data-action="cancel-reset">Keep playing</button></div>`));
render();
if(loadWarning)toast(loadWarning);
