# Bootcamp Treinos Frontend

Aplicação web mobile-first para gerenciamento de treinos, construída com **Next.js 15** (App Router), **React 19**, **TypeScript** e **Tailwind CSS**. Integra-se com a API de treinos e oferece um assistente de IA para criação de planos personalizados.

## Tecnologias

| Tecnologia | Versão | Descrição |
|---|---|---|
| **Next.js** | 16.1 | Framework React com App Router e SSR |
| **React** | 19.2 | Biblioteca de UI |
| **TypeScript** | 5.x | Tipagem estática |
| **Tailwind CSS** | 4.x | Estilização utility-first |
| **shadcn/ui** | 4.x | Componentes UI acessíveis (estilo New York) |
| **Better-Auth** | 1.4 | Autenticação (Google OAuth) |
| **Orval** | 8.1 | Geração de client API a partir do OpenAPI |
| **AI SDK** | 6.0 | Chat com IA via streaming |
| **Streamdown** | 2.2 | Renderização de markdown em streaming |
| **Day.js** | 1.11 | Manipulação de datas |
| **nuqs** | 2.8 | Gerenciamento de estado via query strings |
| **Lucide React** | 0.577 | Ícones |
| **Radix UI** | 1.4 | Primitivos de acessibilidade |
| **pnpm** | — | Gerenciador de pacotes |

## Pré-requisitos

- [Node.js 20+](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [API de treinos](../bootcamp_treinos_api) rodando localmente

## Configuração

### 1. Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:8081
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 2. Dependências

```bash
pnpm install
```

### 3. Gerar client da API

```bash
npx orval
```

### 4. Iniciar o servidor

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Arquitetura

O projeto utiliza o **App Router** do Next.js com Server Components por padrão e Client Components quando necessário.

```
app/
├── layout.tsx                    # Layout raiz (fontes, tema dark, ChatBot)
├── page.tsx                      # Home (treino do dia, streak, consistência)
├── globals.css                   # Configuração Tailwind + tema
├── _components/                  # Componentes globais (ChatBot, mensagens)
├── _lib/                         # Utilitários (auth, fetch, API gerada)
│   └── api/fetch-generated/      # Client API gerado pelo Orval
├── ai/
│   └── route.ts                  # Proxy para API de IA (Route Handler)
├── auth/
│   └── page.tsx                  # Login com Google
├── onboarding/
│   └── page.tsx                  # Onboarding do usuário
├── profile/
│   └── page.tsx                  # Perfil com dados físicos
├── stats/
│   └── page.tsx                  # Estatísticas e heatmap de consistência
└── workout-plans/
    └── [planId]/
        ├── page.tsx              # Detalhes do plano de treino
        └── days/[dayId]/
            ├── page.tsx          # Dia de treino com exercícios
            ├── _actions/         # Server Actions (iniciar/concluir sessão)
            └── _components/      # Componentes do dia de treino

components/
├── bottom-nav.tsx                # Navegação inferior (mobile)
├── consistency-tracker.tsx       # Tracker de consistência semanal
├── exercise-card.tsx             # Card de exercício
├── workout-day-card.tsx          # Card de dia de treino
├── icons/                        # Ícones customizados
└── ui/                           # Componentes shadcn/ui
```

## Páginas

### Autenticação (`/auth`)

Login social com Google via Better-Auth. Redireciona automaticamente se já autenticado.

### Home (`/`)

- Saudação personalizada com banner
- Treino do dia com link direto
- Tracker de consistência semanal
- Streak de treinos consecutivos

### Onboarding (`/onboarding`)

Fluxo guiado com chatbot de IA para configurar:
- Dados físicos do usuário (peso, altura, idade, % gordura)
- Primeiro plano de treino personalizado

### Plano de Treino (`/workout-plans/[planId]`)

- Visualização dos 7 dias da semana
- Dias de treino e dias de descanso
- Imagem de capa e badge do dia

### Dia de Treino (`/workout-plans/[planId]/days/[dayId]`)

- Lista de exercícios ordenados
- Séries, repetições e tempo de descanso
- Botão para iniciar/concluir sessão de treino
- Histórico de sessões

### Perfil (`/profile`)

- Avatar e nome do usuário
- Dados físicos (peso, altura, % gordura, idade)
- Nome do plano ativo
- Botão de logout

### Estatísticas (`/stats`)

- Banner de streak
- Heatmap de consistência (últimos 2 meses)
- Treinos concluídos e taxa de conclusão
- Tempo total de treino

## Assistente de IA

Um chatbot flutuante disponível em todas as telas via botão na barra de navegação:

- Chat em tempo real com streaming (SSE)
- Renderização de markdown com animação
- Sugestões pré-definidas para iniciar conversa
- Pode criar planos de treino e atualizar dados do usuário
- Integração com onboarding para novos usuários

## Integração com API

O client da API é gerado automaticamente pelo **Orval** a partir da especificação OpenAPI:

```bash
npx orval
```

- Gera tipos TypeScript e funções fetch em `app/_lib/api/fetch-generated/`
- Utiliza um `customFetch` que injeta cookies de autenticação automaticamente
- Suporta Server Components com `cookies()` do Next.js

## Scripts

| Comando | Descrição |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm start` | Servidor de produção |
| `pnpm lint` | Lint com ESLint |
| `npx orval` | Gerar client e tipos da API |

## Design

- **Mobile-first** — Otimizado para telas de celular
- **Tema dark** — Ativado por padrão
- **Fontes** — Geist Sans (texto), Inter Tight (headings), Anton (logo)
- **shadcn/ui** — Estilo New York com Tailwind CSS v4
- **Navegação inferior** — Padrão mobile com 5 itens (Home, Calendário, IA, Stats, Perfil)
