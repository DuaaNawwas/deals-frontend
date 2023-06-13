import { FC, memo, useState, useEffect } from "react";
import { IDeal } from "../types/deals.types";
import { deleteDeals, getAllDeals, getAllDealsDashboard, updateDeal } from "../apis/deals.apis";
import { toast } from "react-hot-toast";
import moment from "moment";
interface DealsProps {}

const Deals: FC<DealsProps> = ({}) => {
  const [deals, setDeals] = useState<IDeal[] | []>([]);
  const [dealsToShow, setDealsToShow] = useState<any[]>([]);
  const [selectedDeals, setSelectedDeals] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(deals.length / recordsPerPage);

  useEffect(() => {
    const currentRecords = deals.slice(indexOfFirstRecord, indexOfLastRecord);
    setDealsToShow(currentRecords);
  }, [deals]);

  const fetchDeals = () => {
    getAllDealsDashboard().then((res) => {
      if (!res.error) {
        setDeals(res);
        console.table(res);
      } else {
        console.log(res.error);
      }
    });
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelectedDeals([...selectedDeals, +name.split("-")[1]]);
    } else {
      setSelectedDeals(
        selectedDeals.filter((id) => id !== +name.split("-")[1])
      );
    }
  };

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const handleDeleteSelectedDeals = () => {
    deleteDeals(selectedDeals).then((res) => {
      if (!res.error) {
        toast.success("Deals deleted successfully");
        setSelectedDeals([]);
        fetchDeals();
      }
    });
  };

  const handleUpdateDealStatus = (id: number, Status: string) => {
    updateDeal({
      id,
      Status,
    }).then((res) => {
      if (!res.error) {
        toast.success("Deal status updated successfully");
        fetchDeals();
      }
    });
  };

  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">Do you want to delete selected deals?</p>
          <div className="modal-action">
            <button className="btn">Cancel</button>
            <button
              className="btn btn-error"
              onClick={handleDeleteSelectedDeals}
            >
              Delete
            </button>
          </div>
        </form>
      </dialog>
      <div className="flex flex-col gap-5">
        {selectedDeals.length > 0 && (
          <button
            className="btn btn-error self-end"
            onClick={() => window.my_modal_2.showModal()}
          >
            Delete Selected Deals
          </button>
        )}
        <div className="overflow-x-auto flex flex-col">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {dealsToShow?.map((deal: any, i) => {
                return (
                  <tr className={`${deal.Status === 'Deleted' ? 'bg-red-200/25':''}`} key={i}>
                    <th>
                      <label>
                        <input
                          name={`select-${deal.id}`}
                          type="checkbox"
                          className="checkbox"
                          onChange={(e) => onSelect(e)}
                          checked={selectedDeals.includes(deal.id)}
                          disabled={deal.Status === "Deleted"}
                        />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-bold capitalize">
                            {deal.Name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{deal.Description}</td>
                    <td>{deal.Amount}</td>
                    <td>{deal.Currency}</td>
                    <td>
                      <select
                        onChange={(e) => {
                          handleUpdateDealStatus(deal.id, e.target.value);
                        }}
                        className="select select-bordered w-full max-w-xs"
                        value={deal.Status}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Expired">Expired</option>
                        <option value="Deleted">Deleted</option>
                      </select>
                      {/* <span
                    className={`badge ${
                      user.Status === "Active"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {user.Status}{" "}
                  </span> */}
                    </td>
                    <td> {moment(deal.DateTime_UTC).format("DD/MM/YYYY")} </td>
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
    </>
  );
};

export default memo(Deals);
