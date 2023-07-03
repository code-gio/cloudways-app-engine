import * as express from "express";
import * as bodyParser from "body-parser";
const cors = require("cors");
import { CommonRoutes } from "../routes/common";

import { ReportRoutes } from "../routes/reports";

class App {
  public app: express.Application;
  private common_routes: CommonRoutes = new CommonRoutes();
  private report_routes: ReportRoutes = new ReportRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.report_routes.route(this.app);
    this.common_routes.route(this.app);
  }

  private async config(): Promise<void> {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors({ origin: true }));
  }
}

export default new App().app;
