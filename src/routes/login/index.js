import { Form, ButtonToolbar, Button, FlexboxGrid, Schema } from 'rsuite';
import styles from './index.module.css';
import Logo from '../../components/logo';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const errorStyles = (errorVisible) => {
  return {
    display: errorVisible ? 'inline-block' : 'none',
    color: 'red',
    marginBottom: 15,
    inlineSize: 300,
    overflowWrap: 'break-word',
  };
};

const model = Schema.Model({
  password: Schema.Types.StringType()
    .isRequired('This field is required.')
    .isRequired('This field is required.')
    .minLength(6, 'Minimum lenght is 6 characters'),
  email: Schema.Types.StringType().isEmail('Please enter a valid email address.').isRequired('This field is required.'),
});

const Login = () => {
  const [error, setError] = useState(null);
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const { logIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (isFormValid) => {
    if (!isFormValid) {
      return;
    }

    try {
      await logIn(formValue.email, formValue.password);
      navigate('/chat');
    } catch (error) {
      setFormValue({
        email: formValue.email,
        password: '',
      });
      setError(error.message);
    }
  };

  return (
    <FlexboxGrid className={styles.container} justify="center" align="middle">
      <div>
        <Logo className={styles.logoOverride} />
        <div style={errorStyles(error !== null)}>{error}</div>
        <Form model={model} formValue={formValue} onChange={setFormValue} onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name="email" type="email" errorPlacement="leftStart" />
            <Form.HelpText tooltip>Email is required</Form.HelpText>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Form.Control name="password" type="password" autoComplete="off" errorPlacement="leftStart" />
            <Form.HelpText tooltip>Password is required</Form.HelpText>
          </Form.Group>
          <Form.Group>
            <ButtonToolbar>
              <Button type="submit" color="blue" appearance="ghost" size="md">
                <b>Submit</b>
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </div>
    </FlexboxGrid>
  );
};

export default Login;
