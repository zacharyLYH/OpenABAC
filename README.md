## Getting Started

### Prerequisite:
- Next14^
- Docker
- NodeJS (version that supports Next14)

### ENV for development with Docker
```
DATABASE_URL=mysql://user1:root_password@localhost:3306/openabac
DATABASE_HOST=localhost
DATABASE_USER=user1
DATABASE_PASSWORD=password1
DATABASE_NAME=openabac
```

First, set up a local database:

```bash
yarn run db:up
```

Then, start the server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
