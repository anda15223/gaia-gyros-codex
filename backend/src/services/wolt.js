import axios from "axios";

const WOLT_BASE_URL = "https://merchant-api.wolt.com/v1";

export async function getLiveOrders() {
  const token = process.env.WOLT_TOKEN;

  if (!token) {
    throw new Error("WOLT_TOKEN is not set");
  }

  const response = await axios.get(`${WOLT_BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}
