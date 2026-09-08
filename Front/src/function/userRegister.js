export async function loginRequest(email, password) {
    const res = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
    });
    const data = await res.json();
    return { res, data };
}
export async function Logout(navigate) {
    const res = await fetch("http://localhost:3001/user/logout", {
        method: "POST",
        credentials: "include"
    });
    if (res.ok) {
        console.log("Кука успешна удалена");
        localStorage.removeItem("userEmail");
        navigate("/");  
    } else {
        console.log("Кука не удалена");
    }
}