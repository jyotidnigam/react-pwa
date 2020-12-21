import * as React from "react";
import { Formik } from "formik";
import { Link } from 'react-router-dom';
import { RegisterPage as TablerRegisterPage } from "tabler-react";
import { Container, Row, Col } from "react-bootstrap";

import { useAuthDispatch } from '../../Context';
import { registerUser } from '../../Context/Actions/authActions';


const Register = (props) => {
  const dispatch = useAuthDispatch();
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validate={values => {
          // same as above, but feel free to move this into a class method now.
          let errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          else if (!values.password) {
            errors.password = "Required";
          } else if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (
          values,
          { setSubmitting, setErrors /* setValues and other goodies */ }
        ) => {
          const res = await registerUser(dispatch, values);
          if (!res.error) {
            alert("User registered successfully!");
            props.history.push('/login')
          }
          else alert(res.error);
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
            <TablerRegisterPage
              onSubmit={handleSubmit}
              onChange={handleChange}
              onBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
            />
          )}
      />
      <Container>
        <Row>
          <Col xs={12}>
            Already a user?, click here to <Link to="/login">login</Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;