# Saucedemo UI Automation — Cypress

Automação de testes E2E com [Cypress](https://www.cypress.io/) + TypeScript para o site [https://www.saucedemo.com/](https://www.saucedemo.com/).

<img width="1251" height="477" alt="image" src="https://github.com/user-attachments/assets/0af1bbc0-ff47-4e6b-ac6b-df8d6084bdb2" />

<img width="1214" height="377" alt="image" src="https://github.com/user-attachments/assets/75521258-947a-4d5a-8e68-2bdf16670c87" />

<img width="1885" height="892" alt="image" src="https://github.com/user-attachments/assets/8f346f37-aa85-4aa3-9d4d-26cf8355af63" />

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Java 8+](https://adoptium.net/) (necessário para o Allure CLI)
- npm (incluído com o Node.js)

---

## Instalação

### 1. Instalar dependências do projeto

```bash
npm install
```

### 2. Instalar o binário do Cypress

```bash
npx cypress install
```

> O download é ~400MB. Se travar, desative o antivírus temporariamente e tente novamente.

### 3. Instalar o Allure CLI (global)

```bash
npm install -g allure-commandline
```

> Requer Java instalado na máquina. Verifique com `java -version`.

---

## Estrutura do projeto

```
├── cypress/
│   ├── e2e/
│   │   ├── login/          # 7 testes de autenticação
│   │   ├── home/           # 9 testes da tela principal
│   │   ├── cards/          # 7 testes de produtos
│   │   └── cart/           # 5 testes de carrinho e checkout
│   ├── fixtures/
│   │   ├── users.json      # Credenciais dos usuários de teste
│   │   └── checkout.json   # Dados do formulário de checkout
│   ├── pages/              # Page Objects
│   │   ├── LoginPage.ts
│   │   ├── HomePage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   └── ProductPage.ts
│   └── support/
│       ├── commands.ts     # Custom command cy.login()
│       └── e2e.ts
├── cypress.config.ts
├── package.json
└── tsconfig.json
```

---

## Rodando os testes

### Todos os testes em sequência (headless)

```bash
npm test
```

### Todos os testes em paralelo — 4 workers (headless)

```bash
npm run test:parallel
```

> Roda os specs simultaneamente em 4 processos independentes, reduzindo o tempo total de execução.

### Com navegador visível (headed)

```bash
npm run test:headed
```

### Com interface visual do Cypress

```bash
npm run test:open
```

> Na interface, selecione **E2E Testing** → **Chromium**. Use o botão **"Run all specs"** para executar todas as suites de uma vez.

### Rodar uma suite específica

```bash
npx cypress run --spec "cypress/e2e/login/login.cy.ts"
npx cypress run --spec "cypress/e2e/home/home.cy.ts"
npx cypress run --spec "cypress/e2e/cards/cards.cy.ts"
npx cypress run --spec "cypress/e2e/cart/cart.cy.ts"
```

---

### Rodar todas as suites

```bash
npx cypress run
```



## Relatórios

### Allure Report

Os resultados são salvos em `allure-results/` a cada execução.

**Gerar e abrir o relatório:**

```bash
allure generate allure-results -o allure-report --clean
allure open allure-report
```

> O relatório abre automaticamente no navegador.

### Screenshots

Capturas de tela em caso de falha são salvas automaticamente em `cypress/screenshots/`.

---

## Custom Command

O comando `cy.login()` está disponível em todos os specs e encapsula o fluxo de login:

```typescript
cy.login();                          // standard_user / secret_sauce
cy.login('outro_usuario', 'senha'); // credenciais customizadas
```

---

## Dados de teste

Centralizados em `cypress/fixtures/`:

- `users.json` — `validUser`, `lockedUser`, `wrongCredentials`
- `checkout.json` — `validInfo` (firstName, lastName, postalCode)

---

> `allure-results/`, `allure-report/`, `cypress/screenshots/` e `cypress/videos/` estão no `.gitignore` e não são versionados.
