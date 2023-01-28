import { Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/HomeMQ.css";

const Home = (props) => {
  let navigate = useNavigate();
  let [vin, setVin] = useState("");
  let [date, setDate] = useState();
  let [error, setError] = useState(false);
  let [helpText, setHelpText] = useState("");

  // Accepts users vin
  const handleChangeVin = (e) => {
    let vinUp = e.target.value;
    setVin(vinUp);
  };

  // Accepts users model year (optional)
  const handleChangeDate = (e) => {
    let tempDate = e.target.value;
    setDate(tempDate);
  };

  // Determines if character length matches standard VIN count (17) then navigates to details page with info in tow
  const handleSubmit = (e) => {
    e.preventDefault();
    let charCount = Array.from(vin).length;
    if (charCount != 17) {
      setError(true);
      setHelpText("Please enter a valid 17 character VIN");
      return;
    }
    navigate(`details/${vin}/${date}`);
  };

  return (
    <Box
      id="home-container"
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridTemplateRows="1fr 5% 1fr 1fr 1fr 1fr 1fr"
      justifyContent="center"
      alignContent="center"
    >
      <Box
        id="home-icon-container"
        gridColumn="5 / 9"
        gridRow="1"
        sx={{ alignSelf: "flex-end" }}
      >
        <lord-icon
          src="https://cdn.lordicon.com/uidunjrg.json"
          trigger="loop"
          colors="primary:#911710,secondary:#1b1091"
          style={{ width: "250px", height: "250px" }}
        ></lord-icon>
      </Box>
      <Box
        id="home-quote-container"
        gridColumn="6 / 8"
        gridRow="2"
        display="flex"
        justifyContent="center"
        alignContent="center"
        sx={{
          height: "50%",

          alignSelf: "flex-start",
        }}
      >
        <h3 className="marginless">Enter VIN Number and Model Year</h3>
      </Box>
      <Box
        id="home-field-container"
        gridColumn="6 / 8"
        gridRow="3"
        sx={{ width: "20vw" }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            className="no-border"
            sx={{
              backgroundColor: "white",
              mr: "10px",
              width: "100%",
              borderRadius: "50px",
            }}
            variant="outlined"
            placeholder="VIN"
            error={error}
            helperText={helpText}
            onChange={handleChangeVin}
          />
          <TextField
            className="no-border"
            variant="outlined"
            onChange={handleChangeDate}
            placeholder="Model Year"
            sx={{
              width: "100%",
              mt: "10px",
              borderRadius: "50px",
              backgroundColor: "white",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: "50px",
              display: "block",
              width: "100%",
              mt: "10px",

              backgroundColor: "#9f9aff",
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Home;
