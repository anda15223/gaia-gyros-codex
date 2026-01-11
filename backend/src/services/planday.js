import axios from "axios";

const PLANDAY_BASE_URL = "https://openapi.planday.com";

export async function getTodayShifts() {
  const token = process.env.PLANDAY_TOKEN;

  if (!token) {
    throw new Error("PLANDAY_TOKEN is not set");
  }

  const response = await axios.get(
    `${PLANDAY_BASE_URL}/scheduling/v1/shifts`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}

export async function getEmployees() {
  const token = process.env.PLANDAY_TOKEN;

  if (!token) {
    throw new Error("PLANDAY_TOKEN is not set");
  }

  const response = await axios.get(
    `${PLANDAY_BASE_URL}/hr/v1/employees`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}
