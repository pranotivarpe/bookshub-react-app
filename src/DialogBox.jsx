import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function DialogBox({ open, handleClose, bookInfo }) {
  if (!bookInfo) {
    return null;
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        style={{
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {bookInfo.title}
      </DialogTitle>
      <DialogContent>
        <img
          src={bookInfo.cover}
          alt={bookInfo.title}
          style={{
            maxWidth: "100%",
            height: "400px",
            marginBottom: "10px",
          }}
        />
        <Typography variant="subtitle1">
          Author: {bookInfo.author.first_name} {bookInfo.author.last_name}
        </Typography>
        <Typography>Pages: {bookInfo.pages}</Typography>
        <Typography>Genres: {bookInfo.genres.join(", ")}</Typography>
        <Typography>Rating: {bookInfo.rating}</Typography>
        <Typography>Plot: {bookInfo.plot}</Typography>
        <br />
        <Button
          variant="contained"
          color="primary"
          href={bookInfo.url}
          target="_blank"
          onClick={handleClose}
        >
          Buy Now
        </Button>
      </DialogContent>
    </Dialog>
  );
}
