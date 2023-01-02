import * as React from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Copyright from "../../../components/Footer";
import MenuAdmin from "../../../components/MenuAdmin";
import api from "../../../services/api";

interface User {
  _id: number;
  name: string;
  email: string;
  type: number;
  createdAt: string;
  updatedAt: string;
}

export default function UserListing() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/api/users");
      setUsers(response.data);
    }
    loadUsers();
  }, [handleDelete]);

  async function handleDelete(id: number, name: string) {
    if (window.confirm(`Você deseja excluir ${name}?`)) {
      await api.delete("/api/users/" + id);
    }
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
              <h1>Listagem de Usuários</h1>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Nome</TableCell>
                          <TableCell align="center">E-mail</TableCell>
                          <TableCell align="center">Tipo</TableCell>
                          <TableCell align="center">Data cadastro</TableCell>
                          <TableCell align="center">Data modificação</TableCell>
                          <TableCell align="right">Opções</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((user: User) => (
                          <TableRow
                            key={user._id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {user.name}
                            </TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">
                              {user.type === 1 ? (
                                <Chip label="Administrador" color="primary" />
                              ) : (
                                <Chip label="Funcionário" color="secondary" />
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {new Date(user.createdAt).toLocaleString("pt-br")}
                            </TableCell>
                            <TableCell align="center">
                              {new Date(user.updatedAt).toLocaleString("pt-br")}
                            </TableCell>
                            <TableCell align="right">
                              <ButtonGroup aria-label="outlined primary button group">
                                <Link to={"/admin/users/edit/" + user._id}>
                                  <IconButton color="primary" aria-label="Edit">
                                    <EditIcon />
                                  </IconButton>
                                </Link>
                                <IconButton
                                  aria-label="Delete"
                                  onClick={() =>
                                    handleDelete(user._id, user.name)
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
