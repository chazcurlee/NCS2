import { Paper, Box, Container, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/DetailsMQ.css";
import CarCarousel from "../components/CarCarousel";

const youtubesearchapi = require("youtube-search-api");

// Pull the select information from the VIN API into this object
let filteredCarInfo = {
  Make: "",
  Model: "",
  Body: "",
  Year: "",
  Trans: "",
  Drive: "",
  Engine: "",
  Turbo: "",
  Speed: "",
  Price: "",
};

const Details = (props) => {
  let { vin, date } = useParams();
  const navigate = useNavigate();
  // Initial state where the full VIN API is placed
  let [carInfo, setCarInfo] = useState({});
  // States that help ensure correct order in useEffect's rerenders
  let [lock, setLock] = useState(false);
  let [refresh, setRefresh] = useState(false);
  let [final, setFinal] = useState(false);
  // Put the full Youtube API here initially
  let [videoReview, setVideoReview] = useState([]);
  // Pull YT videos' relevant data here to help iterate in carousel
  let [id, setId] = useState([]);
  let [title, setTitle] = useState([]);
  let [thumbnailUrl, setThumbnailUrl] = useState([]);
  let [vidHeight, setVidHeight] = useState([]);
  let [vidWidth, setVidWidth] = useState([]);
  // Index markers for VIN API [Make, Model, Year, Price, Body Class, Trans, Drive, Engine, Turbo, Speed]
  let markers = [7, 9, 10, 21, 23, 49, 51, 79, 87, 88];

  // Gives functionality to the back button
  const handleBack = () => {
    navigate("/");
  };

  // Pulls VIN info from provided VIN, then filters relevant info into filteredCarInfo object, uses the car's make/model/year to pull 6 YT videos into videoReview state array. Finally, map videoReview's information into associated state for use in the CarCarousel later.
  useEffect(() => {
    const getVinInfo = async () => {
      let results = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json&modelyear=${date}`
      );
      setCarInfo(results.data.Results);
      setLock(true);
    };
    if (!lock) {
      getVinInfo();
    }

    const updateCar = async () => {
      markers.forEach((x) => {
        let entry = carInfo[x].Value;

        if (x === 87) {
          filteredCarInfo.Turbo = entry;
        }
        if (x === 88) {
          filteredCarInfo.Speed = entry;
        }
        if (x === 79) {
          filteredCarInfo.Engine = entry;
        }
        if (x === 51) {
          filteredCarInfo.Drive = entry;
        }
        if (x === 49) {
          filteredCarInfo.Trans = entry;
        }
        if (x === 23) {
          filteredCarInfo.Body = entry;
        }
        if (x === 21) {
          filteredCarInfo.Price = entry;
        }
        if (x === 10) {
          filteredCarInfo.Year = entry;
        }
        if (x === 9) {
          filteredCarInfo.Model = entry;
        }
        if (x === 7) {
          filteredCarInfo.Make = entry;
        }
      });

      for (let key in filteredCarInfo) {
        if (filteredCarInfo[key] === null) {
          filteredCarInfo[key] = "Not Available";
        }
      }

      let car = filteredCarInfo.Make
        ? filteredCarInfo.Make +
          " " +
          filteredCarInfo.Model +
          " " +
          filteredCarInfo.Year +
          " review"
        : "How to look up a car's VIN";

      let image = await youtubesearchapi.GetListByKeyword(
        `${car}`,
        [true],
        [6],
        [{ type: "video" }]
      );
      setVideoReview(image.items);

      setRefresh(true);
    };

    const finalPush = () => {
      videoReview.map((info) => {
        setId((prevState) => [...prevState, info.id]);
        setTitle((prevState) => [...prevState, info.title]);
        setThumbnailUrl((prevState) => [
          ...prevState,
          info.thumbnail.thumbnails[0].url,
        ]);
        setVidHeight((prevState) => [
          ...prevState,
          info.thumbnail.thumbnails[0].height,
        ]);
        setVidWidth((prevState) => [
          ...prevState,
          info.thumbnail.thumbnails[0].width,
        ]);
      });
      setFinal(true);
    };

    if (lock && !refresh) {
      updateCar();
    }
    if (lock && refresh && !final) {
      finalPush();
    }
  }, [lock, refresh, final]);

  return final ? (
    <Box
      id="details-container"
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridTemplateRows="repeat(12, 1fr)"
      gap={2}
      className={props.darkMode}
      sx={{
        height: "100%",
      }}
    >
      <Box
        id="paper-placement-grid"
        gridColumn="4 / 10"
        gridRow="2 / 12"
        className={props.darkMode}
        sx={{
          height: "80vh",
        }}
      >
        <Paper
          id="details-paper"
          sx={{
            backgroundColor: `${props.paperBg}`,
            borderRadius: "50px",
            color: "white",
            height: "100%",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Box
            id="paper-grid-outer"
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridTemplateRows="repeat(16, 1fr)"
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            <Box
              id="paper-grid-inner"
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gridTemplateRows="repeat(12, 1fr)"
              gridColumn="span 12"
              gridRow=" span 7"
            >
              <Box id="back-container" gridColumn=" 1" gridRow="1">
                <Button
                  id="back-button"
                  onClick={handleBack}
                  sx={{ borderRadius: "50px" }}
                >
                  <lord-icon
                    id="back-icon"
                    src="https://cdn.lordicon.com/lcdoymrv.json"
                    trigger="hover"
                    style={{ width: "2em", height: "2em" }}
                  ></lord-icon>
                </Button>
              </Box>
              <Box id="vin-box" gridColumn="4 / 10" gridRow="1">
                <Container id="vin-container">
                  <h3 id="vin">VIN: {vin}</h3>
                </Container>
              </Box>
              <Box
                id="info-container-left"
                display="grid"
                gridTemplateColumns="1fr"
                gridTemplateRows="repeat(5, 1fr)"
                gridColumn="1 / 7"
                gridRow="2 / 13"
                sx={{
                  textAlign: "left",
                }}
              >
                <Container>
                  <p>Make: {filteredCarInfo.Make}</p>
                </Container>
                <Container>
                  <p>Model: {filteredCarInfo.Model}</p>
                </Container>
                <Container>
                  <p>Body Style: {filteredCarInfo.Body}</p>
                </Container>
                <Container>
                  <p>Year: {filteredCarInfo.Year}</p>
                </Container>
                <Container>
                  <p>Transmission Style: {filteredCarInfo.Trans}</p>
                </Container>
              </Box>
              <Box
                id="info-container-right"
                display="grid"
                gridTemplateColumns="1fr"
                gridTemplateRows="repeat(5, 1fr)"
                gridColumn="7 / 13"
                gridRow="2 / 13"
                sx={{
                  textAlign: "left",
                }}
              >
                <Container>
                  <p>Drive Type: {filteredCarInfo.Drive}</p>
                </Container>
                <Container>
                  <p>Engine Configuration: {filteredCarInfo.Engine}</p>
                </Container>
                <Container>
                  <p>Turbo: {filteredCarInfo.Turbo}</p>
                </Container>
                <Container>
                  <p>Top Speed: {filteredCarInfo.Speed}</p>
                </Container>
                <Container>
                  <p>Base Price: {filteredCarInfo.Price}</p>
                </Container>
              </Box>
            </Box>

            <CarCarousel
              id={id}
              title={title}
              thumbnailUrl={thumbnailUrl}
              vidHeight={vidHeight}
              vidWidth={vidWidth}
              darkMode={props.darkMode}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  ) : (
    <Box sx={{ height: "100vh" }}>
      <lord-icon
        src="https://cdn.lordicon.com/pxruxqrv.json"
        trigger="loop"
        style={{ width: "250px", height: "250px" }}
      ></lord-icon>
    </Box>
  );
};

export default Details;
