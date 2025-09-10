# Eastvantage FullStack Examination

A lightweight user management application that supports assigning multiple roles per user. The project is powered by Laravel 8 on the backend and React 17 with TypeScript (via Vite) on the frontend.

## Tech Stack

- **Backend:** Laravel 8 (with Laravel Sail for Docker-based development)
- **Database:** MySQL
- **Frontend:** React 17 with TypeScript (powered by Vite)

## Backend

#### Prerequisites

- Docker Desktop (installed and running)
- PHP and Composer installed locally (for initial setup)
- MySQL (for local development)

#### Running without Docker (Optional)

If you prefer running the application without Laravel Sail, make sure you have the following installed locally:

- PHP >= 7.4
- Composer
- MySQL

#### Running Backend Application

1. Open the terminal and navigate to the backend directory by running the command:
   
   <pre>cd /path/eastvantage-fullstack-exam/backend</pre>
   

2. Install Dependencies

   <sub>Run the following command to install PHP dependencies</sub>

     ```bash
     composer install
     ```
   

4. Configure Environment

    <sub>Copy the example environment file:</sub>
  
    ```bash
    cp .env.example .env
    ```

    <sub>Generate application key:</sub>

    ```bash
    php artisan key:generate
    ```

    <sub>Key variables to check or update:</sub>

    - **APP_NAME** – Name of your application (e.g., `UserManagementApp`)
    - **DB_HOST** – Database host (`mysql` when using Sail, or `127.0.0.1` if running locally without Docker)
    - **DB_PORT** – Database port (default: `3306`)
    - **DB_DATABASE** – Database name
    - **DB_USERNAME** – Database username
    - **DB_PASSWORD** – Database password
    
5. Start Application
   
   <sub>Bring up the Docker container (make sure Docker is running): </sub>

   ```bash
   ./vendor/bin/sail up -d
   ```

   - `-d` runs container in the background
   - By default, the application is accessible at [http://localhost:8000](http://localhost:8000)
   - If you set a custom port in .env (e.g APP_PORT=8080), open [http://localhost:8080](http://localhost:8080)
  
   <sub>Run the application locally using Artisan</sub>

   ```bash
   php artisan serve
   ```

6. Run Migrations and Seeder

   <sub>Run inside Sail:</sub>

   ```bash
   ./vendor/bin/sail artisan migrate --seed
   ```

   <sub>Run inside local MySQL Database:</sub>

   ```bash
   php artisan migrate --seed
   ```

#### Notes

  - Default DB Credentials (from backend/.env)

    <pre>
    DB_HOST=mysql
    DB_PORT=3306
    DB_DATABASE=laravel
    DB_USERNAME=sail
    DB_PASSWORD=password
    </pre>

 - Don't use `php artisan serve` - Sail already runs `Nginx` with `PHP-FPM`.

#### Stopping Containers

   <sub>To stop the container, run this command</sub>

   ```bash
    ./vendor/bin/sail down
   ```

   - Must be navigated to the backend directory

## Frontend

#### Prerequisites

- NodeJS installed locally

#### Running Frontend Application

1. Open the terminal and navigate to the frontend directory by running the command:
   
   <pre>cd /path/eastvantage-fullstack-exam/frontend</pre>
   

2. Install Dependencies

   <sub>Run the following command to install npm dependencies</sub>
   
   ```bash
    npm install
    ```
   

3. Configure Environment

    <sub>Copy the example environment file:</sub>
  
   ```bash
    cp .env.example .env
    ```

    <sub>Key variables to check or update:</sub>

    - **VITE_API_URL** – Backend host (Use the host that Sail generate when using Sail, or `http://127.0.0.1:8000` if run `php artisan serve`)

4. Start frontend application

   <sub>Running this command</sub>
   ```bash
    npm run dev
    ```

5. Testing
   - Open the browser and navigate at [http://localhost:5173](http://localhost:5173)
   - If the terminal shows a different port (e.g http://localhost:5174), open that instead
   

#### Notes

  - Default API HOST (from frontend/.env)

    <pre>
      VITE_API_URL=http://localhost:8000
    </pre>

 - Use the host that Sail generates.


  
    
