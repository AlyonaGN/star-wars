import { useSelector } from 'react-redux';
import Header from './Header';
import People from './People';

const Main: React.FC = () => {
  const isDark = useSelector((st: any) => {
    return st.theme.isDark;
  })
  return (
    <div className={isDark ? "main main_dark" : "main main_light"}>
      <Header />
      <People />
    </div>
  );
};

export default Main;
