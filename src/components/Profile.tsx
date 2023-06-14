import { FC, memo, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { getClimedDealsByUser } from "../apis/claimed-deals.apis";
import { updateUser, uploadImage } from "../apis/user.apis";
import { toast } from "react-hot-toast";
import constants from "../constants";
import moment from "moment";

interface ProfileProps {}

const Profile: FC<ProfileProps> = ({}) => {
  const { userSession, setUserSession } = useContext(UserContext);

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

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onloadend = () => {
      //   console.log(reader.result);
      //   updateUser({ Image: reader.result }).then((res) => {
      //     if (!res.error) {
      //       setUserSession(res);
      //     } else {
      //       console.log(res.error);
      //     }
      //   });
      // };
      // reader.onerror = () => {
      //   console.error(reader.error);
      // };
      const formData = new FormData();
      formData.append("image", file);

      uploadImage(formData).then((res) => {
        console.log(res);
        if (res) {
          setUserSession({
            ...userSession,
            Image: res.replaceAll('"', ""),
          });
          toast.success("Image uploaded successfully");
        }
        // } else {
        //   toast.error(res.error);
        // }
      });
    }
  };

  return (
    <div>
      <div className="flex h-[calc(100vh-10em)] items-center justify-center gap-2">
        <div className="indicator ">
          <div className="card  h-[320px] w-[500px]  bg-base-200 p-5 shadow-lg">
            <figure className="indicator-start indicator-item indicator-top">
              <label htmlFor="image-upload">
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleUploadImage(e)}
                  accept="image/*"
                />
                <img
                  className="cursor-pointer h-32 w-32 rounded-full"
                  src={
                    userSession?.Image
                      ? constants.IMAGE_URL.concat(userSession?.Image)
                      : `https://ui-avatars.com/api/?name=${userSession.Name}`
                  }
                />
              </label>
            </figure>
            <div className="card-body">
              <div className="flex w-full items-center justify-between">
                <h2 className="card-title">Hello {userSession.Name}</h2>
                <h2 className="card-title">💜</h2>
              </div>
              <div className="mt-5 flex flex-col gap-7">
                <p>Here is some info about you</p>
                <div className="space-y-1">
                  <p className="card-title">Name: {userSession.Name}</p>
                  <p className="card-title">Email: {userSession.Email}</p>
                  <p className="card-title">Phone: {userSession.Phone}</p>
                  <p className="card-title">
                    Date Of Birth:{" "}
                    {moment(userSession.Date_Of_Birth).format("DD/MM/YYYY")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="stats  stats-vertical h-[320px] bg-base-200 shadow-xl">
          <div className="stat">
            <div className="stat-title">Claimed Deals</div>
            <div className="stat-value">{claimedDeals.length}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Total Amount</div>
            <div className="stat-value">{amountClaimed}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Profile);
