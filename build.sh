#!/bin/bash

echo "building UI"
npm run build /Users/dani/projects/attenborough

echo "transferring build to server"
scp -C -r /Users/dani/projects/attenborough/build ubuntu@192.168.1.10:/tmp/build

echo "ssh'ing to server"
ssh -T ubuntu@192.168.1.10 << EOF
  echo "emptying /opt/cenozoa/ui"
  sudo rm -r /opt/cenozoa/ui
  echo "moving build directory"
  sudo mv /tmp/build /opt/cenozoa/ui
  echo "docker kill ui nginx"
  sudo docker kill nginx
  echo "docker run nginx"
  sudo docker run -v /opt/cenozoa/nginx.conf:/etc/nginx/conf.d/default.conf -v /opt/cenozoa/.htpasswd:/etc/apache2/.htpasswd -v /opt/cenozoa/.supasswd:/etc/apache2/.supasswd -v /opt/cenozoa/.senpasswd:/etc/apache2/.senpasswd -v /etc/letsencrypt:/etc/ssl/letsencrypt -v /opt/cenozoa/ui:/www -p 443:443 -p 80:80 --network=cenozoanet --name=nginx --rm -d nginx
EOF
