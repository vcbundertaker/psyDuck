export function calculateLethalErrorScore(checklistState){
  const score = checklistState.filter(i=>i.status==='nao').length;
  let interpretation='fluxo seguro';
  if(score>=1 && score<=2) interpretation='risco moderado de falha';
  else if(score>=3 && score<=4) interpretation='alto risco de dano';
  else if(score>=5) interpretation='falha sistêmica crítica';
  return {score, interpretation, note:'Score educacional e não clínico.'};
}
