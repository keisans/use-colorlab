import React, {useContext, useEffect, useState} from 'react';

const defaultContextData = {
  dark: false,
  setDark: () => {},
  setColors: () => {},
  getColors: () => {}
}

export const ColorContext = React.createContext(defaultContextData);

export const useColorlab = () => {
  const context = useContext(ColorContext);
  return context.colors;
}

const generateColorFns = (colors) => {
  return Object.keys(colors).reduce((acc, name) => {
    acc[name] = (stop, mode) => {
      if (typeof stop === 'string') {
        mode = stop;
        stop = null;
      }

      let colorStop = colors[name].default;
      if (stop !== null && colors[name][stop]) {
        colorStop = colors[name][stop];
      }

      if (mode && colorStop[mode]) {
        return colorStop[mode]
      }
      return colorStop.hex;
    }
    return acc;
  }, {});
}

export const ColorProvider = ({children, colors}) => {
  const [themestate, setThemeState] = useState({
    dark: false,
    loaded: false,
    colors: generateColorFns(colors)
  });

  useEffect(() => {
    try {
      const browserDarkMode = matchMedia('(prefers-color-scheme: dark)');
      const localDarkMode = localStorage.getItem('dark-mode') === 'true';
      const isDarkMode = browserDarkMode.matches || localDarkMode;
      setThemeState({
        ...themestate,
        dark: isDarkMode,
        loaded: true
      });
    } catch (err) {
      setThemeState({...themestate, loaded: true})
    }
  }, [])

  return (
    <ColorContext.Provider
      value={{
        meta: {
          dark: themestate.dark,
          loaded: themestate.loaded
        },
        colors: themestate.colors
      }}
    >
      {children}
    </ColorContext.Provider>
  );
}
