import { Container, Content, Footer } from 'rsuite';
import styles from './index.module.css';
import { Button } from 'rsuite';
import { FlexboxGrid } from 'rsuite';
import Logo from '../../components/logo';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

const Home = () => {
  const { user, logOut } = useContext(UserContext);

  return (
    <Container className={styles.rs_container}>
      <Container>
        <Content>
          <FlexboxGrid className="fullHeight">
            <FlexboxGrid.Item colspan={24} className="fullHeight">
              <div className={styles.container}>
                <h1 className={styles.titleHeader}>Welcome to</h1>
                <div>
                  <Logo />
                  <div className={styles.actionsWrapper}>
                    {user ? (
                      <>
                        <Button color="blue" appearance="ghost" size="md" href="/chat">
                          <b>Enter Chat</b>
                        </Button>
                        <Button color="blue" appearance="ghost" size="md" onClick={() => logOut()}>
                          <b>Sign Out</b>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button color="blue" appearance="ghost" size="md" href="/login">
                          <b>Log In</b>
                        </Button>
                        <Button color="blue" appearance="ghost" size="md" href="/signup">
                          <b>Sign Up</b>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
      <Footer className={styles.footer}>
        <Button appearance="link" href="https://nestorkoi.github.io" active target="blank">
          <b>Iryna Nestorko</b>
        </Button>
      </Footer>
    </Container>
  );
};

export default Home;
