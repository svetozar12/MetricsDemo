docker rm -f prometheus
docker build -t my-prometheus -f dockerfile.prometheus .
docker run --name prometheus -d -p 9090:9090 my-prometheus