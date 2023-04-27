import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';

const Navigation = ({ isAuth }) => {
  return isAuth ? <MainNavigation /> : <AuthNavigation />; // TODO change !isAuth to isAuth
};

export default Navigation;
