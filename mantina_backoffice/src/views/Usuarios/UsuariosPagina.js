import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Snackbar from '@mui/material/Snackbar';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from '@mui/material/Button';

import NewIcon from "@mui/icons-material/PersonAdd";
import Edit from "@mui/icons-material/Edit";
import Remove from "@mui/icons-material/DeleteForever";

import MuiAlert from '@mui/material/Alert';

import { deleteUser, getUsers } from '../../utils/api';
import { Rotate90DegreesCcwSharp } from '@mui/icons-material';

const useStyles1 = makeStyles()((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


//aca debe recibir el user id.
function TablePaginationActions(props) {

  const { classes } = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles()({
  table: {
    minWidth: 500,
  },
});

export default function CustomPaginationActionsTable() {
  const { classes } = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = 2;

  const [severityAlert, setSeverityAlert] = React.useState("");
  const [msgAlert, setMsgAlert] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);

  const [usersDB, setUsers] = React.useState([]);
  const [rows, setRow] = React.useState([]);

  useEffect(() => {
    if (usersDB.length == 0) {
      getUsers()
        .then(json => {
          setUsers(json.data.users);
          setDataToRow(json.data.users);
        })
        .catch(error => {
          // do something with the error (report it, etc.)
        });
    }
  })

  const createData = (id, name, email, is_admin) => {
    return { id, name, email, is_admin }
  }

  const setDataToRow = (usersFromDB) => {
    setRow(usersFromDB.map((users) => createData(users.id_user, users.name, users.email, users.is_admin)))
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickEditUser = (value) => {
    window.location.replace("/editarUsuario/" + value);
  };

  const handleClickRemoveUser = (value) => {
    deleteUser(value)
      .then(success => {
        setSeverityAlert("success");
        setMsgAlert("Usuario borrado con éxito.");
        setOpenAlert(true);

        setTimeout(function () {
          window.location.reload();
        }.bind(this), 1800);
      })
      .catch(error => {
        const errorCode = error.response.status;
        setSeverityAlert("error");
        setMsgAlert("Se produjo un error: " + error.response.status);
        setOpenAlert(true);
      });
  }

  const handleNewUser = (e) => {
    window.location.href = "/altaUsuarios";
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<NewIcon />}
          onClick={handleNewUser}
        >
          Nuevo Usuario
      </Button>
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose">
            <h4 className={classes.cardTitleWhite}>Usuarios</h4>
            <p className={classes.cardCategoryWhite}>
              Listado de usuarios para luego definir permisos de lectura.
            </p>
          </CardHeader>
          <CardBody>

            <TableContainer>
              <Table>

                <TableBody>
                  {(rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
                  ).map((row) => (
                    <TableRow key={row.name}>

                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {row.email}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {row.is_admin ? "Administrador" : "-"}
                      </TableCell>

                      <TableCell style={{ width: 40 }} align="right">
                        <Link to={{
                          pathname: "/editarUsuario/" + row.id,
                          state: {
                            nameResponse: row.name,
                            emailResponse: row.email,
                            isAdminResponse: row.is_admin
                          }
                        }}>
                          <IconButton aria-label="edit user">
                            <Edit />
                          </IconButton>

                        </Link>
                      </TableCell>

                      <TableCell style={{ width: 40 }} align="right">
                        <IconButton aria-label="delete user"
                          onClick={() => {
                            handleClickRemoveUser(row.id);
                          }}
                        >
                          <Remove />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
                      colSpan={3}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { 'aria-label': 'Resultados por página' },
                        native: true,
                      }}
                      labelRowsPerPage= {"Resultados por página:"}
                      
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </GridItem>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={severityAlert}>
          {msgAlert}
        </Alert>
      </Snackbar>

    </GridContainer>
  );
}
