import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';

const Navigation = ({ isAuth }) => {
  return isAuth ? <MainNavigation /> : <AuthNavigation />;
};

export default Navigation;
