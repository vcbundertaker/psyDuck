# TemplateOS RescueOps Gateway

Scaffold documental inicial para o repositório **templateos-rescueops-gateway**.

## Propósito

Unificar, em uma camada de documentação e governança, os seguintes componentes:

- **Kaspersky Rescue Disk** como ferramenta externa documentada (sem integração executável nesta fase);
- **GitHub** como camada de linhagem e rastreabilidade;
- **psyDuck** como módulo de criptografia/landing;
- **Emergent** como laboratório de prompts/workflows;
- **Translado** como módulo de migração/transformação;
- **TemplateOS** como cockpit operacional.

## Estado atual

Este commit contém **apenas scaffold documental inicial**, sem execução real, sem automações destrutivas e sem dependências externas obrigatórias.

## Estrutura

```text
TemplateOS-RescueOps-Gateway/
├─ README.md
├─ CHANGELOG.md
├─ MANIFEST.json
├─ PROJECT_DNA.md
├─ 00_admin/
├─ 01_rescue/
├─ 02_github_dna/
│  ├─ github-projects.csv
│  └─ dna-matrix.md
├─ 03_modules/
│  ├─ psyDuck/
│  ├─ Emergent/
│  └─ Translado/
├─ 04_governance/
│  └─ allowed-actions.json
├─ 05_ledger/
│  └─ ledger-schema.json
├─ 06_reports/
├─ 07_dashboard/
│  ├─ index.html
│  └─ mock-data.json
└─ 99_archive/
```

## Próximos passos sugeridos

1. Completar metadados dos módulos em `PROJECT_DNA.md`.
2. Evoluir `allowed-actions.json` para regras de execução por ambiente.
3. Ligar dashboard estático a pipelines de geração de relatórios (fase futura).
