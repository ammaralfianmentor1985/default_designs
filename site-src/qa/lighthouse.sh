#!/bin/bash
# Lighthouse on every page, several runs each (one run is noise), mobile emulation with simulated Slow 4G.
#   npm install --prefix /tmp/lh lighthouse@12
#   CHROME_PATH=/path/to/chrome node site-src/qa/serve.mjs &        # http://localhost:8802/default_designs/
#   site-src/qa/lighthouse.sh http://localhost:8802/default_designs 3 /tmp/lh-runs
#   node site-src/qa/lighthouse-report.mjs /tmp/lh-runs
# Set LIGHTHOUSE to the lighthouse binary if it is not on the PATH.
BASE=${1:-http://localhost:8802/default_designs}; RUNS=${2:-3}; OUT=${3:-lh-runs}
LH=${LIGHTHOUSE:-lighthouse}
mkdir -p "$OUT"
for page in "" annies-villa/ laviana-bungalow/ location/ long-term/ faq/; do
  name=${page%/}; name=${name:-home}
  for i in $(seq 1 "$RUNS"); do
    $LH "$BASE/$page" --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
      --only-categories=performance,accessibility,best-practices,seo \
      --output=json --output-path="$OUT/$name-$i.json" --quiet >/dev/null 2>&1
  done
done
echo "done: $OUT"
