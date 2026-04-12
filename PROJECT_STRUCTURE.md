# Project Structure

- `inference.py`:
  Root benchmark entrypoint used for submission checks.
- `ml/artifacts/`:
  Local OpenEnv app + model artifacts used for simulator/runtime work.
- `hf-space-sync/`:
  Hugging Face Space deployable repo mirror.
- `src/`:
  Spring Boot application source.
- `frontend/`:
  Frontend source assets.
- `k8s/`, `ops/`:
  Deployment and ops configs.
- `logs/`:
  Local runtime logs.
