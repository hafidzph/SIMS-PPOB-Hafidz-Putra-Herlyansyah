import PropTypes from "prop-types";

function ServiceItem({ image, title, onClick }) {
  return (
    <div
      className="flex flex-col gap-5 justify-center items-center  cursor-pointer max-w-18"
      onClick={onClick}
    >
      <img src={image} alt={title} className="w-12 h-12" />

      <span className="text-center text-xs">{title}</span>
    </div>
  );
}

ServiceItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ServiceItem;
