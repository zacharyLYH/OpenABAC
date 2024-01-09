## Getting Started

### Prerequisite:
- Next14^
- Docker
- NodeJS (version that supports Next14)

### ENV for development with Docker
```
DATABASE_URL_DEV=mysql://user1:root_password@localhost:3306/openabac
DATABASE_HOST_DEV=localhost
DATABASE_USER_DEV=user1
DATABASE_PASSWORD_DEV=password1
DATABASE_NAME_DEV=openabac
IS_PRODUCTION=false (Set to true in production)
USE_PRODUCTION_DB=false (Set to true if using Docker MySQL or in production)
```

First, set up a local database:

```bash
yarn run dev:up
```

Then, start the server:
```bash
npm run dev
# or
yarn dev
```

Close the database connection when you're done with:
```bash
yarn run db:down
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
