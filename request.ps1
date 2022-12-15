param([string]$url)
if(!$url) {
    echo "please pass some url"
    exit
    }
for($i=1; $i -le 20; $i++){
Invoke-WebRequest -Uri $url
}
for($i=1; $i -le 20; $i++){
Invoke-WebRequest -Uri $url/book
}

