import React, { useState } from "react";

const LogoutButton: React.FC = () => {
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      // Redireciona o usuário para a página de login após o logout
      window.location.href = "/login";
    } catch (error) {
      console.error("Erro durante o logout:", error);
      setLogoutError("Falha ao sair. Por favor, tente novamente.");
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {logoutError && <p style={{ color: "red" }}>{logoutError}</p>}
    </div>
  );
};

export default LogoutButton;
