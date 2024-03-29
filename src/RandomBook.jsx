import * as React from "react";
import DialogBox from "./DialogBox";

const randomBookUrl = "https://books-api7.p.rapidapi.com/books/get/random/";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "70b379b545msh048cf3e04bd4c99p1855e4jsnd75037ac450f",
    "X-RapidAPI-Host": "books-api7.p.rapidapi.com",
  },
};

export default function BookSearch() {
  const [open, setOpen] = React.useState(false); // State for dialog box open/close
  const [bookInfo, setBookInfo] = React.useState(null); // State for book information

  // Fetching random book data from API on component mount
  React.useEffect(() => {
    const handleRandomBook = async () => {
      try {
        const response = await fetch(randomBookUrl, options); // Fetch random book data
        if (response.ok) {
          const data = await response.json(); // Parse response data
          setBookInfo(data); // Set book information
          setOpen(true); // Open dialog box
        } else {
          console.error("Failed to fetch random book"); // Log error if fetching random book fails
        }
      } catch (error) {
        console.error("Error fetching random book:", error); // Log error if error occurred while fetching random book
      }
    };

    handleRandomBook();
  }, []);

  // Function to handle dialog box close
  const handleClose = () => {
    setOpen(false); // Close dialog box
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      {bookInfo && (
        <DialogBox open={open} handleClose={handleClose} bookInfo={bookInfo} />
      )}
    </div>
  );
}
