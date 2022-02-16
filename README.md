# Basic_Backend

This basic backend was made using:
 - Node JS
 - Express
 - Typescript
 - Prisma

It was made to use with a MariaDB (MySql) data base

To build the first instance, run:
$npm install

Edit the .env file with your infos
mysql://USER:PASSWORD@HOST:PORT/DATABASE

$npx prisma migrate dev --name init
* if the tables are not created, run again the former line
$npm install @prisma/client

$npm run dev

Done, now your base server is running in the port 3333 (if you not altered before)
