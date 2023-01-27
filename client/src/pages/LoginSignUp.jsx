import { Box, Grid, Container, Paper, Button, TextField } from "@mui/material";
import { useState } from "react";

const LoginSignUp = (props) => {
  return (
    <Grid
      className={`${props.darkMode}`}
      container
      justifyContent="center"
      alignContent="center"
    >
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignContent="center"
      >
        <Box sx={{ height: "100vh" }}>
          <Paper
            sx={{
              mt: "50px",
              width: "50vw",
              height: "50%",
              backgroundColor: "rgb(69, 68, 114, 0.5)",
            }}
          >
            <Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gridTemplateRows="repeat(12, 1fr)"
              sx={{ height: "100%", width: "100%" }}
            >
              <Box
                gridColumn="1 / 7"
                gridRow="span 12"
                display="grid"
                gridTemplateRows="repeat(10, 1fr)"
                gridTemplateColumns="repeat(6, 1fr)"
                sx={{ height: "100%" }}
              >
                <Box gridColumn="2 / 6" gridRow="3 / 5">
                  <Container>
                    <h1>Sign Up!</h1>
                  </Container>
                </Box>
                <Box gridColumn="2 / 6" gridRow="5">
                  <Button>
                    {">"}Click Here{"<"}
                  </Button>
                </Box>
              </Box>
              <Box
                display="grid"
                gridColumn="7 / 13"
                gridRow="span 12"
                gridTemplateRows="repeat(10, 1fr)"
                gridTemplateColumns="repeat(6, 1fr)"
                sx={{}}
              >
                <Box gridColumn=" 2 / 6" gridRow="3">
                  <Container>
                    <h1>Login</h1>
                  </Container>
                </Box>

                <Box gridColumn="2 / 6" gridRow="4">
                  <TextField variant="standard" label="Username" />
                </Box>
                <Box gridColumn="2 / 6" gridRow="5">
                  <TextField variant="standard" label="Password" />
                </Box>
                <Box gridColumn="2 / 6" gridRow="6">
                  <Button id="login-button">Login</Button>
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
