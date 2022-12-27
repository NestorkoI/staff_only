import styles from './style.module.css';
import Logo from '../../components/logo/index';

export const Sidebar = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.logoOverride}>
        <Logo />
      </div>
      {props.children}
    </div>
  );
};
