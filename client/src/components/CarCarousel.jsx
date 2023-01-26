import { Box } from "@mui/material";
import { useState, useEffect } from "react";

const CarCarousel = (props) => {
  let [vidScroll, setVidScroll] = useState(0);
  let [visi, setVisi] = useState("");

  const handleClick = (num) => {
    if (vidScroll + num < 0) {
      setVidScroll(5);
      return;
    }
    if (vidScroll + num > 5) {
      setVidScroll(0);
      return;
    }
    setVidScroll(vidScroll + num);
  };

  const hideHead = () => {
    console.log("test");
    setVisi("hidden");
  };

  useEffect(() => {}, [vidScroll, visi]);

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridTemplateRows="repeat(12, 1fr)"
      gridColumn="span 12"
      gridRow="8 / 17"
      sx={{
        borderTop: "solid",
        backgroundColor: "black",
      }}
    >
      <Box
        gridColumn="5 / 9"
        gridRow="1"
        className={`${visi}`}
        sx={{
          borderRight: "solid",
          borderBottom: "solid",
          borderLeft: "solid",
          borderColor: "grey",
          zIndex: "1",
          backgroundColor: "grey",
          opacity: "0.95",
        }}
      >
        Reviews
      </Box>
      <Box
        gridColumn="1"
        gridRow="5 / 8"
        sx={{
          borderTop: "solid",
          borderBottom: "solid",
          borderRight: "solid",
          borderColor: "grey",
          zIndex: "1",
          backgroundColor: "grey",
          opacity: "0.5",
        }}
        onClick={() => {
          handleClick(-1);
        }}
      ></Box>
      <Box
        className="TEST"
        gridColumn="1 / 13"
        gridRow="2 / 13"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridTemplateRows="repeat(12, 1fr"
        sx={{
          zIndex: "-1",
        }}
      >
        <Box
          gridColumn=" span 12"
          gridRow="1 / 12"
          sx={{
            height: "100%",
            width: "100%",
            cursor: "pointer",
          }}
          onClick={hideHead}
        >
          <iframe
            src={`https://www.youtube.com/embed/${props.id[vidScroll]}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen={true}
            title="video"
            height="100%"
            width="800px"
          />
        </Box>
      </Box>
      <Box
        gridColumn="12"
        gridRow="5 / 8"
        sx={{
          borderTop: "solid",
          borderBottom: "solid",
          borderLeft: "solid",
          borderColor: "grey",
          zIndex: "1",
          backgroundColor: "grey",
          opacity: "0.5",
        }}
        onClick={() => {
          handleClick(1);
        }}
      ></Box>
    </Box>
  );
};

export default CarCarousel;
