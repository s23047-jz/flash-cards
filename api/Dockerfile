FROM python:3.10 as build-python

# Update the package list and install required dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends && \
    apt-get install ffmpeg -y

COPY ./requirements.txt ./fc_api/

COPY ./docker-entrypoint.sh ./fc_api/

COPY . /fc_api
WORKDIR ./fc_api

RUN mkdir -p /media
RUN python -m pip install --upgrade pip
RUN pip install setuptools==65.5.0 setuptools_scm==8.0.4 wheel
RUN pip install -r ./requirements.txt --default-timeout=300
RUN make dev_install

EXPOSE 8000
ENV PORT 8000
