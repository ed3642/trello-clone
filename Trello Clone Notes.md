# Trello Clone Notes

### init:

create the app, with app rounting

```bash
npx create-next-app@latest trello-clone
```

add the ui library shadcn

```bash
npx shadcn-ui@latest init
```

### marketing page

shadcn, you have to add each component as needed

```bash
npx shadcn-ui@latest add button
```

### Auth

https://dashboard.clerk.com
Use this site to manage users

### DB

use docker to setup a mysql

1. make a docker-compose.yml
2. make a init.sql to tell what to do at startup

```bash
docker-compose up
```

We can add docker volumes to make db persistent if we wanted to but not needed

### db schemas

using prisma

```bash
npm install prisma @prisma/client
```

make a model in schema.prisma then run:

This makes a local db client in /node_modules

```bash
npx prisma generate
```

This pushes the db client to the db

```bash
npx prisma db push
```

### db UI

```bash
npx prisma studio
```

### SafeAction Abstraction

wrap Action functionality in create-safe-action.ts
and called through use-action.ts

Each action should have an input, output, errors

Look at /actions/create-board as an example

All this together makes it feel like react-query
