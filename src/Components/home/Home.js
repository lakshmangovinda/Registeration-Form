import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import HandleData from "../../Utils/Handlesubmit";
import "../home/Home.css";
import { useEffect, useState } from "react";
import { Country, States } from "../../Utils/countryState";
import axios from "axios";
const schema = Yup.object().shape({
  //defining schema for form validation
  name: Yup.string().required("Name is required"),
  age: Yup.number()
    .required("Please provide your age")
    .typeError("Please provide your age")
    .min(18, "You must be at least 18 years")
    .max(60, "You must be at most 60 years"),
  sex: Yup.string().required("Sex is required"),
  mobile: Yup.string().matches(/^[6789]\d{9}$/),
  EContact: Yup.string().matches(/^[6789]\d{9}$/),
  // govtType: Yup.string().required("type is required"),
  govtId: Yup.string()
    .when("govtType", {
      is: (govtType) => ["Aadhar"].includes(govtType),
      then: () =>
        Yup.string()
          // .required("Aadhar is required")
          .matches(
            /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/gm,
            "Please Enter Valid Aadhar"
          ),
    })
    .when("govtType", {
      is: (govtType) => ["PAN"].includes(govtType),
      then: () =>
        Yup.string()
          // .required("pan is required")
          .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Please enter valid PAN"),
    }),
});

export default function Home() {
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [cityNames, setCityNames] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (stateName) {
      getCities();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateName]);
  const handleChange = (e) => {
    setCountryName(e.target.value);
  };
  const handleStates = (e) => {
    setStateName(e.target.value);
  };
  const getCities = () => {
    axios
      .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
        country: countryName,
        state: stateName,
      })
      .then((response) => {
        setCityNames(response["data"]["data"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    //using react hook form and yup to handle data and validation
    resolver: yupResolver(schema), //yup resolver for handling validation
  });

  const onSubmit = (data) => {
    setShowAlert(true);
    HandleData(data);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <div className="card m-3">
      <h5 className="card-header">Registration Form</h5>
      <div className="card-body">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <h6>
              <u>Personal Details</u>
            </h6>
            <Col md="4" className="mt-3">
              <Form.Group>
                <div className="innerdiv">
                  <Form.Label htmlFor="Name" className="required-star">
                    Name{" "}
                  </Form.Label>
                  <Form.Control
                    style={{ width: "465px" }}
                    name="name"
                    id="Name"
                    type="text"
                    placeholder="Enter Name"
                    label="name"
                    {...register("name")} //setting form value
                  ></Form.Control>
                </div>
                <p className="text-danger">{errors.name?.message}</p>
              </Form.Group>
            </Col>
            <Col md="4" className="mt-3">
              <Form.Group>
                <div className="innerdiv">
                  <Form.Label htmlFor="age" className="required-star">
                    Date of Birth or Age
                  </Form.Label>
                  <Form.Control
                    style={{ width: "365px" }}
                    name="age"
                    id="age"
                    type="text"
                    placeholder="DD/MM/YYYY or Age in years"
                    label="age"
                    {...register("age")}
                  ></Form.Control>
                </div>
                <p className="text-danger">{errors.age?.message}</p>
              </Form.Group>
            </Col>
            <Col md="4" className="mt-3">
              <Form.Group>
                <div className="innerdiv">
                  <Form.Label htmlFor="sex" className="required-star">
                    Sex
                  </Form.Label>
                  <Form.Select
                    style={{ width: "300px" }}
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
                <p className="text-danger">{errors.sex?.message}</p>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="mt-3 mb-4">
              <Form.Group>
                <div className="innerdiv">
                  <Form.Label htmlFor="mobile">Mobile</Form.Label>
                  <Form.Control
                    style={{ width: "400px" }}
                    name="mobile"
                    id="mobile"
                    type="text"
                    placeholder="Enter Mobile"
                    label="mobile"
                    {...register("mobile")}
                  ></Form.Control>
                </div>
                {getValues("mobile") && errors.mobile?.message ? (
                  <p className="text-danger">Mobile Number Should be Valid</p>
                ) : null}
              </Form.Group>
            </Col>
            <Col md="8" className="mt-3 mb-4">
              <Form.Group>
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
                  <Form.Control
                    name="govtId"
                    style={{ width: "560px", marginLeft: "1rem" }}
                    id="govtId"
                    type="text"
                    placeholder="Enter ID"
                    label="govtId"
                    {...register("govtId")}
                  ></Form.Control>
                </div>
                {errors.govtType?.message ? (
                  <p className="text-danger">Govt type is required</p>
                ) : null}
                {errors.govtId?.message ? (
                  <p className="text-danger" style={{ paddingLeft: "18rem" }}>
                    {errors.govtId?.message}
                  </p>
                ) : null}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <h6 className="mb-4">
              <u>Contact Details</u>
            </h6>

            <Col md="8">
              <Form.Group>
                <div className="innerdiv">
                  <Form.Label htmlFor="Gaurdian">Guardian Details</Form.Label>
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
                  <Form.Control
                    style={{
                      width: "300px",
                      marginLeft: "1rem",
                      marginRight: "1rem",
                    }}
                    name="GName"
                    id="GName"
                    type="text"
                    placeholder="Enter Gurdian Name"
                    label="GurdianName"
                    {...register("GurdianName")}
                  ></Form.Control>
                  <Form.Label htmlFor="Email">Email</Form.Label>
                  <Form.Control
                    style={{ width: "474px" }}
                    name="Email"
                    id="Email"
                    type="text"
                    placeholder="Enter Email"
                    label="Email"
                    {...register("Email")}
                  ></Form.Control>
                </div>
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group>
                <div className="innerdiv">
                  <Form.Label htmlFor="EContact">
                    Emergency Contact Number
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
                  {getValues("EContact") && errors.EContact?.message ? (
                    <p className="text-danger">
                      Emergency Mobile Number Should be Valid
                    </p>
                  ) : null}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-4">
            <h6>
              <u>Address Details</u>
            </h6>
            <Row>
              <Col md="4" className="mt-3">
                <Form.Group>
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
              </Col>
              <Col md="8" className="mt-3">
                <Form.Group>
                  <div className="innerdiv">
                    <Form.Label htmlFor="State">State</Form.Label>
                    <Form.Select
                      style={{ width: "300px", marginRight: "1rem" }}
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
                        (each) => each.country_name === countryName
                      ).map((res, index) => {
                        return <option key={index}>{res.name}</option>;
                      })}
                    </Form.Select>
                    <Form.Label htmlFor="City">City</Form.Label>
                    <Form.Select
                      style={{ width: "300px" }}
                      aria-label="Default select example"
                      name="City"
                      id="City"
                      label="City"
                      {...register("City")}
                    >
                      <option selected disabled hidden value="">
                        Select City{" "}
                      </option>

                      {cityNames.map((res, index) => {
                        return <option key={index}>{res}</option>;
                      })}
                    </Form.Select>
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="4" className="mt-3 mb-4">
                <Form.Group>
                  <div className="innerdiv">
                    <Form.Label htmlFor="Country">Country</Form.Label>
                    <Form.Select
                      style={{ width: "400px" }}
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
                      {Country.map((res, index) => {
                        return <option key={index}>{res.name}</option>;
                      })}
                    </Form.Select>
                  </div>
                </Form.Group>
              </Col>
              <Col md="4" className="mt-3 mb-4">
                <Form.Group>
                  <div className="innerdiv">
                    <Form.Label htmlFor="Pincode">Pincode</Form.Label>
                    <Form.Control
                      style={{ width: "350px" }}
                      name="Pincode"
                      id="Pincode"
                      type="text"
                      placeholder="Enter Pincode"
                      label="Pincode"
                      {...register("Pincode")}
                    ></Form.Control>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Row>
          <Row className="mt-2">
            <h6>
              <u>Other Details</u>
            </h6>

            <Col md="3" className="mt-3">
              <Form.Group>
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
                </div>
              </Form.Group>
            </Col>
            <Col md="3" className="mt-3">
              <Form.Group>
                <div className="innerdiv">
                  <Form.Label htmlFor="Religion">Religion</Form.Label>
                  <Form.Select
                    style={{ width: "315px" }}
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
                </div>
              </Form.Group>
            </Col>
            <Col md="3" className="mt-3">
              <Form.Group>
                <div className="innerdiv">
                  <Form.Label htmlFor="MartialStaus">Martial Status</Form.Label>
                  <Form.Select
                    style={{ width: "275px" }}
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
                </div>
              </Form.Group>
            </Col>
            <Col md="3" className="mt-3">
              <Form.Group>
                <div className="innerdiv">
                  <Form.Label htmlFor="BloodGroup">Blood Group</Form.Label>
                  <Form.Select
                    style={{ width: "275px" }}
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
              </Form.Group>
            </Col>
            <Form.Group className="mt-4 mb-4">
              <div className="innerdiv">
                <Form.Label htmlFor="Nationality">Nationality</Form.Label>
                <Form.Select
                  style={{ width: "300px" }}
                  aria-label="Default select example"
                  name="Nationality"
                  id="Nationality"
                  label="Nationality"
                  {...register("Nationality")}
                >
                  <option selected disabled hidden value="">
                    Select Nationality{" "}
                  </option>
                  {Country.map((res, index) => {
                    return <option key={index}>{res.name}</option>;
                  })}
                </Form.Select>
              </div>
            </Form.Group>
          </Row>

          <div className="footer">
            {showAlert ? (
              <Alert variant="success">
                <Alert.Heading>successfully Registered</Alert.Heading>
              </Alert>
            ) : null}
            <Button variant="outline-danger" style={{ padding: "1rem 2rem" }}>
              <div>Cancel</div>
              <div>
                <u>(ESC)</u>
              </div>
            </Button>

            <Button
              type="submit"
              variant="btn btn-success"
              style={{ padding: "1rem 2rem" }}
            >
              <div>Submit</div>
              <div>
                <u>&#8984; S</u>
              </div>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
