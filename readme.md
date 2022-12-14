docker build -t my-prometheus -f dockerfile.prometheus .
docker run -d -p 9090:9090 -v .\prometheus.yaml prom/prometheus
