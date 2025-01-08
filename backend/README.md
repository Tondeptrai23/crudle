## Environment Variables Setup Instructions

### 1. Create a .env file
In the root directory of your project, create a file named .env.

### 2. Define Environment Variables
Add the following environment variables to the .env file, and set their values based on the database you are using:
```env
CONNECTION_STRING=
DATABASE=
```
### 3. Setting the CONNECTION_STRING Based on the DATABASE Type
If you're using MySQL, set the environment variables as follows:
```env
DATABASE = MYSQL
CONNECTION_STRING = "server=localhost;database=DATABASE_NAME;user=root;password=PASSWORD"
```

Replace `DATABASE_NAME`, `PASSWORD`, and `SERVER_NAME` with your actual database values.

## Running tests

To run the tests, run the following command:
```bash
dotnet test
```
