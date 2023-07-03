import { Application, Request, Response } from "express";
import { getServerDataToExcelController } from "../controller/reports";

export class ReportRoutes {
  public route(app: Application) {
    app.get("/report/servers", async function (req: Request, res: Response) {
      await getServerDataToExcelController(req, res);
    });
  }
}
