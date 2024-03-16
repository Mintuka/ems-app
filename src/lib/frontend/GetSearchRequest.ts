import axios from "axios";

async function fetchTrackingTime(searchTerm?: string) {
  try {
    if (!searchTerm) {
      const data = await axios.get(`/api/admin/timetracking/`);

      return data.data;
    } else {
      const data = await axios.get(
        `/api/admin/timetracking/?term=${searchTerm}`
      );
      return data.data;
    }
  } catch (error: any) {
    return Promise.reject(error);
  }
}
export default fetchTrackingTime;
