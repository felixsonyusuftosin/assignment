import axios from "axios"

export const axiosConfigurations = {
  method: "get",
  responseType: "json",
  responseEncoding: "utf8",
  validateStatus: (status) => status < 400 || status === 404,
}

const useRequest = async (rest = {}) => {
  try {
    const { data, status } = await axios({
      ...axiosConfigurations,
      url,
      ...rest,
    })
    if (status === 404) {
      // we assume all 404 requests returns null so we will pass null
      // users should set a default value to avoid accessing null values
      return null
    }
    // TODO should possibly update this part to accommodate for other none json response types
    return data.data
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response
      return { error: data, status }
    } else if (error.request) {
      return { error: data, status }
    } else {
      return { error: error.message, status: 500 }
    }
  }
}

export default useRequest