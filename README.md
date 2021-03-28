# knit-works
A project by Matthew Borden Jardine and Olivia Heather Ramharacksing Ruiz-Knott.

## To start

Clone the project:
```
git clone https://github.com/BordenJardine/knit-works.git
cd knit-works
```

### Without Docker
Install the dependencies:
```
npm install
```

Start the server:
```
npm start
```

See it in browser:
http://localhost:8080/

### With Docker
Build the image:
```
docker build -t knitworks:1.0 .
```

Start the container:
```
docker run -p 5000:8080 knitworks:1.0
```

See it in browser:
http://localhost:5000/
