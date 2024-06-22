FROM python:3.10

# Update the package list and install required dependencies
RUN apt-get update -y && \
    apt-get install -y cmake && \
    apt-get install git -y && \
    apt-get install ffmpeg libavcodec-extra -y

RUN python -m pip install --upgrade pip

COPY ./requirements.txt ./fc_api/
COPY ./docker-entrypoint.sh ./fc_api/
COPY ./setup.py ./fc_api/

COPY . /fc_api
WORKDIR ./fc_api

RUN mkdir -p /media
RUN python -m pip install --upgrade pip
RUN pip install setuptools==65.5.0 wheel
RUN make dev_install

EXPOSE 8000
ENV PORT 8000
