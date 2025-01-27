import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import AuthLayout from "../layout/AuthLayout";
import { FaEye, FaEyeSlash, FaUserAlt } from "react-icons/fa";
import { CiAt } from "react-icons/ci";
import { IoIosLock } from "react-icons/io";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { registerAsync } from "../features/user/userThunk";
import { useNavigate } from "react-router";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Format email salah")
        .required("Email wajib diisi"),
      first_name: Yup.string().required("Nama depan wajib diisi"),
      last_name: Yup.string().required("Nama belakang wajib diisi"),
      password: Yup.string()
        .min(8, "Password minimal 8 karakter")
        .required("Password wajib diisi"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password harus sama")
        .required("Konfirmasi password wajib diisi"),
    }),
    onSubmit: async (values) => {
      const { confirmPassword, ...user } = values;

      const result = await dispatch(await dispatch(registerAsync(user)));

      if (registerAsync.fulfilled.match(result)) {
        toast.success(result.payload);
        formik.resetForm();
        navigate("/");
      } else if (registerAsync.rejected.match(result)) {
        toast.error(result.payload);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <AuthLayout>
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
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            placeholder="Masukkan email anda"
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
            id="first_name"
            name="first_name"
            variant="outlined"
            className="w-full"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            placeholder="Masukkan nama depan anda"
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
            helperText={formik.touched.first_name && formik.errors.first_name}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUserAlt size={15} />
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
            id="last_name"
            name="last_name"
            variant="outlined"
            className="w-full"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
            placeholder="Masukkan nama belakang anda"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUserAlt size={15} />
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
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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

          <TextField
            id="confirmPassword"
            name="confirmPassword"
            variant="outlined"
            className="w-full"
            placeholder="Masukkan konfirmasi password anda"
            type={showPassword ? "text" : "password"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
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
          {loading ? (
            <CircularProgress size="1.5rem" color="white" />
          ) : (
            "Registrasi"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Register;
