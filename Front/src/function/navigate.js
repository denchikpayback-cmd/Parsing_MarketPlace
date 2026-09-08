import { useNavigate } from "react-router-dom";

export function DirectHistory() {
    const navigate = useNavigate(); 
    return () => navigate("/history");
}

export function DirectSearch() {
    const navigate = useNavigate();
    return () => navigate("/search");
}
export function DirectAuth() {
        const navigate = useNavigate();
        navigate("/authorization");
    }