import { Form, ButtonToolbar, Button, FlexboxGrid, Schema } from 'rsuite';
import { useRef, useState } from 'react';
import styles from './index.module.css';
import Logo from '../../components/logo';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db, storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

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
  username: Schema.Types.StringType().isRequired('This field is required.'),
  position: Schema.Types.StringType().isRequired('This field is required.'),
  password: Schema.Types.StringType()
    .isRequired('This field is required.')
    .minLength(6, 'Minimum lenght is 6 characters'),
  avatar: Schema.Types.StringType().isRequired('This field is required.'),
  email: Schema.Types.StringType().isEmail('Please enter a valid email address.').isRequired('This field is required.'),
});

const Signup = () => {
  const [error, setError] = useState(null);
  const [formValue, setFormValue] = useState({
    username: '',
    position: '',
    email: '',
    password: '',
    avatar: undefined,
  });
  const [isLoading, setLoading] = useState(false);
  const { setUserDetails, signUp } = useContext(UserContext);
  const navigate = useNavigate();
  const avatarRef = useRef();

  const handleSubmit = async (isFormValid) => {
    if (!isFormValid) {
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signUp(formValue.email, formValue.password);

      await updateProfile(userCredential.user, {
        displayName: formValue.username,
      });

      const date = new Date().getTime();
      const storageReference = ref(storage, `${formValue.displayName}${date}`);
      const file = avatarRef.current.childNodes[0].files[0];
      await uploadBytesResumable(storageReference, file);

      const fileURL = await getDownloadURL(storageReference);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        displayName: formValue.username,
        email: formValue.email,
        position: formValue.position,
        avatar: fileURL,
      });

      setUserDetails({ position: formValue.position, avatar: fileURL });

      navigate('/chat');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <FlexboxGrid className={styles.container} justify="center" align="middle">
      <div>
        <Logo className={styles.logoOverride} />
        <div style={errorStyles(error !== null)}>{error}</div>
        <Form model={model} formValue={formValue} onChange={setFormValue} onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.ControlLabel>Username</Form.ControlLabel>
            <Form.Control name="username" errorPlacement="leftStart" />
            <Form.HelpText tooltip>Username is required</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="position">
            <Form.ControlLabel>Position</Form.ControlLabel>
            <Form.Control name="position" errorPlacement="leftStart" />
            <Form.HelpText tooltip>Position is required</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control name="email" type="email" errorPlacement="leftStart" />
            <Form.HelpText tooltip>Email is required</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Form.Control name="password" type="password" autoComplete="off" errorPlacement="leftStart" />
            <Form.HelpText tooltip>Password must be at least 6 charaters long</Form.HelpText>
          </Form.Group>

          <Form.Group controlId="avatar">
            <Form.ControlLabel>Avatar</Form.ControlLabel>
            <Form.Control ref={avatarRef} name="avatar" type="file" errorPlacement="leftStart" />
            <Form.HelpText tooltip>Avatar is required</Form.HelpText>
          </Form.Group>

          <Form.Group>
            <ButtonToolbar>
              <Button loading={isLoading} type="submit" color="blue" appearance="ghost" size="md">
                <b>Submit</b>
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </div>
    </FlexboxGrid>
  );
};

export default Signup;
