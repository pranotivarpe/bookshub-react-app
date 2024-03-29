import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function MultiActionAreaCard() {
  const [books, setBooks] = useState([]); // State for storing books data
  const [selectedBook, setSelectedBook] = useState(null); // State for selected book
  const [openDialog, setOpenDialog] = useState(false); // State for dialog box open/close
  const [favorites, setFavorites] = useState([]); // State for favorite books

  // Fetching books data from API on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      const url = "https://books-api7.p.rapidapi.com/books?p=2";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "70b379b545msh048cf3e04bd4c99p1855e4jsnd75037ac450f",
          "X-RapidAPI-Host": "books-api7.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options); // Fetch books data
        const data = await response.json(); // Parse response data
        setBooks(data); // Set books data
      } catch (error) {
        console.error(error); // Log error if fetching books data fails
      }
    };

    fetchBooks();
  }, []);

  // Function to handle click on a book card
  const handleBookClick = (book) => {
    setSelectedBook(book); // Set selected book
    setOpenDialog(true); // Open dialog box
  };

  // Function to handle dialog box close
  const handleCloseDialog = () => {
    setOpenDialog(false); // Close dialog box
    setSelectedBook(null); // Reset selected book
  };

  // Function to toggle favorite status of a book
  const toggleFavorite = (book) => {
    if (favorites.includes(book)) {
      setFavorites(favorites.filter((favBook) => favBook !== book)); // Remove book from favorites
    } else {
      setFavorites([...favorites, book]); // Add book to favorites
    }
  };

  return (
    <Box mt={4} mx={8}>
      {/* Grid to display book cards */}
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
            {/* Card displaying book information */}
            <Card sx={{ maxWidth: 280 }} onClick={() => handleBookClick(book)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  width="150"
                  image={book.cover}
                  alt={book.title}
                  sx={{ objectFit: "contain" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${book.author.first_name} ${book.author.last_name}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {book.rating}
                  </Typography>
                </CardContent>
              </CardActionArea>
              {/* Card actions */}
              <CardActions sx={{ justifyContent: "space-between" }}>
                {/* Button to navigate to book URL */}
                <Button size="small" color="primary" href={book.url}>
                  Buy Now
                </Button>
                {/* Favorite icon to toggle favorite status */}
                {favorites.includes(book) ? (
                  <FavoriteIcon
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(book);
                    }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    color="black"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(book);
                    }}
                  />
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Dialog box to display book details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle
          style={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {selectedBook && selectedBook.title}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Author:{" "}
            {selectedBook &&
              `${selectedBook.author.first_name} ${selectedBook.author.last_name}`}
          </Typography>
          <Typography>Pages: {selectedBook && selectedBook.pages}</Typography>
          <Typography>
            Genres: {selectedBook && selectedBook.genres.join(", ")}
          </Typography>
          <Typography variant="body1">
            Rating: {selectedBook && selectedBook.rating}
          </Typography>
          <Typography>Plot: {selectedBook && selectedBook.plot}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
