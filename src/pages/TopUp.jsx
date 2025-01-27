import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import CustomerLayout from "../layout/CustomerLayout";
import { CiCreditCard1 } from "react-icons/ci";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import logo from "../assets/Logo.png";
import Swal from "sweetalert2";
import { topUpAsync } from "../features/transaction/transactionThunk";
import { formattedMoney } from "../utils/utils";

const nominals = [
  "10.000",
  "20.000",
  "50.000",
  "100.000",
  "250.000",
  "500.000",
];

function TopUp() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.transaction);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nominal: "",
    },
    validationSchema: Yup.object({
      nominal: Yup.string().required("Nominal harus diisi"),
    }),
    onSubmit: async (values) => {
      const formattedNominal = Number(values.nominal.replace(/[.,]/g, ""));

      const confirmResult = await Swal.fire({
        title: `<span style="font-size: 20px; font-weight: normal ;">Anda yakin untuk Top Up sebesar<span>`,
        html: ` <span style="font-size: 32px; font-weight: bold;">Rp${formattedMoney(
          formattedNominal
        )}?</span>`,
        showCancelButton: true,
        confirmButtonText: "Ya, lanjutkan Top Up",
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
          topUpAsync({ top_up_amount: formattedNominal })
        );

        if (topUpAsync.fulfilled.match(result)) {
          Swal.fire({
            title: `<span style="font-size: 20px; font-weight: normal ;">Top Up sebesar<span>`,
            html: `
                <span style="font-size: 32px; font-weight: bold;">Rp${formattedMoney(
                  formattedNominal
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
        if (topUpAsync.rejected.match(result)) {
          Swal.fire({
            title: `<span style="font-size: 20px; font-weight: normal ;">Top Up sebesar<span>`,
            html: `
                <span style="font-size: 32px; font-weight: bold;">Rp${formattedMoney(
                  formattedNominal
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

  const parseNominal = (nominal) => Number(nominal.replace(/\./g, ""));

  return (
    <CustomerLayout>
      <div className="flex flex-col h-fit">
        <span className="text-lg">Silahkan masukkan</span>
        <span className="text-2xl font-medium">Nominal Top Up</span>
      </div>

      <div className="flex gap-10 justify-between items-center">
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
            value={formik.values.nominal}
            onChange={formik.handleChange}
            placeholder="Masukkan nominal top up"
            error={formik.touched.nominal && Boolean(formik.errors.nominal)}
            helperText={formik.touched.nominal && formik.errors.nominal}
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
            disabled={!formik.values.nominal || loading}
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
            {loading ? (
              <CircularProgress size="1.5rem" color="white" />
            ) : (
              "Top Up"
            )}
          </Button>
        </form>

        <div className="flex flex-wrap max-w-md gap-2">
          {nominals.map((nominal) => (
            <Button
              key={nominal}
              variant="none"
              onClick={() => formik.setFieldValue("nominal", nominal)}
              sx={{
                width: "110px",
                height: "3rem",
                textAlign: "center",
                color: "black",
                textTransform: "none",
                fontSize: "12px",
                border: "1px solid #1c1c1d7f",
                "&:hover": {
                  borderColor: "#1c1c1d7f",
                },
              }}
            >
              Rp. {new Intl.NumberFormat("id-ID").format(parseNominal(nominal))}
            </Button>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
}

export default TopUp;
