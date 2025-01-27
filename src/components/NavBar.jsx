import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import logo from "../assets/Logo.png";
import { Link, useLocation, useNavigate } from "react-router";

const navItems = [
  { name: "Top Up", to: "/top-up" },
  { name: "Transaction", to: "/transaction-history" },
  { name: "Akun", to: "/profile" },
];

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar
      component="nav"
      color="inherit"
      elevation={0}
      sx={{
        padding: "0.3rem 12rem",
        boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.103)",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            gap: "5px",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <img src={logo} className="w-7 h-7" />

          <Typography variant="h6" component="div" sx={{ fontWeight: "600" }}>
            SIMS PPOB
          </Typography>
        </Box>

        <Box className="flex gap-10">
          {navItems.map((item) => (
            <Link
              to={item.to}
              key={item.name}
              className={`cursor-pointer transition duration-300 ease ${
                location.pathname === item.to
                  ? "text-red-500"
                  : "hover:text-red-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
