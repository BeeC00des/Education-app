const incomingApp = require('./backend/app');
const http = require ('http');
const debug = require('debug')('node-angular');


const normalizePort = val => {
    var port = parseInt(val, 10);
    if(isNaN(port)){
        //name piped
        return val;
    }
    if (port >= 0){
        //name port
        return port
    }

    return false
}

const onError = error =>{
    if (error.syscall !== "listen"){
        throw error
    }

    const bind = typeof addr === "string" ? "pipe" + addr :"port" + port;
    switch(error.code){
        case "EACCES":
            console.error(bind + "require elevated priviledges")
            process.exit(1)
            break;

        case "EADDINUSE":
            console.error(bind + " is already in use")
            process.exit(1)
            break;

        default:
            throw error
    }
}

const onlistening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
    debug ('listening on ' + bind)
}


const port = normalizePort(process.env.PORT || "3000");

incomingApp.set('port', port)

const server = http.createServer(incomingApp);

server.on("error", onError);
server.on("listening", onlistening);
server.listen(port);

