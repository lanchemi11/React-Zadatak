import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SingleEmployeeId = () => {
  const [user, setUser] = useState([]);
  console.log("Pre fetchovanja: ", user);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://142.132.229.249:3000/employees/id/${id}`)
      .then((result) => {
        setUser(result.data);
      });
  }, []);

  const navigate = useNavigate();
  console.log("Objekat: ", user.homeAddress);

  return (
    <div>
      <h1>Single Employee ID</h1>

      <Button
        style={{ margin: "5px" }}
        variant="contained"
        color="secondary"
        onClick={() => navigate("/employees")}
      >
        Go back
      </Button>
      {console.log(user)}

      <h1>{user.name}</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">
                Home address
                <TableCell align="center">City</TableCell>
                <TableCell align="center">ZIPCode</TableCell>
                <TableCell align="center">AddresLine1</TableCell>
                <TableCell align="center">AddresLine2</TableCell>
              </TableCell>
              <TableCell align="center">Date of Employment</TableCell>
              <TableCell align="center">Date of birth</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="center">{user.name}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.phoneNumber}</TableCell>
              <TableCell>
                <TableCell align="center">{user?.homeAddress?.city}</TableCell>
                <TableCell align="center">
                  {user?.homeAddress?.ZIPCode}
                </TableCell>
                <TableCell align="center">
                  {user?.homeAddress?.addressLine1}
                </TableCell>
                <TableCell align="center">
                  {user?.homeAddress?.addressLine2}
                </TableCell>
              </TableCell>
              <TableCell align="center">{user.dateOfEmployment}</TableCell>
              <TableCell align="center">{user.dateOfEmployment}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SingleEmployeeId;
