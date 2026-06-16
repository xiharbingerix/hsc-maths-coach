# Nova Maths CAS service — slim, single-process FastAPI + SymPy.
FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Install runtime deps first for better layer caching (no test deps in the image).
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# App code.
COPY app.py .
COPY cas ./cas

# Run as non-root.
RUN useradd --create-home appuser
USER appuser

EXPOSE 8080

# Single worker; FastAPI runs the sync /equiv handler in a threadpool, so
# concurrent marking calls still run in parallel. Bump --workers only if a
# larger machine is provisioned (each worker re-imports SymPy ~120MB).
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]
