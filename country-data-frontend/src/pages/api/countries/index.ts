import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_URL = `${process.env.API_URL}/countries`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page = 1 } = req.query;

  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    res.status(200).json(response.data);
  } catch (error: any) {
    res
      .status(error.response?.status || 500)
      .json({ error: error.message || "Something went wrong" });
  }
}
