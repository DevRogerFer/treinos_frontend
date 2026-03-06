# Project Guidelines

## Visão Geral

Frontend de treinos construído com Next.js 15 (App Router), TypeScript, React 19, Tailwind CSS e shadcn/ui. Roda com pnpm.

## Tecnologias e Ferramentas

- **pnpm** — Gerenciador de pacotes
- **Next.js 15** (App Router) — Framework React
- **TypeScript** — Linguagem principal
- **Tailwind CSS** — Estilização
- **shadcn/ui** — Biblioteca de componentes
- **React Hook Form** — Formulários
- **Zod** — Validações
- **BetterAuth** — Autenticação
- **Orval** — Geração de funções de API
- **TanStack Query** — Data fetching client-side
- **dayjs** — Manipulação de datas

## Comandos

- `pnpm dev` — Servidor de desenvolvimento
- `pnpm build` — Build de produção
- `pnpm lint` — Lint com ESLint
- `npx orval` — Gerar funções e tipos da API

## Arquitetura

- **App Router** — Páginas em `app/`, layouts em `app/layout.tsx`
- **Componentes UI** — shadcn/ui em `components/ui/`
- **API Client** — Funções geradas pelo Orval em `lib/api/generated/`
- **Autenticação** — BetterAuth via `authClient`

## Convenções

- **TypeScript strict** — Sem `any`, sem JavaScript
- **Named exports** — Preferir sobre default exports
- **kebab-case** para nomes de arquivos e pastas
- **Conventional Commits** para mensagens de commit
