import axios from "axios";

async function fetchRequests(searchTerm?: string) {
  try {
    if (!searchTerm) {
      const data = await axios.get(`/api/admin/requests/`);

      return data.data;
    } else {
      const data = await axios.get(
        `/api/admin/requests/?term=${searchTerm}`
      );
      return data.data;
    }
  } catch (error: any) {
    return Promise.reject(error);
  }
}
export default fetchRequests;
