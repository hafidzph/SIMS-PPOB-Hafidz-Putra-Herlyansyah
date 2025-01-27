import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { CiAt } from "react-icons/ci";
import { IoIosLock } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import AuthLayout from "../layout/AuthLayout";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../features/user/userThunk";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Format email salah")
        .required("Email wajib diisi"),
      password: Yup.string()
        .min(8, "Password minimal 8 karakter")
        .required("Password wajib diisi"),
    }),
    onSubmit: async (values) => {
      const result = await dispatch(loginAsync(values));

      if (loginAsync.fulfilled.match(result)) {
        onLogin(result.payload.token);
        formik.resetForm();
      } else if (loginAsync.rejected.match(result)) {
        toast.error(result.payload);
      }
    },
  });

  return (
    <AuthLayout type>
      <form
        className="w-full max-w-md flex flex-col gap-12"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-5">
          <TextField
            id="email"
            name="email"
            variant="outlined"
            className="w-full"
            placeholder="Masukkan email anda"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <CiAt />
                  </InputAdornment>
                ),
                style: {
                  height: "3rem",
                  fontSize: "14px",
                },
              },
            }}
          />

          <TextField
            id="password"
            name="password"
            variant="outlined"
            className="w-full"
            placeholder="Masukkan password anda"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type={showPassword ? "text" : "password"}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IoIosLock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="w-9 h-9"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  height: "3rem",
                  fontSize: "14px",
                },
              },
            }}
          />
        </div>

        <Button
          type="submit"
          disabled={formik.isSubmitting || loading}
          variant="contained"
          sx={{
            bgcolor: "red",
            "&:hover": {
              bgcolor: "darkred",
            },
            textTransform: "none",
          }}
          className="h-12 text-white"
        >
          {loading ? <CircularProgress size="1.5rem" color="white" /> : "Masuk"}
        </Button>
      </form>
    </AuthLayout>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
