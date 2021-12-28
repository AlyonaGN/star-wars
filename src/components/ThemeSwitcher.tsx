import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setTheme } from '../store/themeSlice';

const ThemeSwitcher: React.FC = () => {
  const isDark = useAppSelector(state => state.theme.isDark);
  const dispatch = useAppDispatch();
  return (
    <div className="switcher">
      <input
        type="checkbox"
        id="toggle-button"
        className="switcher__toggle-button"
        onChange={() => dispatch(setTheme(!isDark))}
      />
    </div>
  );
};



export default ThemeSwitcher;
