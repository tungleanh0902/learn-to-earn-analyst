import axios from "axios";
import { BASE_URL } from "~/constants";

export const getVotes = async (fruit: string) => {
  let result = await axios.get(`${BASE_URL}/getVotes?fruit=${fruit}`);
  return result.data;
};

export const voteForFruit = async (transactionMeta: any, address: string, message: any, signature: string) => {
  try {
    let result = await axios.post(`${BASE_URL}/voteForFruit`, {
      transactionMeta, address, message, signature
    });
    return result.data
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.error.message
    }
  }
};
