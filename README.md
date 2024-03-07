# nodejs-utopistic-testing-approach


## INSTALL

```bash
npm install
```

create `.env` file and put:
```
PORT=3000
MONGO_URL=mongodb://root:secret@localhost:27017
MONGO_DB_NAME=admin
```


create `.env.test` file and leave it empty:


create `.env.test.smokes` and put:
```
TEST_API_URL="http://localhost:3000"
```


# RUN

## spin up the api

open a different terminal end run the db with docker: 

```bash
docker run --rm  -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret  mongo
```
in the current terminal spin up the nodejs server with (be sure you have create the .env file as above): 

```bash
npm run dev
```

## run a smoke

be sure you have spinned up the api and created the `.env.test.smokes` as above, then run: 

```bash
npm run test:smoke:createuser
``` 



