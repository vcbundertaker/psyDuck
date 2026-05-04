const KEY='dep-grave-audit';
export function loadAudit(defaultState){
  const raw=localStorage.getItem(KEY);
  return raw?JSON.parse(raw):defaultState;
}
export function saveAudit(state){localStorage.setItem(KEY, JSON.stringify(state));}
export function updateChecklist(state,id,status){
  const next=state.map(i=>i.id===id?{...i,status}:i); saveAudit(next); return next;
}
export function exportAudit(state){
  const payload={createdAt:new Date().toISOString(),state};
  console.log('AUDITORIA',payload);
  const blob = new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='auditoria-dep-grave.json'; a.click();
}
