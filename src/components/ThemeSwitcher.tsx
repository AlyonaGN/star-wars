import React from 'react';
import { connect } from 'react-redux';
import { themeActions } from '../store/theme/actions';

interface SwitcherProps {
  isDark: boolean,
  setTheme: (isDark: boolean) => void
}

const ThemeSwitcher: React.FC<SwitcherProps> = ({ isDark, setTheme }) => {
  console.log(isDark);
  return (
    <div className="switcher">
      <input
        type="checkbox"
        id="toggle-button"
        className="switcher__toggle-button"
        onChange={() => setTheme(isDark)}
      />
    </div>
  );
};

const mapStateToProps = (state: { theme: { isDark: boolean } } ) => ({
  isDark: state.theme.isDark,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setTheme: (isDark: boolean) => dispatch(themeActions.setTheme(!isDark)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitcher);
