import { Grid, Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Home = (props) => {
  let navigate = useNavigate();
  let [vin, setVin] = useState("");
  let [date, setDate] = useState();

  const handleChangeVin = (e) => {
    let vinUp = e.target.value;
    setVin(vinUp);
  };

  const handleChangeDate = (e) => {
    let tempDate = e.target.value;
    setDate(tempDate);
  };

  const handleSubmit = () => {
    navigate(`details/${vin}/${date}`);
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridTemplateRows="repeat(6, 1fr)"
      justifyContent="center"
      alignContent="center"
    >
      <Box gridColumn="6 / 8" gridRow="2">
        <h3>Enter VIN Number and Model Year</h3>
      </Box>
      <Box gridColumn="6 / 8" gridRow="3" sx={{ width: "20vw" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{
              //   position: "relative",
              backgroundColor: "white",
              mr: "10px",
              color: "#9f9aff",
              width: "100%",
              borderRadius: "50px",
            }}
            variant="outlined"
            placeholder="VIN"
            onChange={handleChangeVin}
          />
          <TextField
            variant="outlined"
            onChange={handleChangeDate}
            placeholder="Model Year"
            sx={{
              backgroundColor: "white",
              width: "100%",
              mt: "10px",
              borderRadius: "50px",
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
