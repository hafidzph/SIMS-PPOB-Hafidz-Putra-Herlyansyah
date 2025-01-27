import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import logo from "../assets/Logo.png";

import CustomerLayout from "../layout/CustomerLayout";
import { useFormik } from "formik";
import { CiCreditCard1 } from "react-icons/ci";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInformationAsync } from "../features/information/informationThunk";
import { useNavigate, useParams } from "react-router";
import { formattedMoney } from "../utils/utils";
import { serviceTransactionAsync } from "../features/transaction/transactionThunk";
import Swal from "sweetalert2";

function ServiceTopUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { service_code } = useParams();
  const { services, loading } = useSelector((state) => state.information);
  const service = services?.find(
    (service) =>
      service.service_code.toLowerCase() === service_code.toLowerCase()
  );
  const formik = useFormik({
    initialValues: {
      nominal: "",
    },
    onSubmit: async (values) => {
      const confirmResult = await Swal.fire({
        title: `<span style="font-size: 20px; font-weight: normal ;">Anda yakin untuk membayar tagihan ${service?.service_name} sebesar<span>`,
        html: ` <span style="font-size: 32px; font-weight: bold;">Rp${formattedMoney(
          values.nominal
        )}?</span>`,
        showCancelButton: true,
        confirmButtonText: "Ya, lanjutkan Bayar",
        cancelButtonText: "Batalkan",
        confirmButtonColor: "#D32F2F",
        cancelButtonColor: "#9E9E9E",
        imageUrl: logo,
        imageWidth: 80,
        imageHeight: 80,
        imageAlt: "Top Up Icon",
        width: "400px",
        customClass: {
          confirmButton:
            "py-2 px-4 rounded-full text-red-600 border-none hover:text-red-800 cursor-pointer w-full font-bold",
          cancelButton:
            "py-2 px-4 rounded-full text-gray-400 border-none hover:text-gray-500 cursor-pointer w-full font-bold",
          container: "flex flex-col justify-between",
        },
        buttonsStyling: false,
      });

      if (confirmResult.isConfirmed) {
        const result = await dispatch(
          serviceTransactionAsync(service?.service_code)
        );

        if (serviceTransactionAsync.fulfilled.match(result)) {
          Swal.fire({
            title: `<span style="font-size: 20px; font-weight: normal ;">Tagihan ${service?.service_name} sebesar<span>`,
            html: `
                      <span style="font-size: 32px; font-weight: bold;">Rp${formattedMoney(
                        values.nominal
                      )}</span>
                      <br>
                      <span style="font-size: 18px; color: gray; margin-top: 10px;">Berhasil!</span>
                    `,
            icon: "success",
            confirmButtonText: "Kembali ke Beranda",
            confirmButtonColor: "#D32F2F",
            customClass: {
              confirmButton:
                "py-2 px-4 rounded-full text-red-600 border-none hover:text-red-800 cursor-pointer w-full font-bold",
            },
            buttonsStyling: false,
          }).then(() => {
            navigate("/");
          });
        }
        if (serviceTransactionAsync.rejected.match(result)) {
          Swal.fire({
            title: `<span style="font-size: 20px; font-weight: normal ;">Tagihan ${service?.service_name} sebesar<span>`,
            html: `
                <span style="font-size: 32px; font-weight: bold;">Rp${formattedMoney(
                  values.nominal
                )}</span>
                <br>
                <span style="font-size: 18px; color: gray; margin-top: 10px;">Gagal</span>
            `,
            icon: "error",
            confirmButtonText: "Kembali ke Beranda",
            confirmButtonColor: "#D32F2F",
            customClass: {
              confirmButton:
                "py-2 px-4 rounded-full text-red-600 border-none hover:text-red-800 cursor-pointer w-full font-bold",
            },
            buttonsStyling: false,
          }).then(() => {
            navigate("/");
          });
        }
      }
    },
  });

  useEffect(() => {
    dispatch(getInformationAsync());

    if (services) {
      formik.setValues({
        nominal: service.service_tariff || "",
      });
    }
  }, [dispatch]);

  if (loading) {
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
    <CustomerLayout>
      <div className="flex flex-col h-fit gap-2">
        <span className="text-lg">Pembayaran</span>
        <div className="flex gap-3 items-center justify-start">
          <img src={service?.service_icon} className="w-10 h-10" />
          <span className="text-xl font-medium">{service?.service_name}</span>
        </div>
      </div>

      <form
        className="flex-1 w-full h-full flex flex-col gap-5"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="nominal"
          name="nominal"
          variant="outlined"
          className="w-full"
          type="text"
          value={formattedMoney(formik.values.nominal)}
          placeholder="Masukkan nominal"
          disabled
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
              fontWeight: "medium",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <CiCreditCard1 />
                </InputAdornment>
              ),
              style: {
                height: "3rem",
                fontSize: "14px",
              },
              inputProps: {
                min: 0,
              },
            },
          }}
        />

        <Button
          type="submit"
          disabled={!formik.values.nominal}
          variant="contained"
          sx={{
            bgcolor: "red",
            "&:hover": {
              bgcolor: "darkred",
            },
            textTransform: "none",
            fontSize: "14px",
          }}
          className="w-full h-10 text-white"
        >
          {/* {loading ? (
            <CircularProgress size="1.5rem" color="white" />
          ) : (
            "Top Up"
          )} */}
          Bayar
        </Button>
      </form>
    </CustomerLayout>
  );
}

export default ServiceTopUp;
