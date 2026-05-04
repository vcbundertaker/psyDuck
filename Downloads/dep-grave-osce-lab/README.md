# dep-grave-osce-lab

MVP educacional local, estático e auditável para estudo e simulação OSCE sobre falhas críticas na desnutrição grave.

> **Aviso ético obrigatório**: Este material é educacional e não substitui protocolo institucional, avaliação médica, supervisão clínica ou diretrizes oficiais atualizadas. Não deve ser usado para diagnóstico, tratamento individual ou decisão clínica real sem equipe habilitada e contexto assistencial adequado.

## Objetivo
- estudo médico;
- simulação OSCE;
- checklist de erro crítico;
- replay de falhas;
- flashcards;
- auditoria operacional;
- case.json;
- integração futura com ASTRO OSCE Command Engine.

## Como abrir
### Opção 1 (offline)
Abra `index.html` diretamente no navegador. Em alguns navegadores, `fetch` local pode ser bloqueado. O app possui fallback embutido para exibir conteúdo mínimo.

### Opção 2 (servidor local)
```bash
npm install
npm start
```
Acesse `http://localhost:5173`.

## Estrutura
- `index.html` interface principal
- `styles/main.css` estilos
- `src/*.js` lógica de UI, engine de score, auditoria, flashcards
- `data/*.json` e `data/flashcards.csv` dados da simulação
- `docs/*.md` documentação do produto educacional

## Comandos
```bash
npm run validate
npm start
```

## Próximos passos
- adicionar exportação de auditoria em arquivo com File System Access API quando disponível;
- conectar `case.json` ao ASTRO OSCE Command Engine;
- adicionar múltiplos casos e versionamento de trilhas OSCE.

## Integração com ASTRO OSCE Command Engine
1. Ler `data/case.json` como contrato principal de caso.
2. Usar `osceStation.options` para avaliação de decisão crítica.
3. Usar `failureChain` e `failures.json` para replay e análise de iatrogenia evitável.
4. Persistir checklist local via `audit.js` e sincronizar depois com engine remota.

> Uso real em assistência deve sempre confirmar diretrizes oficiais atualizadas.
