export function parseCSV(text){
  const lines=text.trim().split('\n').slice(1);
  return lines.map(l=>{const [Front,Back,Tags]=l.split(';'); return {Front,Back,Tags};});
}
export function renderFlashcards(root,cards){
  root.innerHTML='<h2>Flashcards</h2>';
  cards.forEach(c=>{const el=document.createElement('article'); el.className='card flash'; el.innerHTML=`<strong>${c.Front}</strong><p class='back' hidden>${c.Back}</p><p class='tag'>${c.Tags}</p>`; el.onclick=()=>{const b=el.querySelector('.back'); b.hidden=!b.hidden}; root.appendChild(el);});
}
