Instructions to run project

1) Clone the project

2) Build the backend docker image and run it using the below commands 
```
cd backend
docker build -t backend .
docker run -dp 3001:3001 backend
```

3) Build the frontend image and run it using the below commands
```
cd ../frontend
docker build -t frontend .
docker run -dp 3000:3000 frontend
```

4) Configure and run nginx 
```
sudo nano /etc/nginx/sites-available/default
```

Edit the following
```
server {
  listen 80;
  server_name www.student-8.sutdacademytools.net;


  location / {
    proxy_pass http://www.student-8.sutdacademytools.net:3000;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $host;
  }

}
```
Start nginx
```
sudo service nginx start
```

Possible vulnerabilities:
1) Man in the middle attack due to website running on http instead of https. 
Attackers can sniff packets being sent to and from the server and view the 
packet data as it is not encrypted. Furthermore there is no authorisation so 
attackers can freely change the data without the user knowing.

Possible fix can be to use https instead by setting up a certifcate for the website
so that data can be encrypted and attackers cannot sniff the data being sent. 
Setting up an authorisation page also allows us to create session tokens to prevent 
unauthorised packet sending.

2) Denial of service attacks is another vulnerability as the server has no logic to
handle if multiple requests are made and will be overloaded and crash. This prevents
the user from accessing the website and using it functionalities.

Possible mitigation methods is to use third party solutions such as Cloudflare to help 
mitigate such attacks, or set up redundant servers to takeover if one server goes down.