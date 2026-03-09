# GeoQuiz

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

Sistema de Quiz Geográfico completo — perguntas sobre países e continentes, sistema de XP, ranking global e interface responsiva. Toda a aplicação sobe com um único comando Docker.

---

## Rodando o projeto

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado e rodando

### Subir tudo (primeira vez)

```bash
git clone https://github.com/hooney-plus/quizzes.git
cd quizzes
docker compose up --build -d
docker compose exec backend npx ts-node prisma/seed.ts
```

Acesse **http://localhost:3000**

### Subir sem rebuild (dia a dia)

```bash
docker compose up -d
```

---

## Comandos do terminal

### Containers

```bash
# Ver status dos 3 containers
docker compose ps

# Ver logs do backend em tempo real
docker compose logs -f backend

# Ver logs do frontend em tempo real
docker compose logs -f frontend

# Parar todos os containers
docker compose down

# Parar e apagar o banco de dados (reset total)
docker compose down -v

# Rebuildar após mudanças no código
docker compose up --build -d
```

### Banco de dados

```bash
# Inserir/reinserir as perguntas
docker compose exec backend npx ts-node prisma/seed.ts

# Abrir o banco diretamente (psql)
docker compose exec postgres psql -U quiz_user -d quiz_db

# Ver tabelas
docker compose exec postgres psql -U quiz_user -d quiz_db -c "\dt"
```

### Backend (dentro do container)

```bash
# Acessar o shell do container backend
docker compose exec backend sh

# Rodar prisma db push manualmente
docker compose exec backend npx prisma db push

# Ver schema do banco aplicado
docker compose exec backend npx prisma studio
```

---

## Arquitetura

```
┌─────────────────────────────────────────────────┐
│                  DOCKER COMPOSE                  │
│                                                 │
│  ┌────────────┐   ┌────────────┐   ┌──────────┐ │
│  │  Frontend  │──▶│  Backend   │──▶│  Banco   │ │
│  │ React/Vite │   │  NestJS    │   │ Postgres │ │
│  │  :3000     │   │  :4000     │   │  :5432   │ │
│  └────────────┘   └────────────┘   └──────────┘ │
└─────────────────────────────────────────────────┘
```

O **usuário** acessa o frontend → que chama o **backend** via REST → que lê e escreve no **banco de dados**.

### Clean Architecture — 3 camadas

```
src/
├── domain/           # Camada 1 — Regras puras, zero dependências externas
│   ├── entities/     # User (lógica de XP), Question (verificar resposta)
│   └── repositories/ # Contratos abstratos (interfaces)
│
├── application/      # Camada 2 — Casos de uso (orquestração)
│   └── use-cases/    # CreatePlayer, GetQuestions, AnswerQuestion, GetLeaderboard
│
└── infrastructure/   # Camada 3 — Detalhes técnicos (banco, HTTP, módulos)
    ├── database/     # Implementações Prisma dos repositórios
    ├── controllers/  # Rotas HTTP
    └── modules/      # Injeção de dependência NestJS
```

> Se amanhã a regra de XP mudar de +50 para +100, basta alterar **uma linha** em `user.entity.ts` — sem tocar em banco, controller ou frontend.

---

## Estrutura de pastas

```
quizzes-tech-test/
│
├── docker-compose.yml              ← Orquestra os 3 containers
├── README.md
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma           ← Modelos do banco (User, Question, Answer)
│   │   └── seed.ts                 ← 33 perguntas reais de geografia
│   ├── src/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── user.entity.ts       ← Lógica de XP (+50 / -15)
│   │   │   │   └── question.entity.ts   ← Verificação de resposta
│   │   │   └── repositories/
│   │   │       ├── user.repository.ts
│   │   │       └── question.repository.ts
│   │   ├── application/
│   │   │   └── use-cases/
│   │   │       ├── create-player.use-case.ts
│   │   │       ├── get-questions.use-case.ts
│   │   │       ├── answer-question.use-case.ts
│   │   │       └── get-leaderboard.use-case.ts
│   │   └── infrastructure/
│   │       ├── database/
│   │       │   ├── prisma.service.ts
│   │       │   ├── user.prisma.repository.ts
│   │       │   └── question.prisma.repository.ts
│   │       ├── controllers/
│   │       │   ├── quiz.controller.ts      ← GET /api/quiz/questions, POST /api/quiz/answer
│   │       │   └── player.controller.ts    ← POST /api/players, GET /api/players/leaderboard
│   │       └── modules/
│   │           ├── prisma.module.ts
│   │           ├── quiz.module.ts
│   │           └── player.module.ts
│   ├── Dockerfile
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── types/index.ts          ← Tipagens TypeScript
    │   ├── services/api.ts         ← Comunicação com o backend (axios)
    │   ├── hooks/useQuiz.ts        ← State machine do quiz
    │   ├── components/
    │   │   ├── LoginScreen.tsx     ← Entrada com apelido
    │   │   ├── QuizScreen.tsx      ← Tela principal do quiz
    │   │   ├── QuestionCard.tsx    ← Pergunta + 4 opções de resposta
    │   │   ├── FeedbackOverlay.tsx ← Popup de acerto/erro com XP
    │   │   ├── XpBar.tsx           ← Barra de XP + rank em tempo real
    │   │   ├── FinishedScreen.tsx  ← Resultado final com contagem regressiva
    │   │   └── Leaderboard.tsx     ← Ranking global
    │   ├── App.tsx                 ← Controle de navegação entre telas
    │   └── index.css               ← Design system (variáveis CSS, classes)
    ├── vite.config.ts
    ├── Dockerfile
    └── package.json
```

---

## API REST

| Método | Rota | Body | Retorno |
|--------|------|------|---------|
| `POST` | `/api/players` | `{ nickname }` | `{ id, nickname, xp: 0 }` |
| `GET`  | `/api/quiz/questions?count=10` | — | Array de 10 perguntas aleatórias |
| `POST` | `/api/quiz/answer` | `{ userId, questionId, answer }` | `{ isCorrect, xpChange, newXp, correctAnswer }` |
| `GET`  | `/api/players/leaderboard` | — | Top 10 jogadores por XP |

### Exemplos

```bash
# Criar jogador
curl -X POST http://localhost:4000/api/players \
  -H "Content-Type: application/json" \
  -d '{"nickname": "Luiz"}'

# Buscar perguntas
curl http://localhost:4000/api/players/leaderboard
```

---

## Banco de dados

### Modelos (schema.prisma)

```prisma
model User {
  id        String   @id @default(uuid())
  nickname  String   @unique
  xp        Int      @default(0)      # Pode ser negativo
  answers   Answer[]
}

model Question {
  id            String   @id @default(uuid())
  text          String                         # "Qual a capital do Brasil?"
  options       String[]                       # ["SP", "RJ", "Brasília", "Salvador"]
  correctAnswer String                         # "Brasília"
  category      String                         # "capitals" | "continents" | "geography"
  difficulty    String                         # "easy" | "medium" | "hard"
  answers       Answer[]
}

model Answer {
  id         String   @id @default(uuid())
  userId     String
  questionId String
  answer     String
  isCorrect  Boolean
  xpChange   Int                              # +50 ou -15
}
```

---

## Sistema de XP

| Evento | XP |
|--------|----|
| Resposta correta | **+50 XP** |
| Resposta errada | **−15 XP** |
| Saldo negativo | Permitido |

### Ranks

| Rank | XP necessário |
|------|--------------|
| Iniciante | Qualquer valor |
| Intermediário | 50+ XP |
| Avançado | 200+ XP |
| Expert | 500+ XP |

---

## Fluxo do usuário

```
[Login]
  └─ digita apelido → POST /api/players
       │
       ▼
[Quiz — 10 perguntas]
  └─ carrega → GET /api/quiz/questions
       │
       ├─ [QuestionCard] clica resposta → POST /api/quiz/answer
       │       │
       │       ▼
       │  [FeedbackOverlay] verde +50XP / vermelho -15XP
       │       │ (2s ou clique) → próxima pergunta
       │       ▼
       │  [XpBar] atualiza rank em tempo real
       │
       └─ após 10 perguntas
              │
              ▼
       [Resultado final] — contagem regressiva 8s → volta ao início
              │
       [Leaderboard] — ranking global por XP
```

---

## Stack

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Frontend | React + TypeScript | 18 / 5 |
| Build | Vite | 5 |
| Backend | NestJS + TypeScript | 10 / 5 |
| ORM | Prisma | 5 |
| Banco | PostgreSQL | 16 |
| Infra | Docker + Docker Compose | — |
| Arquitetura | Clean Architecture | — |

---

## Infraestrutura Docker

```yaml
services:
  postgres:   # Banco de dados — aguarda healthcheck antes de liberar o backend
  backend:    # API NestJS — roda prisma db push + node dist/main na inicialização
  frontend:   # React compilado — servido via `serve` na porta 3000
```

O `depends_on` com `condition: service_healthy` garante que o backend só sobe **depois** que o banco estiver pronto para receber conexões.
