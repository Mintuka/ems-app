import axios from "axios";

async function fetchSearchResult(searchTerm?: string) {
  try {
    if (!searchTerm) {
      const data = await axios.get(`/api/admin/tasks/`);
      return data.data;
    } else {
      const data = await axios.get(`/api/admin/tasks/?term=${searchTerm}`);
      return data.data;
    }
  } catch (error: any) {
    return error.message;
  }
}
export default fetchSearchResult;
