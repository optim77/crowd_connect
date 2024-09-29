# Używamy obrazu oficjalnego Pythona jako podstawy
FROM python:3.12-slim

# Ustaw zmienną środowiskową, aby nie tworzyć plików .pyc
ENV PYTHONDONTWRITEBYTECODE 1

# Ustaw zmienną środowiskową, aby buforowanie logów było wyłączone (w trybie produkcyjnym)
ENV PYTHONUNBUFFERED 1

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj plik requirements.txt (jeśli istnieje) do kontenera
COPY requirements.txt /app/

# Zainstaluj zależności
RUN pip install --upgrade pip && pip install -r requirements.txt

# Skopiuj cały projekt do katalogu roboczego w kontenerze
COPY . /app/

# Uruchom migracje oraz serwer (możesz to dostosować w zależności od potrzeb)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
