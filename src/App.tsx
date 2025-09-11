import React, { useState } from 'react';
import PriorityTableSVG, { PriorityItem } from './components/PriorityTableSVG';

type Item = PriorityItem;

export default function App() {
  const [tab, setTab] = useState<'plano' | 'outro'>('plano');
  const prioridade: Item[] = [
    { item: 'Exemplo 1', impacto: 'Alto', urgencia: 'Alta' },
    { item: 'Exemplo 2', impacto: 'Médio', urgencia: 'Baixa' }
  ];

  return (
    <div>
      <nav>
        <button onClick={() => setTab('plano')}>Plano</button>
        <button onClick={() => setTab('outro')}>Outro</button>
      </nav>
      {tab === 'plano' && (
        <section>
          <h2>Plano – prioridades</h2>
          <PriorityTableSVG items={prioridade} />
        </section>
      )}
      {tab === 'outro' && (
        <section>
          <h2>Outra aba</h2>
          <p>Conteúdo de exemplo.</p>
        </section>
      )}
    </div>
  );
}
