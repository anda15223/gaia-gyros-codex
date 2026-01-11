import axios from "axios";

export async function getTodayOrders() {
  const baseUrl = process.env.ONLINEPOS_BASE_URL;
  const token = process.env.ONLINEPOS_TOKEN;

  if (!baseUrl || !token) {
    throw new Error("ONLINEPOS_BASE_URL or ONLINEPOS_TOKEN is not set");
  }

  const response = await axios.get(`${baseUrl}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}
