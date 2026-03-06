---
applyTo: "**/*.{ts,tsx}"
description: "Regras de TypeScript: tipos, nomenclatura, funções e datas"
---

# Regras TypeScript

- **SEMPRE** use TypeScript para escrever código. **NUNCA** use JavaScript.
- **NUNCA** use `any`.
- **SEMPRE** prefira named exports ao invés de default exports, a menos quando estritamente necessário.
- Use nomes de variáveis descritivos (exemplos: isLoading, hasError).
- Use kebab-case para nomes de pastas e arquivos.
- DRY (Don't Repeat Yourself). Evite duplicidade de código. Quando necessário, crie funções/componentes reutilizáveis.
- **NUNCA** escreva comentários no seu código.
- **NUNCA** rode `pnpm run dev` para verificar se as mudanças estão funcionando.
- **SEMPRE** use a biblioteca `dayjs` para manipulação e formatação de datas.
- **SEMPRE** prefira arrow functions ao invés de funções convencionais.
- **SEMPRE** prefira early returns ao invés de ifs muito aninhados.
- Priorize usar higher-order functions ao invés de loops (map, filter, reduce etc.).
- Ao receber mais de 2 parâmetros, **SEMPRE** receba um objeto.
- **SEMPRE** use `interface` ao invés de `type`, a menos quando estritamente necessário.
- **SEMPRE** use PascalCase para nomear classes e componentes.
- **SEMPRE** use camelCase para nomear variáveis, funções e métodos.
