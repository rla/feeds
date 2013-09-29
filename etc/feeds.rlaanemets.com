upstream feeds {
        server 127.0.0.1:3330;
}

server {

        root /home/feeds/feeds/public;
        index index.html index.htm;

        server_name feeds.rlaanemets.com;

        location ~ ^/(css|img|js|favicon.ico) {
                access_log off;
                expires max;
        }

        location / {
                proxy_pass http://feeds;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-NginX-Proxy true;
                proxy_redirect off;
        }

        location ~ /\. {
                deny all;
        }
}
