FROM python:3.10 as build-python

# Update the package list and install required dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/* \

COPY ./requirements.txt ./fc_api/
COPY . /fc_api

WORKDIR ./fc_api

RUN pip install -r requirements.txt

EXPOSE 8000:8000
ENV PORT 8000
