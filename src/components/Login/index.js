import * as React from "react";
import { Formik } from "formik";
import { Link } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { LoginPage as TablerLoginPage } from "tabler-react";

import { useAuthDispatch } from '../../Context';
import { loginUser } from '../../Context/Actions/authActions';

const Login = (props) => {

  const dispatch = useAuthDispatch();

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={values => {
          // same as above, but feel free to move this into a class method now.
          let errors = {};
          if (!values.email) {
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
          const res = await loginUser(dispatch, values);
          if (!res.error) {
            props.history.push('/admin/')
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
            <TablerLoginPage
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
            Don't have an account?, click here to create your account <Link to="/register">Create Account</Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;