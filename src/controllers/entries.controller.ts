import axios from "axios";
import express, { Request, Response, Router } from "express";
import { ENTRIES_URL } from "../constants/env.constants";

export const entriesRouter = Router();

entriesRouter.get("/get-public-api", async (req: Request, res: Response) => {
  try {
    const { category, limit } = req.query;

    const response = await axios.get(`${ENTRIES_URL}`);

    let entries = response.data.entries;

    if (category && typeof category === "string") {
      entries = entries.filter(
        (entry: any) => entry.Category.toLowerCase() === category.toLowerCase()
      );
    }

    if (limit && !isNaN(Number(limit))) {
      entries = entries.slice(0, Number(limit));
    }

    return res.json({ count: entries.length, entries });
  } catch (error: any) {
    return res
      .status(500)
      .json({ code: 500, success: false, message: error.message });
  }
});
