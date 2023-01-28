import { Box, Grid, Container, Paper, Button, Input } from "@mui/material";
import "../styles/LogSignMQ.css";
import { useState } from "react";

const LoginSignUp = (props) => {
  let [userNameLog, setUserNameLog] = useState("");
  let [passLogin, setPassLogin] = useState("");
  let [userLoginError, setUserLoginError] = useState(false);
  let [passLoginError, setPassLoginError] = useState(false);

  let [userNameSign, setUserNameSign] = useState("");
  let [passSign, setPassSign] = useState("");
  let [userSignError, setUserSignError] = useState(false);
  let [passSignError, setPassSignError] = useState(false);

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    let newUser = userNameLog.replace(/\s/g, "");
    let newPass = passLogin.replace(/\s/g, "");
    let unnull = undefined || null;

    if (newPass === "" || unnull) {
      console.log("test");
      setPassLoginError(true);
      setUserNameLog("");
      setPassLogin("");
      alert("Please do not use only spaces for Username/Password");
      return;
    }
    if (newUser === "" || unnull) {
      setUserLoginError(true);
      setUserNameLog("");
      setPassLogin("");
      alert("Please do not use only spaces for Username/Password");
      return;
    }
    props.setLogin(userNameLog);
    setUserNameLog("");
    setPassLogin("");
  };

  const handleSubmitSign = (e) => {
    e.preventDefault();
    let newUser = userNameSign.replace(/\s/g, "");
    let newPass = passSign.replace(/\s/g, "");
    let unnull = undefined || null;
    if (newPass === "" || unnull) {
      setPassSignError(true);
      setUserNameLog("");
      setPassSign("");
      alert("Please do not use only spaces for Username/Password");
      return;
    }
    if (newUser === "" || unnull) {
      setUserSignError(true);
      setUserNameSign("");
      setPassSign("");
      alert("Please do not use only spaces for Username/Password");
      return;
    }

    props.setLogin(userNameSign);
    setUserNameSign("");
    setPassSign("");
  };

  const handleChange = (e) => {
    let id = e.target.id;
    let entry = e.target.value;
    if (id === "log-user") {
      setUserNameLog(entry);
    }
    if (id === "log-pass") {
      setPassLogin(entry);
    }
    if (id === "sign-user") {
      setUserNameSign(entry);
    }
    if (id === "sign-pass") {
      setPassSign(entry);
    }
  };

  return (
    <Grid
      container
      id="sign-log-container-outer"
      justifyContent="center"
      alignContent="center"
    >
      <Grid
        item
        id="sign-log-container-inner"
        container
        direction="column"
        justifyContent="center"
        alignContent="center"
      >
        <Box id="sign-log-paper-container" sx={{ height: "100vh" }}>
          <Paper
            id="sign-log-paper"
            sx={{
              mt: "10%",
              width: "50vw",
              height: "50%",
              backgroundColor: `${props.paperBg}`,
              color: "white",
              backdropFilter: "blur(10px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Box
              id="sign-log-paper-grid"
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gridTemplateRows="repeat(12, 1fr)"
              sx={{ height: "100%", width: "100%" }}
            >
              <Box
                id="sign-up-half"
                gridColumn="1 / 7"
                gridRow="span 12"
                display="grid"
                gridTemplateRows="repeat(10, 1fr)"
                gridTemplateColumns="repeat(6, 1fr)"
                sx={{ height: "100%" }}
              >
                <Box id="sign-up-icon-container" gridColumn="2 / 6" gridRow="2">
                  <lord-icon
                    src="https://cdn.lordicon.com/nqceprvq.json"
                    trigger="hover"
                    style={{ width: "5em", height: "5em" }}
                  ></lord-icon>
                </Box>

                <Box
                  id="sign-up-title-container"
                  gridColumn="2 / 6"
                  gridRow="3 / 7"
                >
                  <Container>
                    <h1>Register</h1>
                  </Container>
                  <form onSubmit={handleSubmitSign}>
                    <Box
                      id="sign-user-container"
                      gridColumn="2 / 6"
                      gridRow="5"
                    >
                      <Input
                        id="sign-user"
                        value={`${userNameSign}`}
                        error={userSignError}
                        required
                        onChange={handleChange}
                        variant="standard"
                        placeholder="Username"
                        sx={{ color: "white" }}
                      />
                    </Box>
                    <Box
                      id="sign-pass-container"
                      gridColumn="2 / 6"
                      gridRow="6"
                      sx={{ margin: "10px" }}
                    >
                      <Input
                        id="sign-pass"
                        value={`${passSign}`}
                        error={passSignError}
                        required
                        type="password"
                        onChange={handleChange}
                        variant="standard"
                        placeholder="Password"
                        sx={{ color: "white" }}
                      />
                    </Box>
                    <Box
                      id="signup-button-container"
                      gridColumn="2 / 6"
                      gridRow="7"
                    >
                      <Button
                        disableRipple
                        id="signup-button"
                        type="submit"
                        sx={{ color: "white" }}
                        style={{ backgroundColor: "transparent" }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/ifmfvlun.json"
                          trigger="click"
                          style={{ width: "3em", height: "3em" }}
                        ></lord-icon>
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Box>
              <Box
                id="login-half"
                display="grid"
                gridColumn="7 / 13"
                gridRow="span 12"
                gridTemplateRows="repeat(10, 1fr)"
                gridTemplateColumns="repeat(6, 1fr)"
                sx={{ height: "100%" }}
              >
                <Box id="login-icon-container" gridColumn=" 2 / 6" gridRow="2">
                  <lord-icon
                    src="https://cdn.lordicon.com/mzyardkq.json"
                    trigger="hover"
                    style={{ width: "5em", height: "5em" }}
                  ></lord-icon>
                </Box>
                <Box
                  id="login-form-container"
                  gridColumn=" 2 / 6"
                  gridRow="3 / 6"
                >
                  <form onSubmit={handleSubmitLogin}>
                    <Container>
                      <h1>Login</h1>
                    </Container>

                    <Box id="log-user-container" gridColumn="2 / 6" gridRow="4">
                      <Input
                        id="log-user"
                        value={`${userNameLog}`}
                        error={userLoginError}
                        required
                        onChange={handleChange}
                        autoFocus
                        variant="standard"
                        placeholder="Username"
                        sx={{ color: "white" }}
                      />
                    </Box>
                    <Box
                      id="log-pass-container"
                      gridColumn="2 / 6"
                      gridRow="5"
                      sx={{ margin: "10px" }}
                    >
                      <Input
                        id="log-pass"
                        value={`${passLogin}`}
                        error={passLoginError}
                        required
                        type="password"
                        onChange={handleChange}
                        variant="standard"
                        placeholder="Password"
                        sx={{ color: "white" }}
                      />
                    </Box>
                    <Box
                      id="login-button-container"
                      gridColumn="2 / 6"
                      gridRow="6"
                    >
                      <Button
                        disableRipple
                        id="login-button"
                        type="submit"
                        sx={{ color: "white" }}
                        style={{ backgroundColor: "transparent" }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/ifmfvlun.json"
                          trigger="click"
                          style={{ width: "3em", height: "3em" }}
                        ></lord-icon>
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginSignUp;
