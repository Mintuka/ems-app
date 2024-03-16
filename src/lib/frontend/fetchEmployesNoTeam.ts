import { Employee, User } from "@prisma/client";
import axios from "axios";
import { promise } from "zod";

export default async function fetchEmployesNoTeam() {
  try {
    const data = await axios.get("/api/admin/teams/teamless");
    return data.data as Employee[];
  } catch (error) {
    return Promise.reject(error);
  }
}
