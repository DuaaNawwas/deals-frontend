import { FC, memo, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { getClimedDealsByUser } from "../apis/claimed-deals.apis";

interface ProfileProps {}

const Profile: FC<ProfileProps> = ({}) => {
  const { userSession } = useContext(UserContext);

  const [claimedDeals, setClaimedDeals] = useState([]);
  const [amountClaimed, setAmountClaimed] = useState(0);
  useEffect(() => {
    getClimedDealsByUser().then((res) => {
      if (!res.error) {
        setClaimedDeals(res);
        let amount = 0;
        res.forEach((deal: any) => {
          amount += +deal.Amount;
        });
        setAmountClaimed(amount);
      } else {
        console.log(res.error);
      }
    });
  }, []);

  return (
    <div>
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={`https://ui-avatars.com/api/?name=${userSession.Name}`} />
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Claimed Deals</div>
          <div className="stat-value text-secondary">{claimedDeals.length}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Amount Claimed</div>
          <div className="stat-value text-secondary">{amountClaimed}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(Profile);
