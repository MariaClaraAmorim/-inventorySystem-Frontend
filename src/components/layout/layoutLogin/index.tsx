import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("https://inventorysystem-backend.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("username", data.user.username); // Armazenar o nome de usuário no localStorage
        localStorage.setItem("token", data.token); // Armazenar token de autenticação

        // Verificar o papel do usuário e redirecionar com base nele
        if (data.user.role === "ADMIN") {
          navigate("/dashboard"); // Redirecionar para o painel do administrador
        } else {
          navigate("/home"); // Redirecionar para o painel do usuário comum
        }
      } else {
        const data = await response.json();
        console.log("Login falhou:", data.message);
        setLoginMessage(data.message);
      }
    } catch (error) {
      console.error("Error durante login:", error);
      setLoginMessage("Ocorreu um erro durante o login");
    }
  };
  return (
    <div className="center">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Usuário:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <p>
            Não possui login?
            <a style={{ color: "red" }} href="register">
              Clique aqui
            </a>
          </p>
        </form>
        {loginMessage && <p className="login-message">{loginMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
