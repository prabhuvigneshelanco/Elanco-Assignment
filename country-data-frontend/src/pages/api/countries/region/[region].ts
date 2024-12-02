import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { region } = req.query;

  if (!region) {
    res.status(400).json({ error: "Region parameter is required" });
    return;
  }

  try {
    const response = await axios.get(
      `${process.env.API_URL}/countries/region/${region}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching region data:", error);
    res.status(500).json({ error: "Failed to fetch countries by region" });
  }
}
