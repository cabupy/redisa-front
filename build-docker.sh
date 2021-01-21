#/bin/sh
cd /home/cabu/redisa-front
docker build . -t cabupy/redisa-front:latest
docker image tag cabupy/redisa-front:latest cabupy/redisa-front:latest
docker image push cabupy/redisa-front:latest
