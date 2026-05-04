import { calculateLethalErrorScore } from './engine.js';
import { loadAudit, updateChecklist, exportAudit } from './audit.js';
import { parseCSV, renderFlashcards } from './flashcards.js';

const NOTICE = 'Este material é educacional e não substitui protocolo institucional, avaliação médica, supervisão clínica ou diretrizes oficiais atualizadas. Não deve ser usado para diagnóstico, tratamento individual ou decisão clínica real sem equipe habilitada e contexto assistencial adequado.';

async function loadData(){
  try {
    const [caseData, failures, checklist, csv] = await Promise.all([
      fetch('./data/case.json').then(r=>r.json()), fetch('./data/failures.json').then(r=>r.json()), fetch('./data/checklist.json').then(r=>r.json()), fetch('./data/flashcards.csv').then(r=>r.text())
    ]);
    return {caseData, failures, checklist, cards: parseCSV(csv)};
  } catch { return null; }
}

function render(data){
  const {caseData, failures, checklist, cards}=data;
  thesis.innerHTML=`<h2>Tese</h2><p>${caseData.thesis}</p>`;
  chain.innerHTML=`<h2>Cadeia de falha</h2><ol>${caseData.failureChain.map(x=>`<li>${x}</li>`).join('')}</ol>`;
  layers.innerHTML=['detection','clinical_reasoning','hospital_management','post_discharge'].map(l=>`<article class='card'><h3>${l}</h3></article>`).join('');
  failuresTable.innerHTML='<tr><th>Camada</th><th>Erro</th><th>Mecanismo</th><th>Consequência</th></tr>'+failures.map(f=>`<tr class='${f.severity==='critical'?'critical':''}'><td>${f.layer}</td><td>${f.error}</td><td>${f.mechanism}</td><td>${f.consequence}</td></tr>`).join('');
  osce.innerHTML=`<h2>OSCE</h2><p>${NOTICE}</p><p>${caseData.osceStation.caseSummary}</p><p><strong>${caseData.osceStation.mainQuestion}</strong></p>${caseData.osceStation.options.map(o=>`<button data-id='${o.id}'>${o.id}) ${o.text}</button>`).join('')}<p id='feedback'></p>`;
  osce.querySelectorAll('button').forEach(btn=>btn.onclick=()=>{const opt=caseData.osceStation.options.find(o=>o.id===btn.dataset.id); feedback.textContent=opt.feedback; feedback.className=opt.correct?'ok':'warn';});

  let state=loadAudit(checklist);
  const drawChecklist=()=>{checklistEl.innerHTML=`<h2>Checklist auditável</h2><p>${NOTICE}</p>`+state.map(i=>`<div class='card'><span>${i.id}. ${i.item}</span><div class='btns'>${['sim','parcial','nao'].map(s=>`<button class='${s}' data-id='${i.id}' data-status='${s}'>${s}</button>`).join('')}</div></div>`).join('')+`<button id='export'>Exportar auditoria</button>`;
    checklistEl.querySelectorAll('button[data-id]').forEach(b=>b.onclick=()=>{state=updateChecklist(state,+b.dataset.id,b.dataset.status); drawChecklist(); drawScore();});
    checklistEl.querySelector('#export').onclick=()=>exportAudit(state);
  }
  const drawScore=()=>{const r=calculateLethalErrorScore(state); score.innerHTML=`<h2>Score educacional de erro letal</h2><p><strong>${r.score}</strong> - ${r.interpretation}</p><small>${r.note}</small><p>${NOTICE}</p>`;};
  drawChecklist(); drawScore();
  replay.innerHTML=`<h2>Replay visual</h2><ol>${caseData.osceStation.replay.map(s=>`<li>${s}</li>`).join('')}</ol>`;
  renderFlashcards(flashcards, cards);
  astro.innerHTML=`<h2>ASTRO visual</h2><div class='card'><p>${caseData.astroVisual.center}</p><ul>${caseData.astroVisual.orbits.map(o=>`<li>${o}</li>`).join('')}</ul><p>${caseData.astroVisual.footer}</p><p>${NOTICE}</p></div>`;
}

const thesis=document.getElementById('thesis'); const chain=document.getElementById('chain'); const layers=document.getElementById('layers'); const failuresTable=document.getElementById('failures-table'); const osce=document.getElementById('osce'); const checklistEl=document.getElementById('checklist'); const score=document.getElementById('score'); const replay=document.getElementById('replay'); const flashcards=document.getElementById('flashcards'); const astro=document.getElementById('astro');

loadData().then(d=>{ if(d) render(d); else document.body.innerHTML=`<main><h1>dep-grave-osce-lab</h1><p>${NOTICE}</p><p>Não foi possível carregar arquivos locais via fetch. Use um servidor local (npm start).</p></main>`;});
