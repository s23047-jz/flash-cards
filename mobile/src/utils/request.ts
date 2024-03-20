import {ActiveUser} from "../services/user";
// TODO add querystring

// function decode(obj: object): string {
//     const keys = Object.keys(obj);
//     const keyValuePairs = keys.map(key => {
//         return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
//     });
//     return keyValuePairs.join('&');
// }

export const redirectIfNotAuthenticated = async (res: Response) => {
    if (res.status === 401) {
        await ActiveUser.clean()
        // TODO add redirect to login page
    }
    if (res.status === 403) {
        // TODO add redirect to home view for logged
    }
}

export const request = async({
    url,
    query,
    headers={},
    method="GET",
    body,
    formData,
    skipRedirect=false
}: {
    url: string;
    query?: object;
    headers?: Record<string, string>;
    method?: string;
    body?: object;
    formData?: FormData;
    skipRedirect?: boolean;
}) => {
    const methodLower: string = method.toLowerCase()
    const jsonMethods: string[] = ["post", "put", "patch", "delete"]

    if (!jsonMethods.includes(methodLower)) return

    if (body) {
        body = JSON.stringify(body);
    }
    if (formData) {
        body = formData
    }

    const token = await ActiveUser.getAuthorization();
    console.log("token", token)

    if (token) headers.Authorization = token
    headers["content-type"] = 'application/json'
    // if (query) url = `${url}?${decode(query)}`

    const res: Response = await fetch(url, {
        method,
        headers,
        body
    })

    if (!skipRedirect) {
        await redirectIfNotAuthenticated(res)
    }

    const contentType: string | null = res.headers.get('content-type')
    if (contentType && contentType !== 'application/json') {
        return {
            res,
            data: {},
            headers: res.headers
        }
    }

    const data = await res.json();

    return {
        res,
        data,
        headers: res.headers
    }
};
