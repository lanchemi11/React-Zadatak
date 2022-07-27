import React, { useState } from "react";
import {
  FormControl,
  Button,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import DateTimePicker from "../components/FormsUi/DateTimePicker";
import CustomButton from "../components/FormsUi/Button";
import TextField from "../components/FormsUi/TextField";
import Date from "../components/FormsUi/DateTimePicker";

const AddEmployee = () => {
  //   const handleInputChange = (e) => {
  //     let { name, value } = e.target;
  //     setState({ ...state, [name]: value });
  //   };

  function Add(employee) {
    axios
      .post("http://142.132.229.249:3000/employees", employee)
      .then((response) => {
        console.log("Response: ", response);
        console.log("Dodat korisnik");
      })
      .catch((error) => console.log(error));
  }

  const INITIAL_VALUE_STATE = {
    name: "",
    email: "",
    phoneNumber: "",
    homeAddress: {
      city: "",
      ZIPCode: "",
      addressLine1: "",
      addressLine2: "",
    },
    dateOfEmployment: "",
    dateOfBirth: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phoneNumber: Yup.string().required("Required"),
    homeAddress: Yup.object().shape({
      city: Yup.string().required("Required"),
      ZIPCode: Yup.number().required("Required"),
      addressLine1: Yup.string().required("Required"),
      addressLine2: Yup.string().required("Required"),
    }),
    dateOfEmployment: Yup.date().required("Required"),
    dateOfBirth: Yup.date().required("Required"),
  });

  const navigate = useNavigate();

  return (
    <Grid containter>
      <Button
        style={{ marginTop: "20px" }}
        variant="contained"
        color="secondary"
        onClick={() => navigate("/employees")}
      >
        Go Back
      </Button>
      <h1>Add Employee</h1>
      <Grid item xs={12}>
        <Container>
          <div>
            <Formik
              initialValues={{
                ...INITIAL_VALUE_STATE,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                Add(values);
                navigate("/employees");
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField name="name" label="Name" placeholder="Name" />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField name="email" label="Email" />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField name="phoneNumber" label="Phone Number" />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>Home Address</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField name="homeAddress.city" label="City" />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField name="homeAddress.ZIPCode" label="ZIP Code" />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="homeAddress.addressLine1"
                      label="Addres line 1"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      name="homeAddress.addressLine2"
                      label="Addres line 2"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Date name="dateOfEmployment" label="Date of Eployment" />
                  </Grid>

                  <Grid item xs={12}>
                    <Date name="dateOfBirth" label="Date of Birth" />
                  </Grid>

                  <Grid item xs={12}>
                    <CustomButton>Submit Form</CustomButton>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default AddEmployee;
