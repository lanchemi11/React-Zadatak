import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { Formik, Form } from 'formik';
// import * as Yup from 'yup';
// import { Grid, Typography, Container, TextField, Button} from "@mui/material";
// import { useNavigate  } from 'react-router-dom';
// import DateTimePicker from "../components/FormsUi/DateTimePicker";
// import Button2 from '../components/FormsUi/Button'
import axios from "axios";
import { Button, Grid, Typography, Input } from "@mui/material";
import CustomButton from "../components/FormsUi/Button";
import TextField from "../components/FormsUi/TextField";
import Date from "../components/FormsUi/DateTimePicker";

const UpdateEmployee = () => {
  const [users, setUser] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [city, setCity] = useState("");
  const [ZIPCode, setZIPCode] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [dateOfEmployment, setDateOfEployment] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://142.132.229.249:3000/employees/id/${id}`)
      .then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setPhoneNumber(result.data.phoneNumber);
        setHomeAddress(result.data.homeAddress);
        setCity(result.data.homeAddress.city);
        setZIPCode(result.data.homeAddress.ZIPCode);
        setAddressLine1(result.data.homeAddress.addressLine1);
        setAddressLine2(result.data.homeAddress.addressLine2);
        setDateOfEployment(result.data.dateOfEmployment);
        setDateOfBirth(result.data.dateOfBirth);
        console.log("IZ USEEFFECTA: ", result.data.homeAddress);
      });
  }, []);

  const data = {
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    homeAddress: {
      city: city,
      ZIPCode: ZIPCode,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
    },
    dateOfEmployment: dateOfEmployment,
    dateOfBirth: dateOfBirth,
  };
  function Update(e) {
    e.preventDefault();
    axios
      .patch(`http://142.132.229.249:3000/employees/${id}`, data)
      .then(navigate("/employees"))
      .catch((error) => console.log(error));
    console.log("Iz update-a: ", data);
  }

  return (
    <div>
      <Button
        style={{ margin: "5px" }}
        variant="contained"
        color="secondary"
        onClick={() => navigate("/employees")}
      >
        Go back
      </Button>

      <h1>Update Employee</h1>
      <form>
        <Grid item xs={12}>
          <Input
            margin=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone number"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            value={homeAddress.city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            value={homeAddress.ZIPCode}
            onChange={(e) => setZIPCode(e.target.value)}
            placeholder="ZIP Code"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            value={homeAddress.addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder="Address Line 1"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            value={homeAddress.addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            placeholder="Address Line 2"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            value={dateOfEmployment}
            onChange={(e) => setDateOfEployment(e.target.value)}
            placeholder="Date of eployment"
          />
        </Grid>

        <Grid item xs={12}>
          <Input
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            placeholder="Birth Date"
          />
        </Grid>

        <Grid item xs={12}>
          <Button color="primary" onClick={Update}>
            Update
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default UpdateEmployee;
