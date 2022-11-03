import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode, toggleDarkMode } from "../redux/darkMode";
import sunIcon from '../images/icon-sun.svg';
import moonIcon from '../images/icon-moon.svg';

// Contains heading and dark mode button.
export default function Header() {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  function darkModeIcon() {
    if (darkMode) {
      return <img
        className="w-5 h-5 sm:w-fit sm:h-fit"
        src={sunIcon}
        alt='sun'
      />;
    } else {
      return  <img
        className="w-5 h-5 sm:w-fit sm:h-fit"
        src={moonIcon} alt="moon"
      />
    }
  }

  return (
    <header className="flex items-center place-content-between">
      <h1 
        className="font-bold text-white inline-block text-2xl sm:text-4xl"
        style={{letterSpacing: 18}}
      >TODO</h1>
      <button onClick={() => dispatch(toggleDarkMode())}>
        {darkModeIcon()}
      </button>
    </header>
  );
}