import React, { useState } from "react";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false); // Novo estado para controlar o sucesso do registro

  const handleRegister = async () => {
    try {
      const response = await fetch("https://inventorysystem-backend.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // Se a resposta não for bem-sucedida, lançar um erro
        throw new Error("Cadastro falhou");
      }

      // Se a resposta for bem-sucedida, retornar os dados da resposta
      const data = await response.json();
      console.log("Usuário cadastrado com successo!", data);
      // Redirecionar para a página de login, exibir uma mensagem de sucesso, etc.
      setRegisterSuccess(true); // Definir o estado de sucesso como true
    } catch (error) {
      // Fornecendo um tipo explícito para 'error'
      // Se ocorrer algum erro durante a requisição, lidar com o erro
      console.error("Error durante cadastro:", error);
      setRegisterError("Falha ao registrar usuário. Por favor, tente novamente."); // Atualizar o estado para exibir uma mensagem de erro para o usuário
    }
  };

  return (
    <div className="center">
      <div className="register-container">
        <h2>Criar conta</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <label htmlFor="username">Usuário:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
          <p>
            Ja possui login?
            <a style={{ color: "red" }} href="login">
              Clique aqui
            </a>
          </p>
        </form>
        {registerError && <p className="register-message">{registerError}</p>}
        {registerSuccess && (
          <p className="register-message">Usuário cadastrado com sucesso!</p>
        )}{" "}
      </div>
    </div>
  );
};

export default Register;
