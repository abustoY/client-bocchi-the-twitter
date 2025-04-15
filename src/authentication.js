export async function getAuthenticationStatus() {
    const response = await fetch(`${process.env["VUE_APP_API_HOST_URL"]}/api/authentication/status`, {
        credentials: "include",
    });

    return response.ok;
}

export async function login(id, password) {
    const params = new URLSearchParams();
    params.append("id", id);
    params.append("password", password);

    const response = await fetch(`${process.env["VUE_APP_API_HOST_URL"]}/api/authentication/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    });

    return response.ok;
}

export async function logout() {
    const response = await fetch(`${process.env["VUE_APP_API_HOST_URL"]}/api/authentication/logout`, {
        method: "POST",
        credentials: "include"
    });

    return response.ok;
}
