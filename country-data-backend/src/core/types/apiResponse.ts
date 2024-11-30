import { Country } from "./country";

export type APIResponse = {
  status: number,
  data: string | Country | Country[],
}