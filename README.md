# mb-labs-event-manager

> :heavy_exclamation_mark: **OBS**: Este repositório contém o teste relacionado a admissão na empresa mb-labs.

## Índice
[Sobre o Projeto](#sobreoprojeto) | [Funcionalidades](#funcionalidades) | [Pré-Requisitos](#prerequisitos) | [Instalação](#instalacao) | [Tecnologias](#tecnologias) | [Ferramentas](#ferramentas) | [Deploy da Aplicação](#deploy)

## :computer: Sobre o projeto <a name="sobreoprojeto"></a>
O projeto **mb-labs-event-manager** é uma aplicação com o intuito de gerenciar eventos e vender ingressos para os mesmos de forma totalmente online.

## :paperclip: Funcionalidades <a name="funcionalidades"></a>

### :closed_lock_with_key: Autenticação
- [x] Cadastro
- [x] Login

### :cocktail: Eventos
- [x] Criação
- [x] Atualização
- [x] Listagem por usuário
- [x] Deleção

### :ticket: Bilhetes
- [x] Criação
- [x] Atualização
- [x] Listagem por evento
- [x] Deleção

### :dollar: Venda de Bilhetes
- [x] Reservar bilhetes
- [x] Listagem de reservas por usuário
- [x] Listagem de reservas por bilhete


## :clipboard: Pré-requisitos <a name="prerequisitos"></a>
Os requísitos básicos para execução da aplicação são: ter instalado em sua maquina o [Git](https://git-scm.com/), [Nodejs](https://nodejs.org/en/), [Docker](https://www.docker.com/get-started) e o [Docker-Compose](https://docs.docker.com/compose/install/) e um editor de código, recomendamos o [VSCode](https://code.visualstudio.com/download).

> **Nota:** Use sempre a branch **developer** Pois ela conta com as ultimas atualizações do projeto.

## :hammer:  Instalação <a name="instalacao"></a>

### Comece a instalação clonando este repositório
```
$ https://github.com/jacksonPrimo/mb-labs-event-manager.git
```

### Após o clone acesse a pasta do projeto no seu terminal linux/cmd windows
```
$ projeto-integrador-i-mural-online-backend
```

### Instale as dependências do Projeto:
```
$ npm installl ou yarn install
```

### Suba um container local:
```
$ docker-compose up
```

### Execute a aplicação em modo de desenvolvimento:
```
$ npm run dev
```

### Ou em modo de produção:
```
$ npm start
```

**A seguinte saida será exibida:**
>Server is running in port 3000


## :wrench: Principais tecnologias usadas<a name="tecnologias"></a>
- [Express](https://expressjs.com/pt-br/starter/installing.html)
- [bcryptjs](https://www.npmjs.com/package/bcrypt)
- [cors](https://www.npmjs.com/package/cors)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [pg](https://www.npmjs.com/package/pg)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [axios](https://www.npmjs.com/package/axios)
- [email-validator](https://www.npmjs.com/package/email-validator)
- [babel](https://www.npmjs.com/package/Babel)
- [eslint](https://www.npmjs.com/package/eslint)
- [typescript](https://www.npmjs.com/package/typescript)
- [jest](https://www.npmjs.com/package/jest)
- [supertest](https://www.npmjs.com/package/supertest)


as demais dependencias estão em: [package.json](https://github.com/ifpi-picos/projeto-integrador-i-mural-online-backend/blob/develop/package.json)

## :pencil: Ferramentas de auxilio <a name="ferramentas"></a>
- **Editor:** [VSCode](https://code.visualstudio.com/download)

## Deploy da aplicação <a name="deploy"></a>
A aplicação já está no ar no seguinte link:

:pushpin: [Aplicação](https://mb-labs-event-manager.herokuapp.com/s)