import React from 'react';

const ThemeSwitcher: React.FC = () => {
  return (
    <div className="switcher">
      <input
        type="checkbox"
        id="toggle-button"
        className="switcher__toggle-button"
      />
    </div>
  );
};

export default ThemeSwitcher;
