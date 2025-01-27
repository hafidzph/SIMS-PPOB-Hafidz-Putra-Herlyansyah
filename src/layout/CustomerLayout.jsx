import PropTypes from "prop-types";
import CustomerProfile from "./CustomerProfile";
import MainLayout from "./MainLayout";

function CustomerLayout({ children }) {
  return (
    <MainLayout>
      <div className="px-52 space-y-14">
        <CustomerProfile />
        {children}
      </div>
    </MainLayout>
  );
}

CustomerLayout.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    profile_image: PropTypes.string.isRequired,
  }),
};

export default CustomerLayout;
