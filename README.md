# AI Autonomous Company Simulator

Spring Boot backend scaffold for an AI-driven autonomous company simulator.

## Included setup

- Spring Boot 4 backend with web, security, validation, actuator, and JPA
- Spring AI OpenAI starter for LLM integration
- Flyway-managed database schema with vendor-specific migrations for H2, PostgreSQL, and MySQL
- Environment-variable based configuration for secrets and simulator settings
- Configurable external integration channels for accounting, CRM, HR, ERP, messaging, payments, and analytics
- LLM-driven agent decision layer with prompt versioning, structured outputs, tool calling, retry/fallback, and cost tracking
- Optional human approval workflow with review queue, manual override, and role-based endpoint protection
- Background job execution for autonomous runs with persistent queue state, retries, and scheduled polling
- Ops-grade observability with structured logs, Prometheus metrics, traces, and persistent decision audit history
- Deployment assets for Docker Compose, Kubernetes manifests, GitHub Actions CI/CD, secret-file imports, and DR runbooks

## Local prerequisites

- JDK 25
- Internet access for Maven dependency download on first build

## Environment setup

1. Copy `.env.example` values into your shell or IDE run configuration.
2. Set `OPENAI_API_KEY` for OpenAI, or `HUGGINGFACE_API_KEY` for the Hugging Face router, before calling any AI-backed flow.
3. Use `local` for H2 development, `prod` for PostgreSQL, or `mysql` for MySQL.
4. Enable any `SIMULATION_INTEGRATIONS_*_ENABLED=true` channel you want to sync into the simulation context and API.
5. Set matching `SIMULATION_INTEGRATIONS_*_API_KEY` values before enabling live outbound sync.
6. Tune `SIMULATION_DECISION_*` vars if you want a different prompt version, retry count, or fallback model.
7. Enable `SIMULATION_APPROVAL_ENABLED=true` to block risky actions until a human approves, rejects, or overrides them.
8. Leave `SIMULATION_ASYNC_ENABLED=true` if you want autonomous simulations to continue in the background via scheduled job polling.

### Slack / HubSpot / Stripe template

```powershell
$env:SIMULATION_INTEGRATIONS_MESSAGING_ENABLED="true"
$env:SIMULATION_INTEGRATIONS_MESSAGING_ENDPOINT="https://hooks.slack.com/services/replace/me"

$env:SIMULATION_INTEGRATIONS_CRM_ENABLED="true"
$env:SIMULATION_INTEGRATIONS_CRM_API_KEY="pat-xxxx"
$env:SIMULATION_INTEGRATIONS_CRM_ENDPOINT="https://api.hubapi.com/crm/v3/objects/companies"

$env:SIMULATION_INTEGRATIONS_PAYMENTS_ENABLED="true"
$env:SIMULATION_INTEGRATIONS_PAYMENTS_API_KEY="sk_test_xxxx"
$env:SIMULATION_INTEGRATIONS_PAYMENTS_ENDPOINT="https://api.stripe.com/v1/payment_intents"
```

### Hugging Face LLM template

```powershell
$env:HUGGINGFACE_API_KEY="hf_xxxx"
$env:HUGGINGFACE_BASE_URL="https://router.huggingface.co/v1"
$env:HUGGINGFACE_CHAT_MODEL="openai/gpt-4.1-mini"
```

The app maps `HUGGINGFACE_*` variables onto the existing `spring.ai.openai.*` client, so you do not need separate code changes to switch providers.

## Run

```powershell
.\mvnw.cmd spring-boot:run
```

Run against PostgreSQL:

```powershell
$env:SPRING_PROFILES_ACTIVE="prod"
$env:DB_URL="jdbc:postgresql://localhost:5432/aiautonomouscompanysimulator"
$env:DB_USERNAME="app_user"
$env:DB_PASSWORD="change-me"
.\mvnw.cmd spring-boot:run
```

Run against MySQL:

```powershell
$env:SPRING_PROFILES_ACTIVE="mysql"
$env:DB_URL="jdbc:mysql://localhost:3306/aiautonomouscompanysimulator?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
$env:DB_USERNAME="app_user"
$env:DB_PASSWORD="change-me"
.\mvnw.cmd spring-boot:run
```

## Docker

Build the image:

```powershell
docker build -t ai-autonomous-company-simulator .
```

Run the container:

```powershell
docker run --rm -p 8080:8080 --name ai-company-sim ai-autonomous-company-simulator
```

Run with env overrides:

```powershell
docker run --rm -p 8080:8080 `
  -e SIMULATION_AI_ENABLED=false `
  -e OPENAI_API_KEY=your_key `
  --name ai-company-sim `
  ai-autonomous-company-simulator
```

Production-style Compose stack:

```powershell
docker compose -f compose.prod.yaml up -d --build
```

## Useful URLs

Local profile uses `http://localhost:8081` for both the app and actuator endpoints.

- App: `http://localhost:8081`
- Health: `http://localhost:8081/actuator/health`
- Liveness: `http://localhost:8081/actuator/health/liveness`
- Readiness: `http://localhost:8081/actuator/health/readiness`
- Metrics: `http://localhost:8081/actuator/metrics`
- Prometheus: `http://localhost:8081/actuator/prometheus`
- H2 console: `http://localhost:8081/h2-console` (`local` profile only)
- Integrations: `http://localhost:8081/api/integrations`
- Manual sync: `POST http://localhost:8081/api/integrations/simulations/{simulationId}/sync`
- Async start: `POST http://localhost:8081/api/simulations/start/async`
- Job status: `GET http://localhost:8081/api/simulations/jobs/{jobId}`
- Decision audit: `GET http://localhost:8081/api/audit/decisions?simulationId={simulationId}`

## Local test flow

1. Start the app.
2. Create a simulation:

```powershell
curl.exe -X POST http://localhost:8081/api/simulations/start `
  -H "Content-Type: application/json" `
  -d "{\"simulationId\":\"live-int-1\",\"goal\":\"Validate live integrations\",\"scenario\":\"medium\"}"
```

3. Trigger a manual provider sync:

```powershell
curl.exe -X POST http://localhost:8081/api/integrations/simulations/live-int-1/sync
```

4. Inspect sync status:

```powershell
curl.exe http://localhost:8081/api/integrations/simulations/live-int-1

## IntelliJ local run note

If IntelliJ says the app started but `http://localhost:8081` does not open, check whether an older `java.exe` process is still holding port `8081`.

```powershell
netstat -ano | findstr :8081
tasklist /FI "PID eq <pid>" /V
taskkill /PID <pid> /F
```
```

## Provider notes

- Slack: use an Incoming Webhook URL in `SIMULATION_INTEGRATIONS_MESSAGING_ENDPOINT`.
- HubSpot: use a private app token in `SIMULATION_INTEGRATIONS_CRM_API_KEY`.
- Stripe: use a secret key in `SIMULATION_INTEGRATIONS_PAYMENTS_API_KEY`; the adapter creates a PaymentIntent-style request using the latest simulated revenue.

## LLM decisioning

- Agent decisions now use structured LLM output when `SIMULATION_AI_ENABLED=true` and either an OpenAI key or Hugging Face router key is present.
- Tool calling is enabled so the model can inspect operational summary, valid actions, and guardrails before choosing an action.
- Each action stores prompt version, model, retry count, token usage, estimated cost, confidence, and fallback status.
- If the model fails validation or the API call fails, the runtime falls back to the existing rule-based action.

## Approval workflow

- When approval mode is enabled, risky actions are moved into a review queue and the simulation status becomes `WAITING_APPROVAL`.
- Review queue: `GET /api/approvals/simulations/{simulationId}`
- Approve: `POST /api/approvals/{approvalId}/approve`
- Reject: `POST /api/approvals/{approvalId}/reject`
- Override: `POST /api/approvals/{approvalId}/override`
- If `SIMULATION_APPROVAL_SECURITY_ENABLED=true`, approval endpoints require Basic Auth roles for operator, approver, and admin users.

## Async execution

- `POST /api/simulations/start/async` enqueues an autonomous run and returns immediately with a job id.
- The scheduled worker polls due jobs from the database, executes one simulation step per cycle, and re-queues the job until the simulation reaches a terminal state.
- Failed executions move to `RETRY` with backoff; after `SIMULATION_ASYNC_MAX_RETRIES`, the job becomes `FAILED`.
- If a simulation enters `WAITING_APPROVAL`, the job remains parked and the worker checks it again later so execution can resume after approval.

## Observability

- Console logging is structured by default via `LOGGING_STRUCTURED_FORMAT_CONSOLE=logstash`, which includes MDC fields like `simulationId` and trace ids.
- Prometheus-ready metrics are exposed under `/actuator/prometheus`, including decision counts, token usage, AI cost, job status transitions, and failure counters.
- Micrometer tracing is enabled with configurable sampling via `MANAGEMENT_TRACING_SAMPLING_PROBABILITY`.
- Decision audit records are stored in the database so agent decisions, retries, token usage, confidence, and fallback reasons remain queryable after runtime.
- Failure alerts currently emit high-severity structured log entries for repeated job failures, HTTP 5xx paths, and high AI-cost decisions; wire your log pipeline or alert manager on top of these signals.

## Deployment And Operations

- `compose.prod.yaml` provides a production-style local stack with PostgreSQL, health checks, and Docker secrets mounted into `/run/secrets`.
- `k8s/` contains baseline Kubernetes manifests for config, secrets, deployment, and service. The app imports secret files using Spring `configtree` in `prod`/`mysql` profiles.
- `.github/workflows/ci-cd.yml` runs tests on push/PR, builds and pushes a container to GHCR on `main`, and publishes rendered manifests as an artifact.
- Readiness now checks DB, disk, and worker staleness through `deploymentReadinessHealthIndicator`, not just a trivial `UP`.
- `ops/disaster-recovery.md`, `ops/backup-postgres.ps1`, and `ops/restore-postgres.ps1` provide the baseline DR story for backup, restore, and failover verification.

## Secrets

- For containers/Kubernetes, prefer file-mounted secrets with filenames matching Spring property keys, for example:
  - `spring.datasource.password`
  - `spring.ai.openai.api-key`
  - `simulation.security.webhook.secret`
- `application-prod.properties` and `application-mysql.properties` import `/run/secrets/` automatically via `spring.config.import=optional:configtree:/run/secrets/`.

## Debugging

- Integration sync results are stored in the simulation response under `integrations`.
- Successful syncs log at `INFO`; failed syncs log at `WARN`.
- If a provider is enabled but missing endpoint or credentials, the sync result will be `FAILED` and the summary will describe the missing requirement.

## Production database notes

- Hibernate auto-DDL is disabled; schema changes must go through Flyway migrations.
- `SimulationEntity` now uses optimistic locking so concurrent updates fail fast with HTTP `409` instead of silently overwriting state.
- Retention cleanup can be enabled with `SIMULATION_PERSISTENCE_RETENTION_ENABLED=true`; audit logs and snapshots are purged on the configured cron schedule.
- Indexes are created for tenant/time and tenant/simulation lookup paths used by analytics and audit APIs.
- Backups are still an infrastructure concern: use managed PostgreSQL/MySQL automated backups plus PITR/snapshot policy outside the app before going live.
