.PHONY: format lint sort check all

# Format code using black
format:
	black .

# Sort imports using isort
sort:
	isort .

# Lint using ruff
lint:
	ruff check .

# Auto-fix lint and import issues using ruff
fix:
	ruff check . --fix

# Run all checks (no fixes)
check: format sort lint

# Run everything including autofixes
all: format sort fix
