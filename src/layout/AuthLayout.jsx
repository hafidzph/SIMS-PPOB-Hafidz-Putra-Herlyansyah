import PropTypes from "prop-types";

import illustration from "../assets/Illustrasi Login.png";
import logo from "../assets/Logo.png";
import { Link } from "react-router";

function AuthLayout({ children, type }) {
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 flex flex-col items-center justify-center gap-8">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-7 h-7" />
          <h1 className="text-xl font-medium">SIMS PPOB</h1>
        </div>
        <h1 className="text-2xl font-medium max-w-80 text-center">
          {type
            ? "Masuk atau buat akun untuk memulai"
            : "Lengkapi data untuk membuat akun"}
        </h1>
        {children}

        {type ? (
          <span className="text-sm ">
            Belum punya akun? registrasi{" "}
            <Link to="/auth/register" className="text-red-600 font-medium">
              di sini
            </Link>
          </span>
        ) : (
          <span className="text-sm">
            Sudah punya akun? login{" "}
            <Link to="/auth/login" className="text-red-600 font-medium">
              di sini
            </Link>
          </span>
        )}
      </div>
      <div className="w-1/2 bg-pink-50 flex items-center justify-center">
        <img
          src={illustration}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.bool,
};

export default AuthLayout;
