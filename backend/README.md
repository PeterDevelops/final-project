## Creating the database

1. Use the ```psql -U labber```command to login to the PostgreSQL server with the username labber and the password labber. This command MUST be run in a vagrant terminal, we are using the PostgreSQL installation provided in the vagrant environment. M1/M2 and WSL2 users can execute this command in their terminal.

2. Create a database with the command CREATE DATABASE mrkt_database;.

3. Create the .env by using .env.example as a reference: 
```cp .env.example .env```

4. Update the .env file with your correct local information
  DB_HOST=localhost
  DB_PORT=5432
  DB_USER=labber
  DB_PASS=labber
  DB_NAME=mrkt_database

### Seeding
1. In the backend directory, run a the development server with ```npm run local``` . 

2. Reset database: ```npm run db:reset``` (see package.json & backend/bin/resetdb.js)

### Run The Server
Running the server normally

```npm run local```