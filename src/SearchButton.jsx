import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DialogBox from "./DialogBox";

export default function BookSearch() {
  const [open, setOpen] = React.useState(false); // State for dialog box open/close
  const [bookInfo, setBookInfo] = React.useState(null); // State for book information
  const [searchTerm, setSearchTerm] = React.useState(""); // State for search term
  const [loading, setLoading] = React.useState(false); // State for loading state

  // Function to handle book search
  const handleSearch = async () => {
    setLoading(true); // Set loading state to true
    const url =
      "https://books-api7.p.rapidapi.com/books/find/title?title=" +
      encodeURIComponent(searchTerm);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "70b379b545msh048cf3e04bd4c99p1855e4jsnd75037ac450f",
        "X-RapidAPI-Host": "books-api7.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options); // Fetch book data
      if (response.ok) {
        const data = await response.json(); // Parse response data
        if (data && data.length > 0) {
          const bookInfo = data[0];
          setBookInfo(bookInfo); // Set book information
          setOpen(true); // Open dialog box
        } else {
          console.error("No book information found"); // Log error if no book information found
        }
      } else {
        console.error("Failed to fetch book info"); // Log error if failed to fetch book information
      }
    } catch (error) {
      console.error("Error fetching book info:", error); // Log error if error occurred while fetching book information
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // Function to handle dialog box close
  const handleClose = () => {
    setOpen(false); // Close dialog box
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      {/* Search input field */}
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 600,
          boxShadow: 3,
          borderRadius: "18px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search a Book"
          inputProps={{ "aria-label": "search google maps" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Search button */}
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* Dialog box to display book information */}
      {bookInfo && (
        <DialogBox open={open} handleClose={handleClose} bookInfo={bookInfo} />
      )}
    </div>
  );
}
