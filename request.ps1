param([string]$url)
if(!$url) {
    echo "please pass some url"
    exit
    }
for($i=1; $i -le 2241; $i++){
Invoke-WebRequest -Uri $url
}
for($i=1; $i -le 2445; $i++){
Invoke-WebRequest -Uri $url/first
}
for($i=1; $i -le 2320; $i++){
Invoke-WebRequest -Uri $url/second
}
for($i=1; $i -le 1010; $i++){
Invoke-WebRequest -Uri $url/third
}
for($i=1; $i -le 1936; $i++){
Invoke-WebRequest -Uri $url/fourth
}
for($i=1; $i -le 2526; $i++){
Invoke-WebRequest -Uri $url/fifth
}
for($i=1; $i -le 3647; $i++){
Invoke-WebRequest -Uri $url/sixth
}