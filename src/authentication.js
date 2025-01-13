export async function getAuthenticationStatus() {
    const response = await fetch(`${process.env["VUE_APP_API_BASE_URL"]}/api/authentication/status`,{
        credentials: "include",
    })

    const authenticationStatus = await response.text() === "true"
    return authenticationStatus;
}
