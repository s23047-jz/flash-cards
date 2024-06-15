FROM python:3.10 as build-python

# Update the package list and install required dependencies
RUN apt-get update && apt-get install -y --no-install-recommends && sudo apt install ffmpeg

COPY ./requirements.txt ./fc_api/

COPY ./docker-entrypoint.sh ./fc_api/

COPY . /fc_api
WORKDIR ./fc_api

RUN mkdir -p /media

RUN make dev_install

EXPOSE 8000
ENV PORT 8000
