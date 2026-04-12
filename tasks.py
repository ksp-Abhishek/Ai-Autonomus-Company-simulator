"""Benchmark task registry for OpenEnv validator compatibility."""

TASKS = [
    {
        "id": "companiesim_growth_001",
        "task_id": "companiesim_growth_001",
        "title": "Revenue Growth Sprint",
        "difficulty": "easy",
        "description": "Maximize revenue and user growth while avoiding bankruptcy.",
        "grader": {"name": "revenue_growth", "metric": "revenue_growth_pct", "weight": 0.5},
        "graders": [
            {"name": "revenue_growth", "metric": "revenue_growth_pct", "weight": 0.5},
            {"name": "user_growth", "metric": "active_user_growth_pct", "weight": 0.3},
            {"name": "capital_safety", "metric": "capital_non_negative", "weight": 0.2},
        ],
    },
    {
        "id": "companiesim_efficiency_002",
        "task_id": "companiesim_efficiency_002",
        "title": "Cost Efficiency Run",
        "difficulty": "medium",
        "description": "Reduce operational cost while maintaining satisfaction and quality.",
        "grader": {"name": "cost_reduction", "metric": "operational_cost_reduction_pct", "weight": 0.45},
        "graders": [
            {"name": "cost_reduction", "metric": "operational_cost_reduction_pct", "weight": 0.45},
            {"name": "satisfaction_floor", "metric": "min_customer_satisfaction", "weight": 0.35},
            {"name": "quality_floor", "metric": "min_product_quality", "weight": 0.2},
        ],
    },
    {
        "id": "companiesim_balanced_003",
        "task_id": "companiesim_balanced_003",
        "title": "Balanced Strategy Challenge",
        "difficulty": "hard",
        "description": "Balance growth, retention, and risk under uncertainty.",
        "grader": {"name": "normalized_reward", "metric": "episode_normalized_reward", "weight": 0.4},
        "graders": [
            {"name": "normalized_reward", "metric": "episode_normalized_reward", "weight": 0.4},
            {"name": "retention_proxy", "metric": "retained_user_ratio", "weight": 0.3},
            {"name": "bankruptcy_avoidance", "metric": "bankruptcy_avoidance", "weight": 0.3},
        ],
    },
]


def get_tasks():
    return TASKS
