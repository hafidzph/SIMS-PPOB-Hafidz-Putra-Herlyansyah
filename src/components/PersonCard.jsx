import { Avatar } from "@mui/material";
import profile from "../assets/Profile Photo.png";
import { useSelector } from "react-redux";

function PersonCard() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col gap-6 max-w-sm">
      <Avatar
        alt="Profile"
        src={
          user?.profile_image.includes("null") ? profile : user?.profile_image
        }
        sx={{ width: 80, height: 80 }}
      />
      <div className="flex flex-col gap-1">
        <span className="text-lg">Selamat datang,</span>
        <span className="text-3xl font-medium">
          {user?.first_name} {user?.last_name}
        </span>
      </div>
    </div>
  );
}

export default PersonCard;
