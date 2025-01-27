import { useEffect, useState } from "react";
import TransactionHistoryItem from "../components/TransactionHistoryItem";
import CustomerLayout from "../layout/CustomerLayout";
import { useDispatch, useSelector } from "react-redux";
import { transactionHistoryAsync } from "../features/transaction/transactionThunk";
import { CircularProgress } from "@mui/material";

function TransactionHistory() {
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();

  const { loading, transactions } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(transactionHistoryAsync(offset));
  }, [dispatch, offset]);

  const handleShowMore = (e) => {
    e.preventDefault();
    setOffset((prevOffset) => prevOffset + 5);
  };

  const isShowMoreVisible = transactions.length % 5 === 0;

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
      <div className="flex flex-col gap-5 mb-10">
        <h1 className="text-xl font-medium">Semua Transaksi</h1>
        {transactions?.length === 0 ? (
          <h1 className="text-lg text-center">Belum ada transaksi</h1>
        ) : (
          <>
            <div className="space-y-4">
              {transactions?.map((transaction) => (
                <TransactionHistoryItem
                  key={transaction.invoice_number}
                  transaction={transaction}
                />
              ))}
            </div>
            {isShowMoreVisible && (
              <span
                className="text-center cursor-pointer hover:text-red-500 transition-all duration-200"
                onClick={handleShowMore}
              >
                Show More
              </span>
            )}
          </>
        )}
      </div>
    </CustomerLayout>
  );
}

export default TransactionHistory;
