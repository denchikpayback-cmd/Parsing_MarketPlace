import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "./pages/Search";
import { DirectAuth } from "../function/navigate";
export function Profile(){
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState("")
  useEffect(() => {
          const savedEmail = localStorage.getItem("userEmail");
          if(savedEmail){
              setUserEmail(savedEmail)

          } 
      }, [])
  return(
  <div className="sidebar-footer-section">
                    
  <div className="sidebar-footer" onClick={DirectAuth}>
      <div className="user-avatar">{userEmail ? userEmail.slice(0, 2).toUpperCase() : "G"}</div>
      <div className="user-info">
          <h4>{userEmail ? userEmail : "Guest"}</h4>
          <span>Pro</span>
      </div>
  </div>

                    
  <div className="sidebar-logout" onClick={() => Logout(navigate)}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
      Выйти
  </div></div>
  )
}