import { User } from "@prisma/client";
import axios from "axios";

export default async function fetchGuests() {
  try {
    const data = await axios.get("/api/admin/employee/guest");
    return data.data as User[];
  } catch (error) {}
}
