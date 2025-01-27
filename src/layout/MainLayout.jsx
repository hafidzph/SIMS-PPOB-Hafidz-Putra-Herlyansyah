import PropTypes from "prop-types";
import NavBar from "../components/NavBar";

function MainLayout({ children }) {
  return (
    <main className="mt-24">
      <NavBar />
      {children}
    </main>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
