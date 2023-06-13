import { FC, memo } from "react";
import moment from "moment";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/userContext";
import { deleteUsers, getAllUsers, updateUser } from "../apis/user.apis";
import { useContext, useEffect, useState } from "react";
interface UsersProps {}

const Users: FC<UsersProps> = ({}) => {
  const { userSession } = useContext(UserContext);
  const [users, setUsers] = useState<any[]>([]);
  const [usersToShow, setUsersToShow] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(users.length / recordsPerPage);

  useEffect(() => {
    const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
    setUsersToShow(currentRecords);
  }, [users]);

  const fetchUsers = () => {
    getAllUsers().then((res) => {
      if (!res.error) {
        setUsers(res);
      } else {
        console.log(res.error);
      }
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelectedUsers([...selectedUsers, +name.split("-")[1]]);
    } else {
      setSelectedUsers(
        selectedUsers.filter((id) => id !== +name.split("-")[1])
      );
    }
  };

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const handleDeleteSelectedUsers = () => {
    deleteUsers(selectedUsers).then((res) => {
      if (!res.error) {
        toast.success("Users deleted successfully");
        setSelectedUsers([]);
        fetchUsers();
      }
    });
  };

  const handleUpdateUserStatus = (id: number, Status: string) => {
    updateUser({
      id,
      Status,
    }).then((res) => {
      if (!res.error) {
        toast.success("User status updated successfully");
        fetchUsers();
      }
    });
  };

  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">Do you want to delete selected users?</p>
          <div className="modal-action">
            <button className="btn">Cancel</button>
            <button
              className="btn btn-error"
              onClick={handleDeleteSelectedUsers}
            >
              Delete
            </button>
          </div>
        </form>
      </dialog>
      <div className="flex flex-col gap-5">
        {selectedUsers.length > 0 && (
          <button
            className="btn btn-error self-end"
            onClick={() => window.my_modal_1.showModal()}
          >
            Delete Selected Users
          </button>
        )}
        <div className="overflow-x-auto flex flex-col">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Date of Birth</th>
                <th>Last Logged In</th>
              </tr>
            </thead>
            <tbody>
              {usersToShow?.map((user: any, i) => {
                return (
                  <tr
                    key={i}
                    className={`${
                      userSession.id === user.id ? "opacity-50" : ""
                    }${user.Status === 'Deleted' ? 'bg-red-200/25':''}`}

                  >
                    <th>
                      <label>
                        <input
                          name={`select-${user.id}`}
                          type="checkbox"
                          className="checkbox"
                          onChange={(e) => onSelect(e)}
                          checked={selectedUsers.includes(user.id)}
                          disabled={userSession?.id === user.id || user.Status === 'Deleted'}
                        />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={`${
                                user.image
                                  ? user.image
                                  : `https://ui-avatars.com/api/?name=${user.Name}`
                              }}`}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold capitalize">
                            {user.Name}
                          </div>
                          <div className="text-sm opacity-50">
                            {user.Gender}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {user.Email}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {userSession?.id === user.id ? "You" : user.Role}
                      </span>
                    </td>
                    <td>{user.Phone}</td>
                    <td>
                      <select
                        onChange={(e) => {
                          handleUpdateUserStatus(user.id, e.target.value);
                        }}
                        value={user.Status}
                        className="select select-bordered w-full max-w-xs"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
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
                    <td> {moment(user.Date_Of_Birth).format("DD/MM/YYYY")} </td>
                    <td>
                      {" "}
                      {moment(user.Last_Login_DateTime_UTC).format(
                        "DD/MM/YYYY"
                      )}{" "}
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
    </>
  );
};

export default memo(Users);
