# Banking Payments (Next.js + Spring Boot + Kafka + Hasura)

Learning project: a simple banking payments flow with a React/Next.js UI, a Spring Boot payments API, Kafka events, and Hasura (Postgres) as the data layer.

## What you get

- **Frontend**: Next.js app with login page + payment submit form
- **Backend**: Spring Boot API that:
  - generates a unique `authorizationId`
  - writes a payment record to Postgres
  - publishes a `PaymentAuthorized` event to Kafka
- **Infra**: Docker Compose for Postgres + Hasura + Kafka
- **CI/CD practice**: `azure-pipelines.yml` and `Jenkinsfile`

## Quick start (local)

1. Start infra (Postgres + Hasura + Kafka-compatible broker):

```bash
docker compose up -d
```

2. Start backend:

```bash
cd backend
./mvnw spring-boot:run
```

3. Start frontend:

```bash
cd frontend
npm install
npm run dev
```

## URLs

- Hasura console: `http://localhost:8080`
- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:8081/actuator/health`

## Notes

- Postgres is published on **localhost:5433** (container port 5432) to avoid conflicts with any local Postgres already using 5432.
- Kafka broker is **Redpanda** on **localhost:9092** (Kafka protocol).

