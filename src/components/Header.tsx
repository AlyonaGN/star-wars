/* import ThemeSwitcher from "./ThemeSwitcher"; */
import maythe4 from '../images/maythe4.png';

const Header = () => {
  return (
    <div className="header">
      <img className="header__logo" src={maythe4} alt='May the Force Be With You' />
      {/* <ThemeSwitcher isDark={true}/> */}
    </div>
  );
};

export default Header;
