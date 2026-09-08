export async function HistoryReq() {
    const res = await fetch("http://localhost:3001/product/history", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
    });
    const data = await res.json();
    return data.data || [];
}