
import { useAppSelector } from '../store/hooks';
import Header from './Header';
import PeopleComponent from './People';

const Main: React.FC = () => {
  const isDark = useAppSelector(state => state.theme.isDark);
  return (
    <div className={isDark ? "main main_dark" : "main main_light"}>
      <Header />
      <PeopleComponent />
    </div>
  );
};

export default Main;
