# meu-treino-pro

O **Meu Treino Pro** é um aplicativo mobile-first projetado para entusiastas de musculação que desejam organizar sua rotina de treinos semanal de forma simples, elegante e eficiente.

## Funcionalidades

- **Organização Semanal**: Treinos separados por dias da semana (Segunda a Domingo).
- **Biblioteca Visual**: Veja a execução correta de cada exercício através de GIFs/imagens animadas.
- **Personalização de Volume**: Configure séries e repetições (ou tempo) para cada exercício individualmente.
- **Gestão de Ordem**: Reordene seus exercícios facilmente utilizando os botões de subir (▲) e descer (▼).
- **Edição Rápida**: Altere séries, repetições e notas a qualquer momento.
- **Remoção de Exercícios**: Remova exercícios que não fazem mais parte da sua rotina.
- **Dicas Inteligentes**: Observação automática de aquecimento inserida no primeiro exercício adicionado em cada dia.
- **Modo Dark**: Interface adaptável com suporte a tema Claro e Escuro.
- **Persistência Cloud**: Sincronização em tempo real com o Supabase para que você nunca perca seus dados.

## Tecnologias

- **React**: Biblioteca principal para construção da interface.
- **Tailwind CSS**: Estilização moderna e responsiva.
- **Supabase**: Backend-as-a-Service para autenticação e banco de dados.
- **Google AI Studio**: Suporte no desenvolvimento e lógica da aplicação.
- **Motion (React)**: Animações suaves e transições de interface.
- **Phosphor Icons**: Conjunto de ícones minimalistas e consistentes.

## Como Rodar o Projeto

Siga os passos abaixo para executar a aplicação em sua máquina local:

### Pré-requisitos
- Node.js instalado (v18 ou superior)
- NPM ou Yarn

### Instalação

1. Clone o repositório ou baixe os arquivos:
```bash
git clone <url-do-repositorio>
cd meu-treino-pro

Instale as dependências:
code
Bash
npm install
Configure as variáveis de ambiente (veja a seção abaixo).

Inicie o servidor de desenvolvimento:
code
Bash
npm run dev
A aplicação estará disponível em http://localhost:3000.

Para o funcionamento completo da integração com o banco de dados, crie um arquivo .env na raiz do projeto com as seguintes chaves do seu projeto no Supabase:
code
Env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase

Interface Principal (Dia da Semana)	Biblioteca de Exercícios	Modo Escuro
![alt text](#)
![alt text](#)
![alt text](#)

Desenvolvido para quem não pula o treino de perna.

