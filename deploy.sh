set -ex

# Set constants
REGION="asia-northeast2"
FUNCTION_NAME="get-puppeteer-screenshot"

# Deploy the Google Cloud Function
gcloud beta functions deploy ${FUNCTION_NAME} \
  --runtime nodejs10 \
  --region ${REGION} \
  --trigger-http \
  --allow-unauthenticated \
  --memory 2GB \
  --entry-point main \
  --timeout=100s
