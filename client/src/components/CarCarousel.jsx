import { Box } from "@mui/material";
import { useState, useEffect } from "react";

const CarCarousel = (props) => {
  // State used to provide functioanlity to the carousel scroller
  let [vidScroll, setVidScroll] = useState(0);

  // Right arrow is given 1 and left arrow is given -1 as arguments to make this carousel functional
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

  // Simple rerender after scroll in carousel
  useEffect(() => {}, [vidScroll]);

  return (
    <Box
      id="carousel-container"
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
        id="reviews-title-card"
        gridColumn="6 / 8"
        gridRow="1"
        sx={{
          borderColor: "grey",
          zIndex: "1",
          backgroundColor: "grey",
          opacity: "0.95",
          borderRadius: "5px",
          height: "1.5em",
          width: "100%",
        }}
      >
        Reviews
      </Box>
      <Box
        id="left-arrow-container"
        className="arrow"
        gridColumn="1"
        gridRow="5 / 8"
        sx={{
          zIndex: "1",
          backgroundColor: "transparent",
          opacity: "0.5",
        }}
        onClick={() => {
          handleClick(-1);
        }}
      >
        <lord-icon
          src="https://cdn.lordicon.com/yjtftsvu.json"
          trigger="click"
          style={{ width: "100%", height: "100%" }}
        ></lord-icon>
      </Box>
      <Box
        id="video-outer-container"
        gridColumn="1 / 13"
        gridRow="2 / 12"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridTemplateRows="repeat(12, 1fr"
        sx={{
          zIndex: "-1",
        }}
      >
        <Box
          id="video-inner-container"
          gridColumn=" span 12"
          gridRow="1 / 13"
          sx={{
            height: "100%",
            width: "100%",
            cursor: "pointer",
            mb: "20px",
          }}
        >
          <iframe
            id="video-player"
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
        id="right-arrow-container"
        className="arrow"
        gridColumn="12"
        gridRow="5 / 8"
        sx={{
          zIndex: "1",
          backgroundColor: "transparent",
          opacity: "0.5",
        }}
        onClick={() => {
          handleClick(1);
        }}
      >
        <lord-icon
          src="https://cdn.lordicon.com/exwhxwbm.json"
          trigger="click"
          style={{
            width: "100%",
            height: "100%",
          }}
        ></lord-icon>
      </Box>
    </Box>
  );
};

export default CarCarousel;
