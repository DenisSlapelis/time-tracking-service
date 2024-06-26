# time-tracking-service

This is a simple time tracking system designed to help employees to view their worked hours, using Clean Architecture, TDD and BDD concepts.

---

![Static Badge](https://img.shields.io/badge/backend%20project-%230f42d9?style=for-the-badge)

![Static Badge](https://img.shields.io/badge/v20.9.0-version?logo=nodedotjs&logoColor=%23339933&color=%23339933&labelColor=white&label=Node%2EJS)
![Static Badge](https://img.shields.io/badge/v5.x-version?logo=typescript&logoColor=%233178c6&color=%233178c6&labelColor=white&label=TypeScript)
![Static Badge](https://img.shields.io/badge/v4.x-version?logo=express&logoColor=%23000000&color=%23000000&labelColor=white&label=Express)

<!-- --- -->
<!-- ![Static Badge](https://img.shields.io/badge/database-%230f42d9?style=for-the-badge)

![Static Badge](https://img.shields.io/badge/v5.x-version?logo=sqlite&logoColor=%234169E1&color=%234169E1&labelColor=white&label=SQLite)
![Static Badge](https://img.shields.io/badge/v6.x-version?logo=sequelize&logoColor=%2352B0E7&color=%2352B0E7&labelColor=white&label=Sequelize) -->

---
![Static Badge](https://img.shields.io/badge/cloud%20integrations-%230f42d9?style=for-the-badge)

![Static Badge](https://img.shields.io/badge/v3.x-version?logo=amazonaws&logoColor=%23FF9900&color=%23FF9900&labelColor=white&label=AWS%20SDK)

---
![Static Badge](https://img.shields.io/badge/utils-%230f42d9?style=for-the-badge)

![Static Badge](https://img.shields.io/badge/v4.x-version?logo=lodash&logoColor=%233492FF&color=%233492FF&labelColor=white&label=Lodash)
![Static Badge](https://img.shields.io/badge/v4.x-version?logo=dayjs&logoColor=%23FB6052&color=%23FB6052&labelColor=white&label=Dayjs)

---

<a name="table-of-contents"></a>

## Table of contents

* [General Info](#table-of-contents)
    <!-- * [RIPD](#ripd) -->
    <!-- * [Usage Video](#video) -->
* [Usage documentation](#table-of-contents)
    * [Envs](#envs)
    * [Usage with Docker](#table-of-contents)
        * [Prerequisites](#docker-prerequisites)
        * [Usage](#docker-usage)
    * [Usage with Node.JS](#table-of-contents)
        * [Prerequisites](#node-prerequisites)
        * [Installation](#node-installation)
        * [Usage](#node-usage)
        * [Tests](#tests)
    * [Endpoints Rules](#endpoints-rules)
    * [Postman Collection](#postman)
* [Architecture documentation](#table-of-contents)
    * [Solution](#solution)
    * [Next steps](#next-steps)
    * [Database](#database)
    * [Folder Structure](#folder-structure)

---

<a name="video"></a>

### Usage Video

You can find an explanatory video playlist about how the entire application works [here](https://www.youtube.com/playlist?list=PLYCTn1Be4VEbEAlVQlsbQ771a1bjS7NST).

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="envs"></a>

### Envs

You must configure **.env** file following the [.env.example](/.env.example) template.
Some envs come directly from the [AWS Parameter Store](https://docs.aws.amazon.com/pt_br/systems-manager/latest/userguide/systems-manager-parameter-store.html), so it is very important to have configured the **AWS_ACCESS_KEY_ID** and **AWS_SECRET_ACCESS_KEY** values ​​so that all application envs are loaded correctly.

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="docker-prerequisites"></a>

## Docker Prerequisites

To run this project with docker, ensure that you have the following items:

* [Docker](https://www.docker.com/)
* [Configured .env file](#envs)

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="docker-usage"></a>

## Docker Usage

Start the node server with the following commands:

```shell
docker compose build
```

```shell
docker compose up -d
```

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="node-prerequisites"></a>

## Node Prerequisites

To run this project, ensure that you have the following items:

* [Node.JS](https://nodejs.org) (v20.9.0)
* [Configured .env file](#envs)

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="node-installation"></a>

## Node Installation

1. Clone this repository to your local machine or download the source code.
2. Open a terminal and navigate to the project's root directory.
3. Run the following command to install the project dependencies:

   ```shell
   npm install
   ```

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="node-usage"></a>

## Node Usage

Start the node server in developer mode with the following command:

```shell
npm run start:dev
```

This will start the server and watch for any file changes, automatically restarting the server when necessary.

Or start in production mode with the following command:

```shell
npm run start
```

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="tests"></a>

## Tests

* Run the following command to execute the project tests:

    ```shell
    npm run test
    ```

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="endpoints-rules"></a>

## Endpoints rules

* All endpoints can be found [here](https://documenter.getpostman.com/view/10486183/2s9YsQ7Ugr).
* Except healthcheck, all endpoints have the prefix `/api` followed by the route version, for example `/api/v1/`.
* All endpoints require authorization, which can be passed through the `Authorization` header with a valid **JWT token** (this can be obtained by making a **POST** request on the login route with username and password).
* The `Authorization` header is an `Bearer Token`.

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="postman"></a>

## Postman

* [Online Collection](https://documenter.getpostman.com/view/10486183/2s9YsQ7Ugr)

* [Download Collection](docs/rural-producer-service.postman_collection.json "Collection")

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="solution"></a>

## Solution

![integrations](docs/assets/integrations.svg "Integrations")

The solution consists of three endpoints created as **Lambdas**. Requests will pass through an **API Gateway** for traffic control and routing.

All endpoints also integrate with **CloudWatch** for monitoring API usage.

The use of Lambdas is due to the low response time and extremely low cost since only what is used will be charged.

### Authentication

The endpoint will authenticate if the provided user is authenticated, returning the access token used in the APIs below.

### Checkin/Checkout

Responsible for registering user check-in and check-out. The endpoint also controls whether the information is an entry or exit record.

### Viewing Records

It is the API used to return the check-in and check-out time of the authenticated user.
The API allows searching for user the check-in and check-out time by day and month, as well as sending the report by email with **AWS SES**.

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="next-steps"></a>

## Next Steps

![next-steps](docs/assets/functional-requirements-2.svg "next-steps")

For the next steps, we have separated the topics as follows:

### Edit tracking records

For the editing request, we plan to have three **Lambdas**. These **Lambdas** will pass through the **API Gateway**.

- Editing request creation: In this endpoint, the user will provide the editing data to be sent for approval. The records will be created in the `edit-requests` schema to isolate the requests from the approved the check-in and check-out times.

- Listing of requests for approval: This endpoint can only be accessed by managers, controlled by the user's role. When requesting the list, the system will only return approvals that are from employees the user has permission to view.

- Request aproval: When the manager approves the request, the system will move the record from `edit-requests` to the existing employee's `time-tracking-records` schema. The record will remain in `edit-requests` to monitor approvals and the number of approvals being requested.

### Notification

The notification system will be a **Lambda** that will be executed daily integrated with the **EventBridge**.

When the day changes, records where the `lastAction` is checkin are understood as the user not having performed the check-out time punching. This user will receive an email informing them that the hours record is irregular for that day.

### Admin

For the administration section, we have created a **Lambda** function that will create the user and insert them into the users schema, which is used for authentication.

At the same time, it will consolidate the data with the existing data in the time-tracking records.

### Reports

For the second phase of report generation, we will provide an endpoint for manual triggering of reports, allowing managers to receive entries only from those who have permission.


([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="database"></a>

## Database

In this project, we use DynamoDB to persist user data, time entries, and record approvals.

We chose DynamoDB for its high availability and scalability, primarily targeting peak times of record entries.

For security purposes, we utilize VPC to prevent external access to the stored data. Additionally, we employ CloudWatch monitoring to log operations performed on the database.

We have configured DynamoDB to perform daily backups to quickly recover data in case of instance issues.

Schemas:

![database](docs/assets/database.svg "Database")

In this first delivery, the database will contain the following schemas:

### time-tracking-records
Responsible for storing user time tracking records.

- The records will contain the following data:
  - `id`: ID. Will be generated daily for each user.
  - `lastAction`: Last executed action.
  - `referenceDate`: the check-in/check-out date.
  - `trackings`
  - `trackings.checkin`: Check-in time.
  - `trackings.checkout`: Check-out time.
  - `username`: User ID.

- users
  - `id`: User code.
  - `username`: User name.
  - `registration`: User login.
  - `pass`: Encrypted password.

([Back to Table of contents](#table-of-contents) :arrow_up:)

---

<a name="folder-structure"></a>

## Folder Structure

* `.github`: github actions.
* `.vscode`: vscode configs.
* `docs`: all project documentations, like scripts, diagrams, texts.
* `src`
  * `config`: generic project configurations, like database configs, commit configs.
    * `database`: database configs.
      * `models`: database models.
      * `migrations`: database migrations.
    * `envs`: local and async envs configs.
  * `controllers`: application controllers.
  * `dtos`: application dtos.
  * `entities`: application domain entities.
  * `factories`: application factories to be used on routes.
  * `interfaces`: application interfaces.
  * `middlewares`: application middlewares.
  * `repositories`: application repositories.
  * `routes`: application routes.
    * `v1`: v1 endpoints.
  * `services`: application services.
  * `use-cases`: application use cases that contain the entire business rule.
  * `utils`: common utils functions, constants, and application dependencies.
    * `logger`: logger module.
* `tests`: project tests
    * `bdd`: bdd tests

([Back to Table of contents](#table-of-contents) :arrow_up:)
