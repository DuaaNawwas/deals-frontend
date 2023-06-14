import { FC, memo, useState, useEffect, useContext } from "react";
import Users from "./Users";
import Deals from "./Deals";
import ClaimedDeals from "./ClaimedDeals";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  const [tab, setTab] = useState<"Users" | "Deals" | "ClaimedDeals">("Users");

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
        <a
          className={`tab ${tab === "ClaimedDeals" ? "tab-active" : ""}`}
          onClick={() => setTab("ClaimedDeals")}
        >
          Claimed Deals
        </a>
      </div>
      <div className="divider"></div>
      <div className="">{tab === "Users" && <Users />}</div>
      <div className="">{tab === "Deals" && <Deals />}</div>
      <div className="">{tab === "ClaimedDeals" && <ClaimedDeals />}</div>
    </div>
  );
};

export default memo(Dashboard);
