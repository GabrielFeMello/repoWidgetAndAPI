import express from 'express';
import routes from './routes'
import cors from 'cors'

class App {
  public server;

  constructor() {
    this.server = express();
    var allowedOrigins = [
      'https://localhost:3000',
      'https://localhost:3003',
      'https://localhost:3001',
      'http://localhost:3000',
      'http://localhost:3003',
      'http://localhost:3001',
      "https://repo-widget-and-api.vercel.app/",
      "http://repo-widget-and-api.vercel.app/"
    ];

    this.server.use(cors({
      origin: function(origin, callback){
        console.log("A ORIGIN É", origin)
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
          var msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      }
    }))
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;