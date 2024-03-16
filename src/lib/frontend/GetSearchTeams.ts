import { Employee } from "@prisma/client";
import axios from "axios";

async function fetchSearchTeamsResult(searchTerm?: string) {
  try {
    if (!searchTerm) {
      const data = await axios.get(`/api/admin/teams/`);
      return data.data;
    } else {
      const data = await axios.get(`/api/admin/teams/?term=${searchTerm}`);
      return data.data;
    }
  } catch (error: any) {
    return error.message;
  }
}
export default fetchSearchTeamsResult;
