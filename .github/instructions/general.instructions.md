---
applyTo: "**"
description: "Regras gerais do projeto: estilo de código, boas práticas e convenções"
---

# Regras Gerais

- Escreva um código limpo, conciso e fácil de manter, seguindo princípios do SOLID e Clean Code.
- DRY (Don't Repeat Yourself). Evite duplicidade de código. Quando necessário, crie funções/componentes reutilizáveis.
- **NUNCA** escreva comentários no seu código.
- **NUNCA** rode `pnpm run dev` para verificar se as mudanças estão funcionando.
- **SEMPRE** use [Conventional Commits](https://www.conventionalcommits.org/) para mensagens de commit. Exemplo: `feat: add login page`, `fix: session redirect`, `docs: update instructions`.
- **NUNCA** faça commit sem a permissão explícita do usuário.
- **SEMPRE** inclua os arquivos de prompt `.md` da pasta `tasks/` no commit quando a implementação for baseada em uma task.

## MCPs

- **SEMPRE** use o MCP do Context7 para fazer buscas em documentações e sites.
- **SEMPRE** use o Serena MCP para semantic code retrieval e editing tools.