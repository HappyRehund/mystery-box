## Project Documentation

### Dockerfile

The `Dockerfile` in this project is designed to build an optimized and secure Next.js application image using multi-stage builds.

1.  **`deps` Stage (Dependencies):**
    *   Uses the `node:23-alpine3.21` base image.
    *   Installs `libc6-compat`, which might be required by some native Node modules.
    *   Copies `package.json`, `pnpm-workspace.yaml`, and `pnpm-lock.yaml`.
    *   Installs production and development dependencies using `pnpm`.

2.  **`builder` Stage (Builder):**
    *   Uses the `node:23-alpine3.21` base image.
    *   Copies `node_modules` from the `deps` stage.
    *   Copies the entire application source code.
    *   Generates the Prisma client.
    *   Compiles the TypeScript seed file to JavaScript (if needed in production).
    *   Builds the Next.js application using `pnpm build`. `NEXT_TELEMETRY_DISABLED=1` is used to disable Next.js telemetry.

3.  **`runner` Stage (Production Image):**
    *   Uses the lightweight `node:23-alpine3.21` base image.
    *   Sets `NODE_ENV=production` and `NEXT_TELEMETRY_DISABLED=1`.
    *   Creates a `nodejs` group and a `nextjs` user to run the application with limited privileges for security.
    *   Cleans up Alpine package cache and unnecessary files to reduce image size.
    *   Copies only the necessary files from the `builder` stage to run the application:
        *   The `public` directory.
        *   The standalone Next.js output (`.next/standalone`).
        *   Next.js static files (`.next/static`).
        *   Minimal Prisma files (generated Prisma client, `schema.prisma`, `init.sh`, `seed.js`).
    *   Changes ownership of application files to the `nextjs` user and grants execute permission to `init.sh`.
    *   Switches to the `nextjs` user.
    *   Exposes port `3000`.
    *   The `CMD` instruction runs `init.sh` (likely for database migrations and seeding) and then starts the Next.js server (`node server.js`).

**Multi-stage Build:** The use of multi-stage builds (deps -> builder -> runner) ensures that the final production image (`runner`) contains only the artifacts and dependencies strictly necessary to run the application. This results in a significantly smaller image size, improved security, and reduced deployment times.

### Docker Compose (`compose.yml`)

The `compose.yml` file is used to define and run multi-container Docker applications. This file defines two main services:

1.  **`mystery-box-db` (Database Service):**
    *   Uses the `postgres:17.2-alpine` image.
    *   Loads environment variables from the `.env` file.
    *   Maps port `5432` on the host to port `5432` in the container.
    *   Uses a custom network `mystery-box-network`.
    *   Uses a named volume `mystery-box-db-data` for PostgreSQL data persistence.
    *   Has a `healthcheck` to ensure the database is ready before the application starts.

2.  **`mystery-box-api` (Application Service):**
    *   Builds an image from the `Dockerfile` located in the current directory (`.`).
    *   Loads environment variables from the `.env` file.
    *   Maps port `3000` on the host to port `3000` in the container.
    *   Uses the custom network `mystery-box-network`.
    *   Depends on the `mystery-box-db` service and will only start if `mystery-box-db` is in a `service_healthy` state.
    *   Uses a `restart: unless-stopped` policy so the container automatically restarts unless manually stopped.

**Volumes:**
*   `mystery-box-db-data`: This volume ensures that database data persists even if the `mystery-box-db` container is stopped or removed.

**Networks:**
*   `mystery-box-network`: This custom network allows communication between containers (`mystery-box-db` and `mystery-box-api`) using their service names.

### How to Run the Application

**Important: Ensure the `.env` File Exists!**
This application requires a `.env` file in the project's root directory for configuration, especially for database connection and other environment variables. Without a properly configured `.env` file, the application **will not run**.

Example content for `.env` that might be needed:
```env
# Database & Auth Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_<your-pk>
CLERK_SECRET_KEY=sk_test_<your-sk>

DATABASE_URL="postgresql://<neondb-url>"

# next.js
NEXT_PUBLIC_API_URL=http://localhost:3000


# Others (adjust according to application needs)
```

#### 1. Using Docker Compose (Recommended)

This is the easiest way to run the application along with its database.

1.  **Ensure Docker and Docker Compose are installed.**
2.  **Create a `.env` file** in the project's root directory and fill it with the appropriate configuration (see example above).
3.  **Open a terminal** in the project's root directory.
4.  **Run the following command:**
    ```bash
    docker compose up -d
    ```
    This command will build the images (if they don't already exist), create, and start the containers in the background.
5.  The application will be accessible at `http://localhost:3000` and the database at `<your-neondb-url>`.

To stop the services:
```bash
docker compose down
```

#### 2. Using the Dockerfile (Manual)

This method is more manual and is typically used for building the application image alone, or if you want to run the database separately.

1.  **Ensure Docker is installed.**
2.  **Create a `.env` file** in the project's root directory. The `DATABASE_URL` variable might need adjustment if the database is running outside Docker or on a different host.
3.  **Open a terminal** in the project's root directory.
4.  **Build the Docker image:**
    ```bash
    docker build -t mystery-box-api .
    ```
5.  **Run the container from the built image.** You will need to run a PostgreSQL database container separately and ensure the network is configured so the application can connect to the database.

    Example of running the application container (assuming the database is already running and accessible):
    ```bash
    docker run -d -p 3000:3000 --name my-mystery-box-app --env-file .env mystery-box-api
    ```
    This command runs the container in the background (`-d`), maps port `3000`, names the container, loads variables from `.env`, and uses the `mystery-box-api` image.

    **Note:** Running manually with the Dockerfile requires more complex management of the database and networking compared to using Docker Compose. Therefore, **Docker Compose is highly recommended**.
