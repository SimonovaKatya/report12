import React, { useRef, useState } from "react";
import { TextField } from "@material-ui/core";
import { AuthApi } from "../../api";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./auth.module.scss";

const Auth = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const loginInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();
  const onAuth = async () => {
    setLoading(true);
    const login = loginInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    if (!login || !password) {
      setError("Заполните все поля");
      return;
    }
    const result = await AuthApi.auth(login, password);
    if (!result) {
      setError("Неверный логин или пароль");
      return;
    }
    setError("");
    setLoading(false);
    history.push("/cabinet/reports");
  };

  const onPushEnter = async (e: any) => {
    if (e.key === "Enter") {
      await onAuth();
    }
  };
  return (
    <Container onKeyUp={onPushEnter} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="e-mail"
            label="e-mail"
            name="e-mail"
            autoComplete="e-mail"
            autoFocus
            inputRef={loginInputRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordInputRef}
          />
          {loading && <CircularProgress />}
          {error && <div className={styles.error}>{error}</div>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
            onClick={onAuth}
          >
            Войти
          </Button>
          <Grid container className={styles.link}>
            <Grid item>
              <Link href="#" variant="body2">
                {"Забыли пароль?"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default Auth;
