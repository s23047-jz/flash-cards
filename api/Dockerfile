FROM python:3.10 as build-python

RUN apt-get -y update
COPY ./requirements.txt ./arp_api/
WORKDIR ./flash_card_api
RUN pip3 install -r requirements.txt

EXPOSE 8000:8000
ENV PORT 8000
