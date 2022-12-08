import { useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/Login.svg";

const theme = createTheme({
  palette: {
    background: {
      // default: "#ADD8E6",
    },
    primary: {
      main: "#1056AF",
    },
    secondary: {
      main: "#000000",
    },
  },
});

export default function LogIn({ gun, user }) {
  const navigate = useNavigate();

  useEffect(() => {
    /*
    if (user.is) navigate("/homepage");*/
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user_ = data.get("user");
    const pass_ = data.get("password");

    user.auth(user_, pass_, ({ err }) => {
      if (err) {
        alert(err);
      } else {
        navigate("/");
      }
    });
  };

  const handleCreate = (event) => {
    event.preventDefault();
    navigate("/create_account");
    // navigate('/homepage');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <Logo height="300px" width="300px" />
          </div>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="user"
              label="User Name"
              name="user"
              autoComplete="user"
              autoFocus
              sx={{ input: { color: "primary.main" } }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{ input: { color: "primary.main" } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 3, bgcolor: "primary.main" }}
            >
              Log In
            </Button>
            <Grid container spacing={0.5} justifyContent="center">
              <Grid item>
                <Typography component="h1" variant="body2" sx={{ mt: 0.4 }}>
                  Don't have an account?
                </Typography>
              </Grid>
              <Grid item>
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleCreate}
                  color="primary.main"
                  underline="hover"
                >
                  {"Create Account"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
