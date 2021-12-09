import React from 'react';

interface ThemeSwitcherProps {
  isDark: boolean
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ isDark }: ThemeSwitcherProps)  => {
  return (
    <div
      className='switcher'
    >
      <input type="checkbox" id="toggle-button" className="switcher__toggle-button"/>
    </div>
  );
};

export default ThemeSwitcher;