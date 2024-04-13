import { FiUser } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Header() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  // Função de logout
  const handleLogout = () => {
    // Limpar o nome de usuário do localStorage
    localStorage.removeItem("username");

    // Redirecionar para a página de login
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div className="user">
        <img className="imgLogo" src="public/images/Logo.png" alt="" />
      </div>
      <div className="infos">
        <FiUser />
        {username ? (
          <p className="name">Olá, {username}</p>
        ) : (
          <p className="name">Bem-vindo!</p>
        )}
        <span>|</span>
        <CiLogout className="logoutIcon" onClick={handleLogout} />
      </div>
    </div>
  );
}

export { Header };
