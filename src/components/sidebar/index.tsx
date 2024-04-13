import { FaUsers } from "react-icons/fa";
import "./style.css";
import {
  MdOutlineProductionQuantityLimits,
  MdDashboard,
  MdOutlineAppRegistration, MdOutlineReportProblem 
} from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { TbReportMedical } from "react-icons/tb";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">

        <ul>
          <li>
            <a href="/dashboard">
              <MdDashboard className="iconsDash" />
              <div>Dashboard</div>
            </a>
          </li>
          <li>
            <a href="/cadastrar-produto">
              <MdOutlineAppRegistration className="iconsDash" />
              <div>Cadastro</div>
            </a>
          </li>
          <li>
            <a href="/estoque">
              <MdOutlineProductionQuantityLimits className="iconsDash" />
              <div>Produtos</div>
            </a>
          </li>
          <li className="nav-item">
            <a href="#relatorios" className="nav-link">
              <TbReportAnalytics className="iconsDash" />
              Relatórios
            </a>
            <div id="relatorios" className="nav-submenu">
              <a href="/relatorio" className="nav-submenu-link">
              <TbReportMedical className="iconsDash" />
                Produtos positivos
              </a>
              <a href="#" className="nav-submenu-link">
              <MdOutlineReportProblem className="iconsDash" />
                Produtos negativos</a>
            </div>
          </li>
          <li>
            <a href="/usuarios">
              <FaUsers className="iconsDash" />
              <div>Clientes</div>
            </a>
          </li>
        </ul>

      </div>
    </>
  );
}
