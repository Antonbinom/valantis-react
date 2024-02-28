import axios from "axios";
import md5 from "md5";

export const fetchData = async (action: string, params: any) => {
  try {
    const apiUrl = "http://api.valantis.store:40000/";
    const password = "Valantis";
    const xAuthToken = generateXAuthToken(password);

    function generateXAuthToken(password: string) {
      const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const authString = `${password}_${timestamp}`;
      return md5(authString);
    }

    const dateRange = {
      action,
      params,
    };

    const header = {
      headers: {
        "X-Auth": xAuthToken,
        "Content-Type": "application/json",
      },
    };

    let response;
    try {
      response = await axios.post(apiUrl, dateRange, header);

      return response;
    } catch (error) {
      if (!response) {
        console.log(`${error.message}. Retrying in 3 seconds...`);
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
