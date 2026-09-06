# Machtia

Machtia is a self-hosted alternative for Google Classroom.

## Setup

### Requirements
For minimal setup you require a Docker installation, and these are the technical requirements:

- **Storage:** 1 GiB of disk storage, this is required for run all containers, but does not ensure storage for the bucket
- **RAM:** +1GiB of available ram, this is required by run all containers and it's servers.
- **OS:** We recomend using a Linux based OS but this project does not have an OS attachment

### Instructions

- Fill all `.env.example` files:
  - **database.env**: Database user, default database and user configuration
  - **bucket.env**: Root user and password
  - **backend.env**: Backend server configuration
- Navigate to the project directory and run:

```sh
docker compose up -d
```
- The backend module is going to drop your admin credentials, take note of this.
- When the bucket and database service is up, you need to browse to `:9001` and setup a bucket and an access key, then you need to fill
  the `backend.env` file with your access key and id, then down the containers and re-up with:

```sh
docker compose down && docker compose up -d
```
