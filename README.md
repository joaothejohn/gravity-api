# Prisma & Database

## How to populate a new DB with the current prisma model
```bash
$ yarn prisma-generate
```

## How to create a new migration
```bash
$ MIGRATION_NAME=name-of-the-migration yarn prisma-create-migration
```
The command above will automatically apply the modifications on the DB

## How to apply the migrations to the DB with the current prisma migrations
```bash
$ yarn prisma-migrate
```

<br>

# API
***Remember to setup the DB before initializing the API to avoid errors!***

## Install the API dependencies
```bash
$ yarn
```

## Start the API
```bash
$ yarn start
```
