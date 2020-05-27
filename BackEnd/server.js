const http = require('http');

const port = 3000;

const requestHandler = (request, response) => {
    let body = '';
    if (request.method === "POST"){
        request.on("data", chunk => {
            body += chunk.toString();
        });
        request.on("end", ()=>{
            let parsedResult = JSON.parse(body);
            if(parsedResult.body.id){
                response.end("It's not simple");
            }else {
                response.end("It's simple");
            }
        });

    }
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
})