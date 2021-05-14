import Head from "next/head";

import { useState } from "react";

// router
import { useRouter } from "next/router";

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

// formik
import { Formik, Field, Form, ErrorMessage } from "formik";

// yup
import * as yup from "yup";

// import axios instance
import { axios } from "../lib/axios/axios.js";

// formik initial values + yup validation
const initialValues = {
  user: "",
  password: "",
};

const schema = yup.object().shape({
  user: yup
    .string()
    .min(3, "User is too short - should be 3 chars minimum.")
    .required("User is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum.")
    .matches(
      /[a-zA-Z0-9]/,
      "Password can only contain Latin letters and numbers."
    ),
});

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    axios
      .post("/api/v1/login", values)
      .then(function (response) {
        console.log(response.data.jwt);
        localStorage.setItem("JWT", response.data.jwt);
        router.push("/users");
        // TODO: Display spinner in primary button
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(setLoading(false));
  };

  return (
    <>
      <Head>
        <title>Test challenge front end</title>
        <meta name="description" content="Test challenge para wispro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Row className="justify-content-center mt-5 ">
          <Col md="6" xs="12">
            <Card className="border rounded shadow-lg">
              <CardBody>
                <CardTitle tag="h1" className="text-center">
                  Login
                </CardTitle>
                <CardText>
                  <p className="text-center font-weight-bold">
                    Ingresa tus credenciales
                  </p>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                  >
                    {(props) => {
                      return (
                        <>
                          <Form>
                            <FormGroup>
                              <div>
                                <Label htmlFor="user" className="mb-1">
                                  User
                                </Label>
                                <Input
                                  type="text"
                                  name="user"
                                  id="user"
                                  tag={Field}
                                  onChange={props.handleChange}
                                  invalid={
                                    props.errors.user && props.touched.user
                                  }
                                />
                                <ErrorMessage
                                  name="user"
                                  component="div"
                                  className="field-error text-danger"
                                />
                              </div>
                              <div className="mt-1 mb-1">
                                <Label htmlFor="password" className="mb-1">
                                  Password
                                </Label>

                                <Input
                                  type="password"
                                  name="password"
                                  id="password"
                                  tag={Field}
                                  invalid={
                                    props.errors.password &&
                                    props.touched.password
                                  }
                                />
                                <ErrorMessage
                                  name="password"
                                  component="div"
                                  className="field-error text-danger"
                                />
                              </div>
                            </FormGroup>{" "}
                            <Button type="submit" color="primary">
                              Login
                            </Button>
                          </Form>
                        </>
                      );
                    }}
                  </Formik>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
