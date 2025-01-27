import { useDispatch, useSelector } from "react-redux";
import Balance from "../components/Balance";
import PersonCard from "../components/PersonCard";
import { useEffect } from "react";
import { getInformationProfileAsync } from "../features/user/userThunk";
import { CircularProgress } from "@mui/material";

function CustomerProfile() {
  const { loading, user, balance } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInformationProfileAsync());
  }, [dispatch]);

  if ((loading && !user) || balance === 0) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <CircularProgress
          size={60}
          sx={{
            color: "red",
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between content-center w-full">
      <PersonCard user={user} />
      <Balance balance={balance} />
    </div>
  );
}

export default CustomerProfile;
