
import express, { Application, json, Request, Response, urlencoded } from "express";
import cors, { CorsOptions } from "cors";
import helmet, {hsts}  from "helmet";
import { join } from "path";
import { StatusCodes } from "http-status-codes";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import morgan from "morgan";
import http from 'http';
// import cookieParser  from 'cookie-parser';
// import swaggerUi from 'swagger-ui-express';

// import * as swaggerDocument from './swagger.json';

// import { i18n } from "./config/i18n.config";
import API_ROUTER from "./routes";
import { errorHandler } from "./middlewares";
// import { SocketServer } from "socket/socket";

export class RestServer {
    private readonly _app: Application;
    private server: http.Server = new http.Server();

    private readonly corsOptions: CorsOptions = {
        allowedHeaders: [
          'Origin',
          'X-Requested-With',
          'Content-Type',
          'Accept',
          'Authorization',
          'locale',
          'device'
        ],
        methods: 'GET,HEAD,OPTIONS,PUT,POST,DELETE',
        origin: ["http://localhost:3000"],
        preflightContinue: false,
        optionsSuccessStatus: 200,
        credentials: true
      };

    private readonly strictTranspostPolicyOptions = {
      maxAge: 31536000, // one year
      includeSubDomains: true,
      preload: true
    }

    private readonly contentSecurityPolicy = {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'trusted-scripts.com'],
        styleSrc: ["'self'", 'trusted-styles.com'],
        // Add other directives based on your app's needs
      },
    }
    
    constructor() {
        this._app = express();
        this.init();
    }

    private init() {
         /** Log generate */
        this.logGenerate();

        this._app.use(json({limit: "10mb"}));
        this._app.use(urlencoded({extended: true, limit: "10mb"}));
        this._app.use(cors(this.corsOptions));
        // this._app.use(cookieParser())
        this._app.use(helmet.contentSecurityPolicy(this.contentSecurityPolicy));

        //enable only in production it allow application to run in HTTPS only
        this._app.use(hsts(this.strictTranspostPolicyOptions));
        
        // this._app.use(i18n);
        this._app.set('etag', false);

        if(process.env.ENV == 'production') {
            this._app.set('trust proxy', 1);
        }

        this._app.use(express.static('src/public'));
        this._app.use('/apidoc', express.static(join(__dirname, '..', 'apidoc')));
        this._app.use('/api', API_ROUTER);

        this._app.use(errorHandler);
        this._app.use(this.routeNotFoundError);

        this.server = http.createServer(this._app);
        // new SocketServer(this.server);
        // configureSocket(this.server);
    }

    private routeNotFoundError = (req: Request, res: Response) => {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: `[${req.method}] route not found`,
        });
    }

    private logGenerate() {
        const curDate = new Date();
        const logFileName = `${curDate.getMonth()+1}_${curDate.getDate()}_${curDate.getFullYear()}`;
        if(!existsSync('./log')) {
          mkdirSync('./log');
        }
        const logStream = createWriteStream(join(__dirname, `/../log/${logFileName}.log`), {flags: 'a'});
        this._app.use(morgan('combined', {stream: logStream}));
    }

    public async startServer(PORT: number , ENV: string) {
      this.server.listen(PORT, () => {
        console.info('HTTP server is running on PORT: ' + PORT + '\n Environment: ' + ENV)
      });
    }   
}     