# **🌍 Global Insights API: Dynamic Country Data & Visualizations**

Dive into a robust Node.js Express API designed to deliver comprehensive country data, including real-time estimations of GDP. This service fetches and processes global country information, calculates dynamic economic indicators, and even generates visual summaries on demand. Perfect for applications requiring up-to-date geopolitical and economic data! ✨📈

## Core Principle
When you detect a backend project (API servers, databases, authentication systems), 
      use THIS EXACT TEMPLATE STRUCTURE with technical precision:
    
      """
      # [ProjectName] API
    
      ## Overview
      [1-2 sentence technical description mentioning key frameworks/languages]
      
      ## Features
      - [Technology]: [Purpose]
      - [Technology]: [Purpose]
    
      ## Getting Started
      ### Installation
      [Step-by-step commands]
      
      ### Environment Variables
      [List ALL required variables with examples]
    
      ## API Documentation
      ### Base URL
      [API root path]
    
      ### Endpoints
      #### [HTTP METHOD] [ENDPOINT PATH]
      **Request**:
      [Payload structure with required fields]
      
      **Response**:
      [Success response example]
      
      **Errors**:
      - [HTTP Status]: [Error scenario]
      """
    
      ## Mandatory Rules
      1. Detection:
         - Analyze code for API patterns (routes, controllers, models)
         - Identify database/auth systems
    
      2. Documentation:
         ✓ All endpoints documented!!! Please obey this!!!!!!
         ✓ Do not wrap the entire documented part of the readme in a detail and summary tag!!!!!!
         ✓ Exact request/response schemas. Please always do this, do not forget to do this Please !!!
         ✓ Environment variables with examples
         ✓ Error codes and meanings
         ✓ Zero emojis or promotional language

         So Please this is just a sample of what am expecting you to do strictly please!!!
         '**User Registration:**
          POST /api/v1/auth/register
          _Body Example:_
          json
          {
            "full_name": "John Doe",
            "username": "johndoe",
            "email": "john.doe@example.com",
            "phone": "08012345678",
            "address": "123 Main St, City",
            "password": "StrongPassword123",
            "referral_username": "referrer_user"
          }'
    
      3. For non-backend projects:
         - Use standard formatting (dont bloat the readme emojis please. If you want to add emojis just add one or two and make sure it matches the text that you are adding it next to, if there's any screenshots you can add then add if not skip it, etc.)
         - Include Dokugen badge always!!!
    
      4. Universal:
         - Never wrap in code blocks (```markdown)
         - Sound human-written
         - Use Markdown formatting
      
## **Countries Data API**

## Overview
This is a Node.js Express API that serves comprehensive country data, including dynamically estimated GDP, fetched from external sources and stored in a MySQL database. It supports data refreshing, querying with filters, and generating visual summaries.

## Features
-   **Node.js Express**: Provides a robust and scalable framework for API development and routing.
-   **MySQL2/Promise**: Facilitates efficient, asynchronous interaction with the MySQL database.
-   **Axios**: Enables secure and reliable integration with external data providers like `restcountries.com` and `open.er-api.com`.
-   **Canvas**: Used for dynamic server-side generation of data visualization images, such as country summaries.
-   **Dotenv**: Manages environment-specific configurations securely and efficiently.
-   **Data Refresh Mechanism**: Implements an on-demand process to synchronize and update country data from external APIs.
-   **Estimated GDP Calculation**: Includes a logic to derive an estimated Gross Domestic Product based on population and exchange rates.
-   **Data Filtering & Sorting**: Supports querying countries by region, currency, and sorting results by various criteria including GDP and name.

## Getting Started
### Installation
To get this project up and running on your local machine, follow these steps:

1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd omo
    ```
2.  **Install Dependencies**:
    Navigate to the project directory and install the required Node.js packages.
    ```bash
    npm install
    ```
3.  **Database Setup**:
    Ensure you have a MySQL server running. Then, execute the `schema.sql` file to create the necessary `countries` table.
    ```bash
    # Example using mysql client, replace with your database credentials
    mysql -u [your_mysql_user] -p [your_mysql_database] < models/schema.sql
    ```
    This will create the `countries_db` database and the `countries` table if they don't exist.

### Environment Variables
Create a `.env` file in the root directory of the project and populate it with the following environment variables. These are crucial for database connection and application port.

```env
PORT=3000
MYSQLHOST=localhost
MYSQLUSER=root
MYSQLPASSWORD=
MYSQLDATABASE=countries_db
MYSQLPORT=3306
```

**Required Variables**:
-   `PORT`: The port on which the Express server will listen.
    *   Example: `PORT=3000`
-   `MYSQLHOST` or `DB_HOST`: The hostname of your MySQL database server.
    *   Example: `MYSQLHOST=localhost`
-   `MYSQLUSER` or `DB_USER`: The username for connecting to your MySQL database.
    *   Example: `MYSQLUSER=root`
-   `MYSQLPASSWORD` or `DB_PASSWORD`: The password for your MySQL user.
    *   Example: `MYSQLPASSWORD=` (empty for no password)
-   `MYSQLDATABASE` or `DB_NAME`: The name of the database to connect to.
    *   Example: `MYSQLDATABASE=countries_db`
-   `MYSQLPORT` or `DB_PORT`: The port number for your MySQL database connection.
    *   Example: `MYSQLPORT=3306`

## API Documentation
### Base URL
`http://localhost:3000` (or your configured `PORT`)

### Endpoints

#### POST /countries/refresh
Initiates a refresh of the country data from external APIs (restcountries.com and open.er-api.com). This operation clears existing country data and re-populates the database, also generating a new summary image.

**Request**:
No request body required.

**Response**:
```json
{
  "message": "Countries data refreshed successfully",
  "total_countries": 250,
  "image_generated": true,
  "last_refreshed_at": "2023-10-27T10:30:00.000Z"
}
```

**Errors**:
-   `500 Internal Server Error`: An unexpected error occurred on the server.
-   `503 Service Unavailable`: External data sources (e.g., restcountries.com, open.er-api.com) were unreachable or timed out during data fetching.

#### GET /countries/image
Retrieves the latest generated summary image of top countries by GDP.

**Request**:
No request parameters required.

**Response**:
Returns the `image/png` binary data of the summary image.

**Errors**:
-   `404 Not Found`: The summary image has not been generated yet.
    ```json
    {
      "error": "Summary image not found",
      "message": "Please run POST /countries/refresh first to generate the image"
    }
    ```
-   `500 Internal Server Error`: An error occurred while attempting to serve the image.

#### GET /countries
Retrieves a list of all countries, with optional filtering and sorting capabilities.

**Request**:
Query parameters:
-   `region`: (Optional) Filter by country region.
    *   Example: `/countries?region=Europe`
-   `currency`: (Optional) Filter by currency code.
    *   Example: `/countries?currency=USD`
-   `sort`: (Optional) Sort order for the results.
    *   Accepted values: `gdp_desc`, `gdp_asc`, `name_asc`, `name_desc`
    *   Example: `/countries?sort=gdp_desc`

**Response**:
```json
[
  {
    "id": 1,
    "name": "United States",
    "capital": "Washington, D.C.",
    "region": "Americas",
    "population": 331002651,
    "currency_code": "USD",
    "exchange_rate": 1.000000,
    "estimated_gdp": 23000000000000.000000,
    "flag_url": "https://restcountries.com/data/usa.svg",
    "last_refreshed_at": "2023-10-27T10:30:00.000Z",
    "created_at": "2023-10-27T10:30:00.000Z",
    "updated_at": "2023-10-27T10:30:00.000Z"
  },
  {
    "id": 2,
    "name": "Canada",
    "capital": "Ottawa",
    "region": "Americas",
    "population": 38005238,
    "currency_code": "CAD",
    "exchange_rate": 1.370000,
    "estimated_gdp": 2000000000000.000000,
    "flag_url": "https://restcountries.com/data/can.svg",
    "last_refreshed_at": "2023-10-27T10:30:00.000Z",
    "created_at": "2023-10-27T10:30:00.000Z",
    "updated_at": "2023-10-27T10:30:00.000Z"
  }
]
```

**Errors**:
-   `500 Internal Server Error`: An unexpected error occurred while fetching country data.

#### GET /status
Provides a basic health check and status overview of the API, including the total number of countries in the database and the timestamp of the last data refresh.

**Request**:
No request parameters required.

**Response**:
```json
{
  "total_countries": 250,
  "last_refreshed_at": "2023-10-27T10:30:00.000Z"
}
```

**Errors**:
-   `500 Internal Server Error`: An unexpected error occurred while retrieving status information.

#### GET /countries/:name
Retrieves detailed information for a specific country by its exact name.

**Request**:
Path parameter:
-   `name`: The exact name of the country to retrieve.
    *   Example: `/countries/Canada`

**Response**:
```json
{
  "id": 2,
  "name": "Canada",
  "capital": "Ottawa",
  "region": "Americas",
  "population": 38005238,
  "currency_code": "CAD",
  "exchange_rate": 1.370000,
  "estimated_gdp": 2000000000000.000000,
  "flag_url": "https://restcountries.com/data/can.svg",
  "last_refreshed_at": "2023-10-27T10:30:00.000Z",
  "created_at": "2023-10-27T10:30:00.000Z",
  "updated_at": "2023-10-27T10:30:00.000Z"
}
```

**Errors**:
-   `404 Not Found`: No country found with the specified name.
    ```json
    {
      "error": "Country not found"
    }
    ```
-   `500 Internal Server Error`: An unexpected error occurred while fetching country details.

#### DELETE /countries/:name
Deletes a specific country from the database by its exact name.

**Request**:
Path parameter:
-   `name`: The exact name of the country to delete.
    *   Example: `/countries/Canada`

**Response**:
```json
{
  "message": "Country deleted successfully"
}
```

**Errors**:
-   `404 Not Found`: No country found with the specified name to delete.
    ```json
    {
      "error": "Country not found"
    }
    ```
-   `500 Internal Server Error`: An unexpected error occurred while attempting to delete the country.

---

## Usage

Once the server is running and the database is populated, you can interact with the API using any HTTP client (e.g., Postman, Insomnia, `curl`).

1.  **Start the Server**:
    If you've set up your `.env` file and database, you can start the application:
    ```bash
    npm start
    ```
    For development with auto-restarts on file changes:
    ```bash
    npm run dev
    ```
    You should see a message indicating the server is running on the specified port.

2.  **Populate the Database**:
    Before querying, you need to fetch data from external APIs and populate your database. Send a POST request to the refresh endpoint:
    ```bash
    curl -X POST http://localhost:3000/countries/refresh
    ```
    This will take a moment as it fetches data for all countries and exchange rates, then calculates estimated GDPs and stores them. It will also generate a `summary.png` image in the `cache` directory.

3.  **Retrieve All Countries**:
    Get a list of all countries currently in the database:
    ```bash
    curl http://localhost:3000/countries
    ```

4.  **Filter Countries by Region**:
    Find all countries located in 'Europe':
    ```bash
    curl "http://localhost:3000/countries?region=Europe"
    ```

5.  **Sort Countries by GDP (Descending)**:
    List countries by their estimated GDP, from highest to lowest:
    ```bash
    curl "http://localhost:3000/countries?sort=gdp_desc"
    ```

6.  **Get a Specific Country's Details**:
    Retrieve information for 'Japan':
    ```bash
    curl http://localhost:3000/countries/Japan
    ```

7.  **Check API Status**:
    Verify the health and last refresh time of the data:
    ```bash
    curl http://localhost:3000/status
    ```

8.  **View Summary Image**:
    Access the dynamically generated image showing top countries by GDP:
    ```bash
    # Open this URL in your browser or use curl to save it:
    curl -o summary.png http://localhost:3000/countries/image
    ```

9.  **Delete a Country**:
    Remove 'Wakanda' from the database (if it existed):
    ```bash
    curl -X DELETE http://localhost:3000/countries/Wakanda
    ```

## Technologies Used

| Technology                                                 | Description                                            |
| :--------------------------------------------------------- | :----------------------------------------------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) | A JavaScript runtime for building scalable network applications. |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | A fast, unopinionated, minimalist web framework for Node.js. |
| ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)     | An open-source relational database management system. |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)         | Promise-based HTTP client for the browser and Node.js. |
| ![Canvas](https://img.shields.io/badge/HTML5_Canvas-E34F26?style=for-the-badge&logo=html5&logoColor=white) | Node.js native bindings for Cairo, Pango, and GIF. |
| ![Dotenv](https://img.shields.io/badge/dotenv-FAE031?style=for-the-badge&logo=dotenv&logoColor=black) | Loads environment variables from a `.env` file.        |
| ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white) | A tool that helps develop Node.js based applications by automatically restarting the node application when file changes are detected. |

## License

This project is licensed under the ISC License.

## Author Info

👋 Hi, I'm a passionate Full Stack Developer with a knack for building robust and scalable applications. I thrive on solving complex problems and crafting efficient solutions. Let's connect!

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/your_username)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/your_username)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=react&logoColor=white)](https://yourportfolio.com)

---

[![Node.js](https://img.shields.io/badge/Node.js-v18.x-brightgreen)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.1.0-blue)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-blue)](https://www.mysql.com/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)