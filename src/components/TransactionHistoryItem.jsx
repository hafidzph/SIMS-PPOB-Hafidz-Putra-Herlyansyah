import PropTypes from "prop-types";
import { formattedMoney } from "../utils/utils";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

function TransactionHistoryItem({ transaction }) {
  const date = parseISO(transaction.created_on);
  const formattedDate = format(date, "d MMMM yyyy HH:mm", { locale: id });

  return (
    <div className="border border-gray-400 rounded-lg px-7 py-3 flex justify-between">
      <div className="flex flex-col gap-3">
        <span
          className={`font-medium text-xl ${
            transaction.transaction_type === "TOPUP"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >{`${
          transaction.transaction_type === "TOPUP" ? "+" : "-"
        } Rp.${formattedMoney(transaction.total_amount)}`}</span>
        <span className="text-sm text-gray-500">{`${formattedDate} WIB`}</span>
      </div>
      <span className="text-xs text-gray-800">{transaction.description}</span>
    </div>
  );
}

TransactionHistoryItem.propTypes = {
  transaction: PropTypes.shape({
    transaction_type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    total_amount: PropTypes.number.isRequired,
    created_on: PropTypes.string.isRequired,
  }),
};

export default TransactionHistoryItem;
