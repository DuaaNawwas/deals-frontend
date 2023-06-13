import { FC, memo, useState, useEffect, useContext } from "react";
import Users from "./Users";
import Deals from "./Deals";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  const [tab, setTab] = useState("Users");

  return (
    <div className="flex flex-col">
      <div className="tabs tabs-boxed self-center">
        <a
          className={`tab ${tab === "Users" ? "tab-active" : ""}`}
          onClick={() => setTab("Users")}
        >
          Users
        </a>
        <a
          className={`tab ${tab === "Deals" ? "tab-active" : ""}`}
          onClick={() => setTab("Deals")}
        >
          Deals
        </a>
      </div>
      <div className="divider"></div>
      <div className="">{tab === "Users" && <Users />}</div>
      <div className="">{tab === "Deals" && <Deals />}</div>
    </div>
  );
};

export default memo(Dashboard);
