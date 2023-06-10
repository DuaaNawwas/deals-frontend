import { FC, memo, useState, useEffect } from "react";
import { getAllDeals } from "../apis/deals.apis";
import { IDeal } from "../types/deals.types";
import { claimDeal } from "../apis/claimed-deals.apis";
import { CheckmarkIcon } from "react-hot-toast";

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  const [deals, setDeals] = useState<IDeal[] | []>([]);

  const getDeals = () => {
    getAllDeals().then((res) => {
      if (!res.error) {
        setDeals(res);
        console.table(res);
      } else {
        console.log(res.error);
      }
    });
  };

  useEffect(() => {
    getDeals();
  }, []);

  const handleClaimDeal = (dealId: number) => {
    claimDeal(dealId).then((res) => {
      if (!res.error) {
        getDeals();
        console.log(res);
      } else {
        console.log(res.error);
      }
    });
  };

  return (
    <div className="space-y-10">
      <h1 className="text-xl font-bold">Claim your deal now!</h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
        {deals?.map((deal: any) => {
          return (
            <div
              key={deal.id}
              className="card bordered !border-white/25 bg-base-100 shadow-xl"
            >
              <div className="card-body">
                <h2 className="card-title flex justify-between">
                  <div className="flex gap-2 items-center capitalize">
                    {deal.Name}
                    <div
                      className={`badge ${
                        deal.Status === "Active"
                          ? "badge-primary"
                          : "badge-ghost"
                      } `}
                    >
                      {deal.Status}
                    </div>
                  </div>
                  <div className="">
                    {deal.Amount} {deal.Currency}
                  </div>
                </h2>
                <p>{deal.Description}</p>
                <div className="card-actions justify-end">
                  {Boolean(deal.claimedDeals.length) ? (
                    <button className="btn btn-primary !text-white !bg-primary/50" disabled>
                      <CheckmarkIcon />
                      Claimed
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClaimDeal(deal.id)}
                      className="btn btn-primary"
                    >
                      Claim Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Home);
