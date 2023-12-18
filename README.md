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

<br>

# Radius Server (freeRadius)
***Some insights to test the server locally***

*Doc URL: https://wiki.freeradius.org/building/Building-Ubuntu-packages-from-source*

```bash
$ sudo service freeradius stop
$ sudo freeradius -X
$ echo "User-Name = meteora328, User-Password = 123123, Called-Station-Id = 120.0.0.100" | radclient localhost:1812 auth secret \n
```

- **User-Name**: This is the customer's username on the API/DB
- **User-Password**: This is the customer's password on the API/DB
- **Called-Station-Id**: This is the DomainRouter IP address used for each Domain
- **localhost:1812**: The freeRadius server URL
- **secret**: The freeRadius server shared secret, which in this case is called "secret"