import { API_HOST } from "@.env"
console.log("API_HOST", API_HOST)

export const BASE_API = API_HOST || "localhost:8080/api";
