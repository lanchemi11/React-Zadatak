import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import { Link } from "@mui/material";

import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Home = () => {
  const [users, setUsers] = useState([]);
  console.log("Pre fetchovanja: ", users);
  const navigate = useNavigate();

  const loadUsers = () => {
    axios
      .get("http://142.132.229.249:3000/employees")
      .then((response) => setUsers(response.data.employees));
    console.log("Iz fetchovanja: ", users);
  };
  useEffect(() => {
    loadUsers();
  }, []);

  // function SoftDelete(id) {
  //   axios
  //     .patch(`http://142.132.229.249:3000/employees/soft-delete/${id}`, {
  //       isDeleted: true,
  //     })
  //     .then(() => loadUsers())
  //     .catch((error) => console.log(error));
  //   console.log("Soft Deleted");
  //   console.log(users);
  // }

  function Delete(id) {
    axios
      .delete(`http://142.132.229.249:3000/employees/permanent-delete/${id}`, {
        isDeleted: true,
      })
      .then(() => loadUsers())
      .catch((error) => console.log(error));
    console.log("Deleted");
    console.log(users);
  }

  function Update(id) {
    axios
      .get(`http://142.132.229.249:3000/employees/${id}`)
      .then(navigate(`/employees/${id}`));
    console.log("Apdejt");
  }
  return (
    <div>
      <h1>Home</h1>

      <Button
        style={{ margin: "5px" }}
        variant="contained"
        color="primary"
        onClick={() => navigate("/addEmployees")}
      >
        Add Employee
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Phone number</StyledTableCell>
              <StyledTableCell align="center">
                Home address
                <StyledTableCell align="center">City</StyledTableCell>
                <StyledTableCell align="center">ZIPCode</StyledTableCell>
                <StyledTableCell align="center">AddresLine1</StyledTableCell>
                <StyledTableCell align="center">AddresLine2</StyledTableCell>
              </StyledTableCell>
              <StyledTableCell align="center">
                Date of employment
              </StyledTableCell>
              <StyledTableCell align="center">Date of birth</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((x) => (
              <StyledTableRow key={x._id}>
                <StyledTableCell align="center">
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                      navigate(`/employees/name/${x.name}`);
                    }}
                  >
                    {x.name}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">{x.email}</StyledTableCell>
                <StyledTableCell align="center">
                  {x.phoneNumber}
                </StyledTableCell>
                <StyledTableCell>
                  <StyledTableCell align="center">
                    {x.homeAddress.city}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {x.homeAddress.ZIPCode}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {x.homeAddress.addressLine1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {x.homeAddress.addressLine2}
                  </StyledTableCell>
                </StyledTableCell>

                <StyledTableCell align="center">
                  {x.dateOfEmployment}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {x.dateOfBirth}
                </StyledTableCell>

                <StyledTableCell>
                  <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      style={{ marginRight: "5px" }}
                      color="primary"
                      onClick={() => navigate(`/employees/id/${x._id}`)}
                    >
                      View
                    </Button>
                    <Button
                      style={{ marginRight: "5px" }}
                      color="primary"
                      onClick={() => Update(x._id)}
                    >
                      Update
                    </Button>

                    <Button color="secondary" onClick={() => Delete(x._id)}>
                      Delete
                    </Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
