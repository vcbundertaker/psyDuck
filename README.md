# psyDuck

## Tibia Chess 2D (Canvas Isométrico)

Este repositório contém um jogo de xadrez 2D em estilo Tibia/isométrico, executado diretamente no navegador via `index.html` (offline-first, sem build).

### Regras e comportamento
- Movimentos legais por peça com validação de rei em xeque.
- Regras especiais: roque, en passant e promoção automática para rainha.
- Estado terminal explícito da partida: `checkmate` e `stalemate`.
- Ao terminar a partida:
  - seleção e highlights são limpos;
  - cliques no tabuleiro são bloqueados;
  - o status final permanece consistente.
- Undo preserva o estado terminal corretamente (`snapshot`/`restore` incluem `gameOver`).

### Controles
- **Clique** para selecionar peça e mover para casas destacadas.
- **Desfazer**: volta um lance.
- **Reiniciar**: restaura posição inicial.
- **Virar**: inverte a visualização do tabuleiro.

### Executar localmente
```bash
python3 -m http.server 4173
# abrir: http://127.0.0.1:4173/
```
