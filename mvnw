#!/usr/bin/env bash
set -euo pipefail

if command -v mvn >/dev/null 2>&1; then
  exec mvn "$@"
fi

echo "Apache Maven (mvn) is not installed. Install it, or run with mvn available in PATH."
exit 1

