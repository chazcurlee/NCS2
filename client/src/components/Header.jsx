import { Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaRebel, FaEmpire } from "react-icons/fa";
import { useState, useEffect } from "react";

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
      className={`${props.darkMode}`}
      container
      direction="row"
      justifyContent="space between"
      alignContent="center"
      sx={{
        borderBottom: "solid",
        position: "sticky",
        top: "0",
        backgroundColor: "white",
        zIndex: "1",
      }}
    >
      <Grid container justifyContent="center" item xs={0} md={4}>
        <Button onClick={changeMode}>
          {iconImg ? (
            <FaEmpire size="2em" color={`${iconColor}`} />
          ) : (
            <FaRebel size="2em" color={`${iconColor}`} />
          )}
        </Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <Container sx={{ width: "50%" }}>
          <h1 id="/" className="header-title clickable" onClick={handleClick}>
            VINquery
          </h1>
        </Container>
      </Grid>
      <Grid item xs={12} md={4}>
        <Container sx={{ width: "40%" }}>
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
