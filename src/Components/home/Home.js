import { Form, Row, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import HandleData from "../../Utils/Handlesubmit";
import "../home/Home.css";
import { useEffect, useState } from "react";
import { Country, States } from "../../Utils/countryState";
import axios from "axios";
// import { Cities } from "../../Utils/city";
const schema = Yup.object().shape({
  //defining schema for form validation
  name: Yup.string().required("Name is required"),
  age: Yup.string()
    .required("Please supply your age")
    .min(18, "You must be at least 18 years")
    .max(60, "You must be at most 60 years"),
  sex: Yup.string().required("Sex is required"),
  mobile: Yup.string().matches(/^[6789]\d{9}$/),
  EContact: Yup.string().matches(/^[6789]\d{9}$/),
  // PAN: Yup.string().matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/),
  // govtId: Yup.number().matches(/^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/),
  govtType: Yup.string().required("type is required"),
  govtId: Yup.string()
        .when('govtType', {
            is: (govtType) =>
            ["Aadhar"].includes(govtType),
            then: () => Yup.string().required("adhar is required").matches(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/gm,"Please Enter Valid Aadhar"),
        })
        .when('govtType', {
          is: (govtType) =>
          ["PAN"].includes(govtType),
          then: () => Yup.string().required("pan is required").matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/,"Please Enter Valid PAN"),
      })
});

console.log("schema", schema);

export default function Home() {
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [cityNames, setCityNames] = useState([]);
  useEffect(() => {
    getCities();
  }, [stateName]);
  const handleChange = (e) => {
    setCountryName(e.target.value);
  };
  const handleStates = (e) => {
    setStateName(e.target.value);
  };
  const getCities = () => {
    console.log(countryName, stateName);
    axios
      .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
        country: countryName,
        state: stateName,
      })
      .then((response) => {
        console.log(response);
        setCityNames(response["data"]["data"]);
        //     response['data']['data'].forEach((eachItem) => {
        //    console.log(eachItem['data'])
        //       });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    //using react hook form and yup to handle data and validation
    resolver: yupResolver(schema), //yup resolver for handling validation
  });

  const onSubmit = (data) => {
    console.log(errors);

    HandleData(data);
  };

  return (
    <div className="card m-3">
      <h5 className="card-header">Registration Form</h5>
      <div className="card-body">
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/*handling form submit*/}
          <Row md="12">
            <h6>Personal Details</h6>
            <Col md="4">
              <Form.Group className="inputgroup">
                <div className="innerdiv">
                  <Form.Label htmlFor="Name">Name </Form.Label>
                  <Form.Control
                    style={{ width: "500px" }}
                    name="name"
                    id="Name"
                    type="text"
                    placeholder="Enter Name"
                    label="name"
                    {...register("name")} //setting form value
                  ></Form.Control>
                </div>
              </Form.Group>
              <p className="text-danger">{errors.name?.message}</p>
              <Form.Group className="inputgroup">
                <div className="innerdiv">
                  <Form.Label htmlFor="mobile">Mobile</Form.Label>
                  <Form.Control
                    style={{ width: "300px" }}
                    name="mobile"
                    id="mobile"
                    type="text"
                    placeholder="Enter Mobile"
                    label="mobile"
                    {...register("mobile")}
                  ></Form.Control>
                </div>
              </Form.Group>
              {errors.mobile?.message ? (
                <p className="text-danger">
                  Mobile Number Should be Valid and Required
                </p>
              ) : (
                ""
              )}
            </Col>
            <Col md="1"></Col>
            <Col md="6">
              <Row>
                <Form.Group className="inputgroup">
                  <div className="innerdiv">
                    <Form.Label htmlFor="age">Age</Form.Label>
                    <Form.Control
                      style={{ width: "300px" }}
                      name="age"
                      id="age"
                      type="text"
                      placeholder="DD/MM/YYYY or Age in years"
                      label="age"
                      {...register("age")}
                    ></Form.Control>
                  </div>
                  <div>
                    <p className="text-danger">{errors.age?.message}</p>
                  </div>
                  <div className="innerdiv">
                    <Form.Label htmlFor="sex">Sex</Form.Label>
                    <Form.Select
                      style={{ width: "150px" }}
                      aria-label="Default select example"
                      name="sex"
                      id="sex"
                      label="sex"
                      {...register("sex")}
                    >
                      <option selected disabled hidden value="">
                        Select Sex{" "}
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Select>
                  </div>
                  <div>
                    <p className="text-danger">{errors.sex?.message}</p>
                  </div>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="inputgroup">
                  <div className="innerdiv">
                    <Form.Label htmlFor="govtId">Govt ID</Form.Label>

                    <Form.Select
                      style={{ width: "200px" }}
                      aria-label="Default select example"
                      placeholder="Select Govt Id"
                      name="govtType"
                      id="govtType"
                      label="govtType"
                      {...register("govtType")}
                    >
                      <option selected disabled hidden value="">
                        Select ID
                      </option>
                      <option value="Aadhar">Aadhar card</option>
                      <option value="PAN">PAN card</option>
                    </Form.Select>
                    {errors.govtType?.message ? (
                      <p className="text-danger">Govt type is required</p>
                    ) : null}
                    <Form.Label></Form.Label>
                    <Form.Control
                      name="govtId"
                      style={{ width: "300px" }}
                      id="govtId"
                      type="text"
                      placeholder="Enter ID"
                      label="govtId"
                      {...register("govtId")}
                    ></Form.Control>
                  </div>
                  <div>
                    {errors.govtId?.message ? (
                      <p className="text-danger">{errors.govtId?.message}</p>
                    ) : null}
                  </div>
                </Form.Group>
              </Row>
            </Col>
          </Row>
          <Row md="12" className="mt-3">
            <h6>Contact Details</h6>
            <Col md="12" gap="6">
              <Form.Group className="inputgroup">
                <div className="innerdiv">
                  <Form.Label htmlFor="Gaurdian">Gaurdian Details</Form.Label>
                  <Form.Select
                    style={{ width: "100px" }}
                    aria-label="Default select example"
                    name="Gaurdian"
                    id="Gaurdian"
                    placeholder="Enter Label"
                    label="honorific"
                    {...register("honorific")}
                  >
                    <option selected disabled hidden value="">
                      Select honorific{" "}
                    </option>
                    <option value="MR">MR</option>
                    <option value="MRs">MRs</option>
                  </Form.Select>
                  <Form.Label htmlFor="GName"></Form.Label>
                  <Form.Control
                    style={{ width: "300px" }}
                    name="GName"
                    id="GName"
                    type="text"
                    placeholder="Enter Gurdian Name"
                    label="GurdianName"
                    {...register("GurdianName")}
                  ></Form.Control>
                  <Form.Label htmlFor="Email">Email</Form.Label>
                  <Form.Control
                    style={{ width: "300px" }}
                    name="Email"
                    id="Email"
                    type="text"
                    placeholder="Enter Email"
                    label="Email"
                    {...register("Email")}
                  ></Form.Control>
                </div>

                <div className="innerdiv">
                  <Form.Label htmlFor="EContact">
                    Emergency Conact Number
                  </Form.Label>
                  <Form.Control
                    style={{ width: "300px" }}
                    name="EContact"
                    id="EContact"
                    type="text"
                    label="EContact"
                    {...register("EContact")}
                    placeholder="Enter Emergency Conact Number"
                  ></Form.Control>
                </div>
                <div>
                  {errors.EContact?.message ? (
                    <p className="text-danger">
                      Mobile Number Should be Valid and Required
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row md="12" className="mt-3">
            <h6>Address Details</h6>
            <Col md="4">
              <Form.Group className="inputgroup">
                <div className="innerdiv">
                  <Form.Label htmlFor="Address">Address</Form.Label>
                  <Form.Control
                    style={{ width: "500px" }}
                    name="Address"
                    id="Address"
                    type="text"
                    placeholder="Enter Address"
                    label="address"
                    {...register("address")}
                  ></Form.Control>
                </div>
              </Form.Group>
              <Form.Group className="inputgroup">
                <div className="innerdiv">
                  <Form.Label htmlFor="Country">Country</Form.Label>
                  <Form.Select
                    style={{ width: "200px" }}
                    aria-label="Default select example"
                    name="Country"
                    id="Country"
                    label="Country"
                    {...register("Country")}
                    onChange={handleChange}
                  >
                    <option selected disabled hidden value="">
                      Select Country{" "}
                    </option>
                    {Country.map((res) => {
                      return <option>{res.name}</option>;
                    })}
                  </Form.Select>
                </div>
              </Form.Group>
            </Col>
            <Col md="1"></Col>
            <Col md="6">
              <Row>
                <Form.Group className="inputgroup">
                  <div className="innerdiv">
                    <Form.Label htmlFor="State">State</Form.Label>
                    <Form.Select
                      style={{ width: "200px" }}
                      aria-label="Default select example"
                      name="State"
                      id="State"
                      label="State"
                      {...register("State")}
                      onChange={handleStates}
                    >
                      <option selected disabled hidden value="">
                        Select State{" "}
                      </option>
                      {States.filter(
                        (each) => each.country_name == countryName
                      ).map((res) => {
                        return <option>{res.name}</option>;
                      })}
                    </Form.Select>
                    <Form.Label htmlFor="City">City</Form.Label>
                    <Form.Select
                      style={{ width: "200px" }}
                      aria-label="Default select example"
                      name="City"
                      id="City"
                      label="City"
                      {...register("City")}
                    >
                      <option selected disabled hidden value="">
                        Select City{" "}
                      </option>

                      {cityNames.map((res) => {
                        return <option>{res}</option>;
                      })}
                    </Form.Select>
                  </div>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="inputgroup">
                  <div className="innerdiv">
                    <Form.Label htmlFor="Pincode">Pincode</Form.Label>
                    <Form.Control
                      style={{ width: "250px" }}
                      name="Pincode"
                      id="Pincode"
                      type="text"
                      placeholder="Enter Pincode"
                      label="Pincode"
                      {...register("Pincode")}
                    ></Form.Control>
                  </div>
                </Form.Group>
              </Row>
            </Col>
          </Row>
          <Row md="12" className="mt-3">
            <h6>Contact Details</h6>
            <Col md="12">
              <Form.Group className="inputgroup">
                <div className="innerdiv">
                  <Form.Label htmlFor="Occupation">Occupation</Form.Label>
                  <Form.Control
                    style={{ width: "300px" }}
                    name="Occupation"
                    id="Occupation"
                    type="text"
                    placeholder="Enter Occupation"
                    label="Occupation"
                    {...register("Occupation")}
                  ></Form.Control>
                  <Form.Label htmlFor="Religion">Religion</Form.Label>
                  <Form.Select
                    style={{ width: "200px" }}
                    aria-label="Default select example"
                    name="Religion"
                    id="Religion"
                    placeholder="Select Religion"
                    label="Religion"
                    {...register("Religion")}
                  >
                    <option selected disabled hidden value="">
                      Select Religion{" "}
                    </option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                  </Form.Select>
                  <Form.Label htmlFor="MartialStaus">Martial Status</Form.Label>
                  <Form.Select
                    style={{ width: "200px" }}
                    aria-label="Default select example"
                    name="MartialStatus"
                    id="MartialStatus"
                    placeholder="Select MartialStatus"
                    label="MartialStatus"
                    {...register("MartialStatus")}
                  >
                    <option selected disabled hidden value="">
                      Select MartialStatus{" "}
                    </option>
                    <option value="Married">Married</option>
                    <option value="UnMarried">UnMarried</option>
                  </Form.Select>
                  <Form.Label htmlFor="BloodGroup">Blood Group</Form.Label>
                  <Form.Select
                    style={{ width: "185px" }}
                    aria-label="Default select example"
                    name="BloodGroup"
                    id="BloodGroup"
                    label="BloodGroup"
                    {...register("BloodGroup")}
                  >
                    <option selected disabled hidden value="">
                      Select BloodGroup{" "}
                    </option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </Form.Select>
                </div>
                <div className="innerdiv">
                  <Form.Label htmlFor="Nationality">Nationality</Form.Label>
                  <Form.Select
                    style={{ width: "200px" }}
                    aria-label="Default select example"
                    name="Nationality"
                    id="Nationality"
                    label="Nationality"
                    {...register("Nationality")}
                  >
                    <option selected disabled hidden value="">
                      Select Nationality{" "}
                    </option>
                    {Country.map((res) => {
                      return <option>{res.name}</option>;
                    })}
                  </Form.Select>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <div className="footer">
            <Button className="button" variant="outline-danger">
              Cancel
            </Button>

            <Button className="button" type="submit" variant="outline-success">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
