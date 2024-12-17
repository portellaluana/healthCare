## Introdução

Este projeto é uma solução front-end para um consultório médico, com foco em simplicidade, usabilidade e eficiência. Desenvolvido com **React**, **Typescript**, **HTML**, **CSS**, **Bootstrap** e **json-server**, o projeto foi pensado para oferecer uma experiência gerencial completa, componentização reutilizável e flexibilidade para futuras evoluções.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
healthCare/
├── public/
├── src/
│   ├── components/         # Componentes reutilizáveis (Header, Footer, Cards, etc.)
│   ├── hooks/              # Hooks personalizados para integração API~
│   ├── pages/              # Páginas principais do app (Dashboard, Agendamentos, Avisos)
│   ├── App.tsx             # Configuração principal do React
│   ├── main.tsx            # Ponto de entrada da aplicação
├── db.json                 # Simulação de dados com json-server
├── README.md               # Documentação do projeto
├── package.json            # Dependências e scripts
└── ...
```

---

## Tecnologias Utilizadas

- **React**: Biblioteca principal para a construção do front-end.
- **Typescript (ES6+)**: Linguagem principal.
- **HTML5 e CSS3**: Base para estrutura e estilização.
- **Bootstrap**: Framework para estilização responsiva.
- **json-server**: Simulação de uma API para manipulação de dados.

---

## Configuração e Execução do Projeto

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/advicehealth.git
   cd advicehealth
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **json-server**:
   Caso não possua, instale o json-server

   ```bash
   npm install -g json-server
   ```

   O arquivo `db.json` será utilizado como base de dados para simulação. Inicie o json-server com o seguinte comando:

   ```bash
   npx json-server --watch db.json --port 3000
   ```

4. **Inicie o projeto React**:
   Em outro terminal, rode:
   ```bash
   npm run dev
   ```

---

## Funcionalidades

### 1. **Dashboard**

- Visão gerencial do consultório com dados estatísticos como:
  - Número de agendamentos do dia.
  - Número de pacientes atendidos.
  - Faturamento do dia.
  - Agenda do dia.
  - Equipe médica.
  - Utiliza **cards dinâmicos**.

### 2. **Agendamento de Consultas**

- Gerenciamento de agenda dos médicos.
- Funcionalidades:
  - Incluir, alterar e excluir agendamentos.

### 3. **Consulta de Agendamentos**

- Visualização dos pacientes agendados e atendidos.
- Apresentação detalhada de:
  - Informações do agendamento e do médico.
  - Valores cobrados.
- Possibilidade de edição.

### 4. **Quadro de avisos**

- Visualização de avisos e lembretes.
- Possibilidade de exclusão.

---

## Decisões de Arquitetura

1. **Componentização**:

   - Componentes reutilizáveis para facilitar a manutenção e escalabilidade.

2. **CSS modularizado**:

   - Estilos organizados por componentes.

3. **Hook Layer**:

   - Camada separada para manipulação de dados e integrações com o json-server, promovendo separação de preocupações.

## Contato

Para dúvidas ou sugestões, entre em contato pelo email: [luanaportella@gmail.com](mailto:luanaportella@gmail.com).

---

## Demonstração do Projeto

**Página de login**
![Página de login](/src/assets/login.png)

**Página inicial**
![Página Inicial](/src/assets/home.png)

**Página de agendamentos**
![Página de agendamento](/src/assets/agendamentos.png)
