import { failureResponse } from "../services/common/service";
import { Request, Response } from "express";
import {
  GetOAuthAccessTokenRequest,
  getOAuthAccessToken,
} from "cloudways-js-client";
import { getServersList } from "cloudways-js-client";
import { Parser } from "json2csv";

export async function getServerDataToExcelController(
  req: Request,
  res: Response
) {
  try {
    const params: GetOAuthAccessTokenRequest = {
      email: process.env.CLOUDWAYS_EMAIL as string,
      api_key: process.env.CLOUDWAYS_API_KEY as string,
    };

    await getOAuthAccessToken(params);
    const response = await getServersList();
    const json2csvParser = new Parser();
    if (!response.status) {
      return failureResponse("No server information avaliable", {}, res);
    }
    const csv = json2csvParser.parse(response.servers);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=servers.csv");
    return res.status(200).end(csv);
  } catch (error) {
    if (error instanceof Error) {
      return failureResponse(error.message, error, res);
    }
    return failureResponse("Something went wrong", error, res);
  }
}
