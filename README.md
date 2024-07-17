<h1 align="center">salvus-web-dev</h1>

## Descrição
**salvus-web-dev** É um projeto dividido em três desafios práticos, cada um focado em diferentes aspectos do desenvolvimento web: backend, frontend e integração/deploy.

## Design do Sistema
![Design do Sistema](./salvus-front/public/design.png "Design do Sistema")

## Principais Tecnologias:
[Node](https://nodejs.org/en)  
[TypeScript](https://www.typescriptlang.org/)  
[Express](https://expressjs.com/)  
[Docker](https://www.docker.com/)  
[Docker Compose](https://docs.docker.com/compose/)  
[Jest](https://jestjs.io/pt-BR/)  
[MySQL](https://www.mysql.com/)  
[React](https://react.dev/)  
[TailwindCss](https://tailwindcss.com/)  
[NextJs](https://nextjs.org/)  
[Prisma](https://www.prisma.io/)  

## Padrões e design aplicados
[SOLID](https://www.freecodecamp.org/news/solid-principles-explained-in-plain-english/)  
[Repository](https://medium.com/@pererikbergman/repository-design-pattern-e28c0f3e4a30)        
[Clean Architecture](https://medium.com/luizalabs/descomplicando-a-clean-architecture-cf4dfc4a1ac6)  
[DDD](https://fullcycle.com.br/domain-driven-design/)

# Rodando a aplicação localmente

## Clonando a aplicação

``` 
https://github.com/Flaviojcf/salvus-web-dev.git
```

Entre na pasta do projeto

``` 
cd salvus-web-dev
```

## Rodando o backend com Docker
***Para utilizar os comandos do Docker, é necessário ter o Docker instalado na máquina.***

Entre na pasta do serviço de backend

``` 
cd backend
```

Crie um arquivo .env copiando o que está dentro do .env.example

``` 
DATABASE_URL="mysql://root:salvus-web-dev@mysql-db:3306/salvus_web_dev"
``` 

Suba o container  

***Obs: Aguarde a mensagem de inicialização do servidor "Server is running on port 3000", as migrations são executadas e 
as imagens da aplicação e do MySQL são baixadas o que pode causar uma lentidão.***
``` 
docker compose up -d --build
```
Acesse o swagger
``` 
http://localhost:3000/api/swagger
```

## Rodando o backend sem Docker
***É necessário ter o MySQL instalado na máquina.***

Entre na pasta do serviço de backend
``` 
cd backend
```
Crie um arquivo .env copiando o que está dentro do .env.example
``` 
DATABASE_URL="mysql://root:salvus-web-dev@localhost:3306/salvus_web_dev"
``` 

Instale as dependências
``` 
npm i
```

Rode as migrations do prisma
``` 
npx prisma migrate dev
```
Acesse o swagger
``` 
http://localhost:3000/api/swagger
```
## Rodando o frotend

Entre na pasta do serviço de frontend
``` 
cd salvus-front
```

Crie um arquivo .env copiando o que está dentro do .env.example
``` 
DATABASE_URL="http://localhost:3000"
``` 

Instale as dependências
``` 
npm i
```
Acesse a aplicação web
``` 
http://localhost:3031/
```

# Acessando a aplicação hospedada

Backend  

***Obs: O render acaba derrubando os servidores do tier gratuito, quando não ocorrem requests dentro de 
um itervalo de 50s, caso o servidor esteja fora, após o primeiro acesso, aguarde alguns minutos até o serviço ser reiniciado.***
``` 
https://salvus-web-dev.onrender.com
```

Frontend
``` 
https://salvus.vercel.app/
```

🛠️ Created by [Flaviojcf](https://github.com/Flaviojcf)
