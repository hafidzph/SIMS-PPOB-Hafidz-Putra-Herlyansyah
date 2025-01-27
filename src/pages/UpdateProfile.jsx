import MainLayout from "../layout/MainLayout";
import profile from "../assets/Profile Photo.png";
import {
  Avatar,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import { FaPencilAlt, FaUserAlt } from "react-icons/fa";
import { CiAt } from "react-icons/ci";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getInformationProfileAsync,
  updateProfileAsync,
  updateProfileImageAsync,
} from "../features/user/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

function UpdateProfile({ onLogout }) {
  const { loading, user } = useSelector((state) => state.user);
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      profile_image: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email tidak valid")
        .required("Email wajib diisi"),
      first_name: Yup.string().required("Nama depan wajib diisi"),
      last_name: Yup.string().required("Nama belakang wajib diisi"),
    }),
    onSubmit: async (values) => {
      const result = await dispatch(
        updateProfileAsync({
          first_name: values.first_name,
          last_name: values.last_name,
        })
      );

      if (updateProfileAsync.fulfilled.match(result)) {
        toast.success(result.payload.message);
        dispatch(getInformationProfileAsync());

        setIsEditing(false);
      } else if (updateProfileAsync.rejected.match(result)) {
        toast.error(result.payload);
      }
    },
  });

  useEffect(() => {
    dispatch(getInformationProfileAsync());
  }, [dispatch]);

  const handleFileChange = async (event) => {
    const file = event.currentTarget.files[0];
    if (file.size > 100000) {
      toast.error("Size image maksimal 100 KB");
      return;
    }

    const validFormats = ["image/jpeg", "image/png"];
    if (!validFormats.includes(file.type)) {
      toast.error("Hanya format jpeg dan png yang diperbolehkan", {
        style: {
          textAlign: "center",
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await dispatch(updateProfileImageAsync(formData));

      if (updateProfileImageAsync.fulfilled.match(res)) {
        toast.success(res.payload.message);
        dispatch(getInformationProfileAsync());
      } else {
        throw new Error(res.payload);
      }
    } catch (error) {
      toast.error(error.message || "Terjadi kesalahan saat mengupdate gambar.");
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleEditProfileClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (user) {
      formik.setValues({
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
      });
      setPreview(
        user?.profile_image.includes("null") ? profile : user?.profile_image
      );
    }
  }, [user]);

  if (loading && !user) {
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
    <MainLayout>
      <div className="flex flex-col max-w-2xl mx-auto justify-center items-center gap-5">
        <form
          className="flex flex-col justify-center items-center gap-5 w-full"
          onSubmit={formik.handleSubmit}
        >
          <div className="relative w-fit">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <Avatar
                alt="User Image"
                src={preview}
                sx={{ width: 170, height: 170 }}
              />
            </label>

            <label
              htmlFor="photo-upload"
              className="absolute bottom-1 right-2 border bg-white border-gray-400 text-gray-600 p-2 rounded-full shadow-lg cursor-pointer"
            >
              <FaPencilAlt size={15} />
            </label>
            <input
              id="photo-upload"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              disabled={!isEditing}
            />
          </div>
          <span className="text-2xl font-medium">
            {user?.first_name} {user?.last_name}
          </span>

          <div className="w-full flex flex-col gap-3">
            <label htmlFor="email" className="text-sm font-400">
              Email
            </label>
            <TextField
              id="email"
              variant="outlined"
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
              disabled
            />
          </div>

          <div className="w-full flex flex-col gap-3">
            <label htmlFor="firstName" className="text-sm font-400">
              Nama Depan
            </label>
            <TextField
              id="first_name"
              variant="outlined"
              placeholder="Masukkan nama depan anda"
              value={formik.values.first_name}
              onChange={formik.handleChange}
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
              disabled={!isEditing}
            />
          </div>

          <div className="w-full flex flex-col gap-3">
            <label htmlFor="lastName" className="text-sm font-400">
              Nama Belakang
            </label>
            <TextField
              id="last_name"
              variant="outlined"
              placeholder="Masukkan nama belakang anda"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
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
              disabled={!isEditing}
            />
          </div>
          {isEditing && (
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "red",
                "&:hover": {
                  bgcolor: "darkred",
                },
                textTransform: "none",
              }}
              className="w-full h-12 text-white"
            >
              {loading ? (
                <CircularProgress size="1.5rem" color="white" />
              ) : (
                "Simpan"
              )}
            </Button>
          )}
        </form>

        {!isEditing && (
          <>
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                borderColor: "red",
                color: "red",
                "&:hover": {
                  borderColor: "darkred",
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                },
              }}
              className="w-full h-12 text-white"
              onClick={handleEditProfileClick}
            >
              Edit Profile
            </Button>

            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                bgcolor: "red",
                "&:hover": {
                  bgcolor: "darkred",
                },
                textTransform: "none",
              }}
              className="w-full h-12 text-white"
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </MainLayout>
  );
}

UpdateProfile.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default UpdateProfile;
