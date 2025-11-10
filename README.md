# LLM Translator API

This project is a work-in-progress API for dynamically translating text using multiple LLMs or Google API.  
Currently, the core logic is under development, and features like multi-language support, translation caching, and dynamic LLM selection will be added gradually.

<hr>

## To-Do List

- [x] Install and implement the infrastructure 
- [x] Set up Docker environment and PostgreSQL
- [x] Implement MikroORM database module
- [x] Create basic /translator/translate route with example request/response
- [] Implement AI LLM translation logic
- [] Implement Google Translate provider integration
- [] Add multi-language background task queue (Redis/BullMQ)
- [] Add caching for repeated translations
- [] Add real-time notifications when all translations are done
- [] Expand Swagger documentation 

<hr>

## Prerequisites

- Node.js >= 22
- npm
- Docker & Docker Compose (optional if running with containers)
- PostgreSQL (if running locally)

---

## Running with Docker

- Build and start containers:

```bash
docker-compose up --build -d
```

- The services will run on: http://localhost:3000, 
- PostgreSQL: localhost:5432
- Swagger documentation (API docs): http://localhost:3000/docs

- Stop the containers: 


```bash
docker-compose down
```

## Running Locally (Without Docker)

- Install dependencies:

``` npm install ```

- Configure environment variables: 

```Create a .env file in the project root:```

```bash 
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=llm_translator
NODE_ENV=development
```

- Start PostgreSQL locally and ensure the database exists.

- Run migrations (to create tables): 

``` npx mikro-orm migration:up ```

- Start the NestJS application:

``` npm run start:dev ```

- Access API: (See request and response example at swagger doc)

```POST: http://localhost:3000/translator/translate```

## Migrations

**MikroORM is used for database migrations.**

- Create a new migration after updating entities:

```bash 
npx mikro-orm migration:create
```

- Apply migrations:

```bash
npx mikro-orm migration:up  
```


