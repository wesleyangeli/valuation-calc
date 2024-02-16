import axios from "axios";

const API_KEY = "SUA_CHAVE_DE_API_ALPHA_VANTAGE";

export async function getCompanyOverview(symbol: string) {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao obter os dados da empresa:", error);
    return null;
  }
}
