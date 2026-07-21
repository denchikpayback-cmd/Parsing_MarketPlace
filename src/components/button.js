import "./button.css";

const Button = ({ label, onClick, className = '' }) => {
  return (
    <button 
      className={`btn ${className}`} 
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

export default Button;