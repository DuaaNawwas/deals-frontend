import { FC, memo, useEffect, useState } from "react";
import { IClaimedDeal } from "../types/deals.types";
import { getAllClaimedDeals } from "../apis/claimed-deals.apis";
import moment from "moment";

interface ClaimedDealsProps {}

const ClaimedDeals: FC<ClaimedDealsProps> = ({}) => {
  const [ClaimedDeals, setClaimedDeals] = useState<IClaimedDeal[] | []>([]);

  const [claimedDealsToShow, setClaimedDealsToShow] = useState<IClaimedDeal[]>(
    []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(ClaimedDeals.length / recordsPerPage);

  useEffect(() => {
    const currentRecords = ClaimedDeals.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );
    setClaimedDealsToShow(currentRecords);
  }, [ClaimedDeals]);

  const fetchClaimedDeals = () => {
    getAllClaimedDeals().then((res) => {
      if (!res.error) {
        setClaimedDeals(res);
        console.table(res);
      } else {
        console.log(res.error);
      }
    });
  };

  useEffect(() => {
    fetchClaimedDeals();
  }, []);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      const filteredDeals = ClaimedDeals.filter((deal) =>
        deal.User_ID.toString().includes(value)
      );
      setClaimedDealsToShow(filteredDeals);
    } else {
      setClaimedDealsToShow(ClaimedDeals);
    }
  };

  return (
    <div>
      <input
        className="input input-bordered join-item"
        placeholder="Search by user id..."
        onChange={handleSearch}
      />

      <div className="overflow-x-auto flex flex-col">
        <table className="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Deal Name</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {claimedDealsToShow?.map((claimedDeal: IClaimedDeal, i) => {
              return (
                <tr key={i}>
                  <td>{claimedDeal.User_ID}</td>
                  <td>{claimedDeal.deal.Name}</td>
                  <td>{claimedDeal.deal.Amount}</td>
                  <td>{claimedDeal.deal.Currency}</td>
                  <td>
                    {" "}
                    {moment(claimedDeal.DateTime_UTC).format("DD/MM/YYYY")}{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {nPages > 1 && (
          <div className="join self-end">
            <button className="join-item btn" onClick={prevPage}>
              «
            </button>
            <button className="join-item btn">Page {currentPage}</button>
            <button className="join-item btn" onClick={nextPage}>
              »
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ClaimedDeals);
