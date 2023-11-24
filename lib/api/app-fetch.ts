const pubAPI = process.env.NEXT_PUBLIC_API_URL
console.log("pubAPI", pubAPI)

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const token = localStorage.getItem('auth_token');
    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
    }
    const response = await fetch(pubAPI + url, options);

    return response;
}