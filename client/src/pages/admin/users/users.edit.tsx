import * as React from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Copyright from "../../../components/Footer";
import MenuAdmin from "../../../components/MenuAdmin";
import api from "../../../services/api";

export default function UsersEdit() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [type, setType] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { _id } = useParams();

  React.useEffect(() => {
    async function getUser() {
      let response = await api.get("api/users/" + _id);
      setName(response.data.name);
      setEmail(response.data.email);
      setType(response.data.type);
      setPassword(response.data.password);
    }
    getUser();
  }, []);

  async function handleSubmit() {
    const data = { _id, name, email, type, password };

    if (name && email && type && password !== "") {
      const response = await api.put("/api/users", data);

      if (response.status === 200) window.location.href = "/admin/users";
      else alert("Erro ao atualizar usuário!");
    } else alert("Por favor, prencha todos os campos");
  }

  return (
    <MenuAdmin title="Usuários">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2>Atualição de usuário</h2>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Nome completo"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="E-mail"
                    fullWidth
                    autoComplete="email"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="type-label">Tipo</InputLabel>
                    <Select
                      labelId="type-label"
                      id="type"
                      label="Tipo"
                      required
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <MenuItem value={1}>Administrador</MenuItem>
                      <MenuItem value={2}>Funcionário</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    id="password"
                    name="password"
                    label="Senha"
                    fullWidth
                    variant="standard"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button variant="contained" onClick={handleSubmit}>
                    Salvar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </MenuAdmin>
  );
}
