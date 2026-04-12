"""OpenEnv grader implementations used by task and manifest metadata."""


def _to_float(value, default: float = 0.0) -> float:
    try:
        return float(value)
    except Exception:
        return float(default)


def _clamp_01(value: float) -> float:
    return max(0.0, min(1.0, _to_float(value, 0.0)))


def _percent_to_unit(value, default: float = 0.0) -> float:
    return _clamp_01(_to_float(value, default) / 100.0)


def revenue_growth(state: dict) -> float:
    return _clamp_01(state.get("revenue_growth_pct", 0.0))


def user_growth(state: dict) -> float:
    return _clamp_01(state.get("active_user_growth_pct", 0.0))


def capital_safety(state: dict) -> float:
    return 1.0 if _to_float(state.get("capital_non_negative", 0.0)) > 0.0 else 0.0


def cost_reduction(state: dict) -> float:
    return _clamp_01(state.get("operational_cost_reduction_pct", 0.0))


def satisfaction_floor(state: dict) -> float:
    return _percent_to_unit(state.get("min_customer_satisfaction", 0.0))


def quality_floor(state: dict) -> float:
    return _percent_to_unit(state.get("min_product_quality", 0.0))


def normalized_reward(state: dict) -> float:
    return _clamp_01(state.get("episode_normalized_reward", 0.0))


def retention_proxy(state: dict) -> float:
    return _clamp_01(state.get("retained_user_ratio", 0.0))


def bankruptcy_avoidance(state: dict) -> float:
    return 1.0 if _to_float(state.get("bankruptcy_avoidance", 0.0)) > 0.0 else 0.0


GRADERS = {
    "revenue_growth": revenue_growth,
    "user_growth": user_growth,
    "capital_safety": capital_safety,
    "cost_reduction": cost_reduction,
    "satisfaction_floor": satisfaction_floor,
    "quality_floor": quality_floor,
    "normalized_reward": normalized_reward,
    "retention_proxy": retention_proxy,
    "bankruptcy_avoidance": bankruptcy_avoidance,
}
