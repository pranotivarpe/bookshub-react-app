import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import RandomBook from "./RandomBook";

const pages = ["Home", "Suggest a Book"]; // Array of pages for navigation

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null); // State for menu anchor element
  const [showRandomBook, setShowRandomBook] = React.useState(false); // State for showing random book

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget); // Handling opening navigation menu
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null); // Handling closing navigation menu
  };

  const handlePageClick = (page) => {
    handleCloseNavMenu();
    if (page === "Suggest a Book") {
      setShowRandomBook(true); // Handling click on page and showing random book
    }
  };

  React.useEffect(() => {
    setShowRandomBook(false); // Resetting showRandomBook state
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#65491B" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#booksHub"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BooksHub
          </Typography>

          {/* Menu for small screens */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* Mapping through pages for menu items */}
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handlePageClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Buttons for larger screens */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageClick(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>

      {/* Rendering RandomBook component if showRandomBook is true */}
      {showRandomBook && <RandomBook />}
    </AppBar>
  );
}

export default ResponsiveAppBar;
