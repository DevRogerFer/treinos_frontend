---
applyTo: "**/*.tsx"
description: "Regras de React/Next.js: componentes, formulários, estilização, autenticação"
---

## Componentes

- Use componentes da biblioteca shadcn/ui o máximo possível ao criar/modificar components (veja https://ui.shadcn.com/ para a lista de componentes disponíveis).
- Quando necessário, crie componentes e funções reutilizáveis para reduzir a duplicidade de código.
- **NUNCA** crie mais de um componente no mesmo arquivo. Cada componente deve ter seu próprio arquivo.
- Antes de criar um novo componente, **SEMPRE** use Context7 para verificar se já existe um componente do shadcn/ui que possa ser utilizado. Caso exista, instale-o.
- **SEMPRE** use o componente `Button` do shadcn/ui (`@/components/ui/button`) para botões. **NUNCA** use `<button>` nativo diretamente.

## Formulários

- SEMPRE use Zod para validação de formulários.
- Sempre use React Hook Form para criação e validação de formulários. SEMPRE use o componente @components/ui/form.tsx para criar formulários.

Exemplo de formulário:

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function ProfileForm() {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## Estilização

- **NUNCA** use cores hard-coded do Tailwind (como `text-white`, `text-white/70`, `bg-black`, `bg-white`, `text-black`, `border-[#f1f1f1]`, `bg-[#2b54ff]`, `bg-[oklch(...)]` etc.). **SEMPRE** use as cores do tema definidas em @app/globals.css (ex: `text-background`, `text-background/70`, `bg-foreground`, `text-foreground`, `bg-primary`, `text-primary-foreground`, `border-border` etc.). Caso a cor necessária não exista no tema, crie uma nova variável CSS em @app/globals.css seguindo o padrão existente.
- Antes de criar uma nova variável de cor, **SEMPRE** busque na documentação do shadcn/ui sobre theming e veja se realmente é necessário.
- **SEMPRE** veja os componentes que podem ser reutilizados para construção de uma página em @components/ui/page.tsx.

## Autenticação

- **NUNCA** use middleware para verificação de autenticação. **SEMPRE** faça a verificação de sessão na própria página usando `authClient.useSession()`.
- Páginas protegidas devem redirecionar para `/auth` caso o usuário não esteja logado.
- A página de login (`/auth`) deve redirecionar para `/` caso o usuário já esteja logado.

## Imagens

- **SEMPRE** use o componente `Image` do Next para renderizar imagens.
