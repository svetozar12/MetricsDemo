docker rm -f prometheus
docker build -t my-prometheus -f dockerfile.prometheus .
docker run --name prometheus -d -p 9090:9090 my-prometheus
docker run --name grafana -d -p 3001:3001 grafana/grafana-oss:latest