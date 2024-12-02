import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, capital, region } = req.query;

  try {
    const response = await axios.get("http://localhost:3001/countries/search", {
      params: { name, capital, region },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error searching countries:", error);
    res.status(500).json({ error: "Failed to search countries" });
  }
}
