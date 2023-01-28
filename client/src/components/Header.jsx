import { Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/HeaderMQ.css";

const Header = (props) => {
  let navigate = useNavigate();
  let [iconColor, setIconColor] = useState("white");
  let [iconImg, setIconImg] = useState(true);

  const handleClick = (e) => {
    let navPoint = e.target.id;
    navigate(`${navPoint}`);
  };

  const changeMode = () => {
    if (props.darkMode === "background-dark") {
      props.setDarkMode("background-light");
      setIconColor("rgb(40, 39, 66)");
      setIconImg(false);
    }
    if (props.darkMode === "background-light") {
      props.setDarkMode("background-dark");
      setIconColor("white");
      setIconImg(true);
    }
  };

  //   useEffect(() => {}, [iconImg]);

  return (
    <Grid
      id="header-main-container"
      className={`${props.darkMode} `}
      container
      direction="row"
      justifyContent="space between"
      alignContent="center"
      sx={{
        borderBottom: "solid",
        position: "sticky",
        top: "0",
        backgroundColor: "white",
        zIndex: "2",
      }}
    >
      <Grid
        container
        id="DM-button-container"
        justifyContent="center"
        item
        xs={0}
        md={4}
      >
        <Button
          disableRipple
          style={{ backgroundColor: "transparent" }}
          onClick={changeMode}
        >
          {iconImg ? (
            <lord-icon
              src="https://cdn.lordicon.com/hsjzfumd.json"
              trigger="loop-on-hover"
              style={{ width: "5em", height: "5em" }}
            ></lord-icon>
          ) : (
            <lord-icon
              src="https://cdn.lordicon.com/vfbsedgx.json"
              trigger="loop-on-hover"
              colors="primary:#2516c7,secondary:#a66037"
              style={{ width: "5em", height: "5em" }}
            ></lord-icon>
          )}
        </Button>
      </Grid>
      <Grid id="title-container" item xs={12} md={4}>
        <Container sx={{ fontSize: "1.5em", height: "50%" }}>
          <h1
            id="title-container-in"
            className="marginless  clickable"
            onClick={handleClick}
          >
            <span className="ubuntu">VIN</span>
            <span className="cedar">query</span>
          </h1>
        </Container>
      </Grid>
      <Grid id="login-signup-container-out" item xs={12} md={4}>
        <Container
          id="login-signup-container-in"
          sx={{ width: "100%", margin: "0", mb: "5%" }}
        >
          <h1
            id="login-signup"
            className="login-signup clickable"
            onClick={handleClick}
          >
            {props.login}
          </h1>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Header;
