import { Employee } from "@prisma/client";
import axios from "axios";

async function fetchSearchResult(searchTerm?: string) {
  try {
    if (!searchTerm) {
      const data = await axios.get(`/api/admin/employee/`);
      return data.data;
    } else {
      const data = await axios.get(`/api/admin/employee/?term=${searchTerm}`);
      return data.data;
    }
  } catch (error: any) {
    return error.message;
  }
}
export default fetchSearchResult;
