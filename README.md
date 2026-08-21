# API Escola Padre Durval

API REST desenvolvida em Node.js para gerenciamento escolar, com autenticação de usuários e cadastro de turmas.

## Tecnologias

- [Node.js](https://nodejs.org/) (ESM / `type: module`)
- [Express 5](https://expressjs.com/)
- [Sequelize](https://sequelize.org/) + [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://github.com/auth0/node-jsonwebtoken) para autenticação
- [bcrypt](https://www.npmjs.com/package/bcrypt) para hash de senhas
- [Yup](https://github.com/jquense/yup) para validação de dados
- [Biome](https://biomejs.dev/) para lint/format
- [pnpm](https://pnpm.io/) como gerenciador de pacotes

## Estrutura do projeto

```
src/
├── app.js                  # Configuração do Express
├── server.js                # Ponto de entrada (porta 3001)
├── routes.js                 # Definição das rotas
├── config/
│   ├── auth.js                # Segredo e expiração do JWT
│   └── database.cjs           # Configuração de conexão com o PostgreSQL
├── database/
│   ├── index.js                # Inicialização do Sequelize e dos models
│   └── migrations/             # Migrations do banco de dados
├── middlewares/
│   └── auth.js                 # Middleware de autenticação JWT
└── app/
    ├── controllers/
    │   ├── Usercontroller.js    # Cadastro de usuários
    │   ├── LoginController.js   # Autenticação (login)
    │   └── TurmasController.js  # Cadastro e listagem de turmas
    └── models/
        ├── user.js               # Model de usuário
        └── Turmas.js              # Model de turma
```

## Pré-requisitos

- Node.js 18+
- [pnpm](https://pnpm.io/installation)
- PostgreSQL em execução

## Configuração

1. Clone o repositório e instale as dependências:

   ```bash
   pnpm install
   ```

2. Crie um banco de dados PostgreSQL e ajuste as credenciais em [src/config/database.cjs](src/config/database.cjs) (host, porta, usuário, senha e nome do banco).

3. Ajuste o segredo do JWT em [src/config/auth.js](src/config/auth.js) se necessário.

   > ⚠️ **Atenção:** atualmente as credenciais do banco e o segredo do JWT estão fixos no código-fonte. Antes de publicar o repositório ou usar em produção, mova esses valores para variáveis de ambiente (por exemplo, com `dotenv`) e não faça commit de segredos reais.

4. Rode as migrations para criar as tabelas:

   ```bash
   npx sequelize db:migrate
   ```

## Executando o projeto

```bash
pnpm dev
```

O servidor sobe em `http://localhost:3001` com reload automático (`node --watch`).

## Rotas da API

| Método | Rota      | Autenticação | Descrição                        |
| ------ | --------- | ------------- | --------------------------------- |
| POST   | `/create` | Não           | Cria um novo usuário              |
| POST   | `/login`  | Não           | Autentica o usuário e retorna um token JWT |
| POST   | `/turmas` | Sim           | Cria uma nova turma               |
| GET    | `/turmas` | Sim           | Lista todas as turmas             |

Rotas autenticadas exigem o header:

```
Authorization: Bearer <token>
```

### POST /create

Cria um usuário.

**Body:**

```json
{
  "name": "Nome do usuário",
  "email": "usuario@email.com",
  "password": "senha123",
  "admin": false
}
```

- `name`, `email` e `password` são obrigatórios.
- `password` deve ter no mínimo 6 caracteres.
- `admin` é opcional (booleano).

### POST /login

Autentica um usuário e retorna um token JWT válido por 1 dia.

**Body:**

```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta:**

```json
{
  "message": "Login realizado com sucesso!",
  "id": "uuid-do-usuario",
  "name": "Nome do usuário",
  "email": "usuario@email.com",
  "token": "jwt-token"
}
```

### POST /turmas

Cria uma turma. Requer autenticação.

**Body:**

```json
{
  "name": "1º Ano A",
  "homeroom_teacher": "Nome do professor",
  "shift": "matutino",
  "school_year": 2026,
  "max_students": 30
}
```

- `shift` aceita os valores: `matutino`, `vespertino` ou `noturno`.
- `max_students` é opcional.

### GET /turmas

Lista todas as turmas cadastradas. Requer autenticação.

## Modelo de dados

**users**

| Campo         | Tipo    |
| ------------- | ------- |
| id            | UUID (PK) |
| name          | STRING  |
| email         | STRING (único) |
| password_hash | STRING  |
| admin         | BOOLEAN |
| created_at    | DATE    |
| updated_at    | DATE    |

**classes** (turmas)

| Campo             | Tipo    |
| ----------------- | ------- |
| id                | INTEGER (PK, auto-incremento) |
| name              | STRING  |
| homeroom_teacher  | STRING  |
| shift             | ENUM (`matutino`, `vespertino`, `noturno`) |
| school_year       | INTEGER |
| max_students      | INTEGER (opcional) |
| created_at        | DATE    |
| updated_at        | DATE    |

## Scripts disponíveis

| Comando     | Descrição                                      |
| ----------- | ----------------------------------------------- |
| `pnpm dev`  | Inicia o servidor em modo desenvolvimento com reload automático |

## Licença

ISC
