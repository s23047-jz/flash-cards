import { NavigationProp } from "@react-navigation/native";

import { ROUTES } from "../constants/";
import { ActiveUser } from "../services/user";

type QueryParams = {
  [key: string]: string | number | boolean | null | undefined;
};

function encodeQuery(params: QueryParams): string {
  return Object.keys(params)
    .map((key) => {
      const value = params[key];
      if (value === undefined || value === null) {
        return "";
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .filter((part) => part.length > 0)
    .join("&");
}

const redirectIfNotAuthenticated = async (
  res: Response,
  navigation: NavigationProp<any>,
) => {
  if (res.status === 401) {
    await ActiveUser.clean();
    navigation.navigate(ROUTES.LOGIN);
  }
  if (res.status === 403) {
    navigation.navigate(ROUTES.HOME);
  }
};

export const request = async ({
  url,
  query,
  headers = {},
  method = "GET",
  body,
  formData,
  skipRedirect = false,
  navigation,
}: {
  url: string;
  query?: object;
  headers?: Record<string, string>;
  method?: string;
  body?: object;
  formData?: FormData;
  skipRedirect?: boolean;
  navigation?: NavigationProp<any>;
}) => {
  const methodLower: string = method.toLowerCase();
  const jsonMethods: string[] = ["post", "put", "patch", "delete", "get"];

  if (!jsonMethods.includes(methodLower)) return;

  if (body) {
    body = JSON.stringify(body);
  }
  if (formData) {
    body = formData;
  }

  const token = await ActiveUser.getAuthorization();

  if (token) headers.Authorization = token;
  headers["Content-Type"] = "application/json";

  if (query) url = `${url}?${encodeQuery(query)}`;

  const res: Response = await fetch(url, {
    method,
    headers,
    body,
  });
  if (!skipRedirect) {
    await redirectIfNotAuthenticated(res, navigation);
  }

  const contentType: string | null = res.headers.get("content-type");
  if (contentType && contentType !== "application/json") {
    return {
      res,
      data: {},
      headers: res.headers,
    };
  }

  const data = await res.json();

  return {
    res,
    data,
    headers: res.headers,
  };
};
