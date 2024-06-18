import {ActiveUser} from "../services/user";

export const redirectIfNotAuthenticated = (res: Response) => {
    if (res.status === 401) {
        ActiveUser.clean();
    }
    if (res.status === 403) {
    }
};

export const request = async ({
                                  url,
                                  query,
                                  headers = {},
                                  method = "GET",
                                  body,
                                  formData,
                                  skipRedirect = false
                              }: {
    url: string;
    query?: object;
    headers?: Record<string, string>;
    method?: string;
    body?: object;
    formData?: FormData;
    skipRedirect?: boolean;
}) => {
    const methodLower: string = method.toLowerCase();
    const jsonMethods: string[] = ["post", "put", "patch", "delete", "get"];

    if (!jsonMethods.includes(methodLower)) return;

    if (body) {
        // @ts-ignore
        body = JSON.stringify(body);
    }
    if (formData) {
        body = formData;
    }
    const token = ActiveUser.getAuthorization();

    if (token) headers.Authorization = token;
    headers["content-type"] = 'application/json';
    // if (query) url = `${url}?${decode(query)}`;
    console.log(url);
    const res: Response = await fetch(url, {
        method,
        headers,
        // @ts-ignore
        body
    });

    if (!skipRedirect) {
        redirectIfNotAuthenticated(res);
    }

    const contentType: string | null = res.headers.get('content-type');
    if (contentType && contentType !== 'application/json') {
        return {
            res,
            data: {},
            headers: res.headers
        };
    }

    if (!res.ok) {
        const errorData = await res.json();
        const error = new Error('Request failed');
        // @ts-ignore
        error.response = {status: res.status, data: errorData};
        throw error;
    }

    const data = await res.json();

    return {
        res,
        data,
        headers: res.headers
    };
};
