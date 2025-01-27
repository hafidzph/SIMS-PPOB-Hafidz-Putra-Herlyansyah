import bg_saldo from "../assets/Background Saldo.png";
import PropTypes from "prop-types";
import { formattedMoney } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { setShowSaldo } from "../features/user/userSlice";

function Balance({ balance }) {
  const dispatch = useDispatch();
  const showSaldo = useSelector((state) => state.user.showSaldo);

  const handleToggleSaldo = () => {
    dispatch(setShowSaldo());
  };

  const formattedBalance = formattedMoney(balance?.balance) || balance?.balance;

  return (
    <div className="relative w-full max-w-[40rem] h-40 rounded-lg overflow-hidden shadow-lg">
      <img
        src={bg_saldo}
        alt="Background Saldo"
        className="w-fit h-full aspect-auto"
      />

      <div className="absolute inset-0 flex flex-col justify-between py-6.5 px-3 text-white">
        <span className="text-md">Saldo anda</span>
        <span className="text-2xl font-bold">
          Rp. {showSaldo ? formattedBalance : "●●●●●●●"}
        </span>
        <span
          onClick={handleToggleSaldo}
          className="text-sm cursor-pointer hover:text-gray-200"
        >
          {showSaldo ? "Tutup saldo" : "Lihat saldo"}
        </span>
      </div>
    </div>
  );
}

Balance.propTypes = {
  balance: PropTypes.shape({
    balance: PropTypes.number.isRequired,
  }),
};

export default Balance;
