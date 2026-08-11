import "../components style/header.css"
import { useNavigate } from "react-router-dom";

function Header(){
    const navigate = useNavigate();
    function Direct(){
        navigate("/authorization")
    }
    return(
        <div>
            <div className="header">
                <h1 className="brand">BrandName</h1>
                <input></input>
                <button disabled={true}>Натйи товар</button>
                <div className="profile" onClick={Direct}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                        <path d="M5 22v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <p>Войти</p>
                </div>
            </div>
        </div>
        
    )
}
export default Header;