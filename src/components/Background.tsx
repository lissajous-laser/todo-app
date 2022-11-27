import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SML_BG_BREAK_POINT, MOBILE_BREAK_POINT } from "../App";
import Header from "./Header";
import NewTaskEditor from "./NewTaskEditor";
import List from "./List";
import Filters from "./Filters";
import MenuBar from "./MenuBar";
import { selectDarkMode } from "../redux/darkMode";
import bgDesktopLight from '../images/bg-desktop-light.jpg';
import bgDesktopDark from '../images/bg-desktop-dark.jpg';
import bgMobileLight from '../images/bg-mobile-light.jpg';
import bgMobileDark from '../images/bg-mobile-dark.jpg';


export default function Background() {
  const darkMode = useSelector(selectDarkMode);


  const [windowWidth, setWindowWidth] =
    useState(window.innerWidth);

  useEffect(() => {
    const updateWindowWidth = () => setWindowWidth(window.innerWidth);

    window.addEventListener(
      'resize',
      updateWindowWidth
    );
    return () => {
      window.removeEventListener(
        'resize',
        updateWindowWidth
      )
    }
  });

  function backgroundStyle() {
    if (windowWidth > SML_BG_BREAK_POINT) {
      if (darkMode) {
        return {style: {
          backgroundImage: `url(${bgDesktopDark})`,
          maxWidth: 1440,
          backgroundPosition: '35% 0%'
        }};
      } else {
        return {style: {
          backgroundImage: `url(${bgDesktopLight})`,
          maxWidth: 1440,
          backgroundPosition: '35% 0%'
        }};
      }
    } else if (windowWidth <= SML_BG_BREAK_POINT) {
      if (darkMode) {
        return {style: {backgroundImage: `url(${bgMobileDark})`}};
      } else {
        return {style: {backgroundImage: `url(${bgMobileLight})`}}
      }
    }
  }

  return (
    <div {...darkMode && {className: 'dark'}}>
      <div
        className="flex justify-center h-screen w-screen border
          bg-very-light-gray dark:bg-very-dark-blue
          animate-darkToLight dark:animate-lightToDark"
        style={{fontFamily: 'Josefin Sans'}}
      >
        <main 
          className=" w-full flex justify-center no bg-no-repeat"
          {...backgroundStyle()}
        >
          <div className="mt-10 xs:mt-20 w-10/12 md:w-132">
            <Header/>
            <NewTaskEditor/>
            <div
              className="rounded shadow-lg dark:shadow-2xl bg-white
                dark:bg-very-dark-desaturated-blue"
              >
              <List windowWidth={windowWidth}/>
              <MenuBar windowWidth={windowWidth}/>
            </div>
            {windowWidth < MOBILE_BREAK_POINT && <div 
              className="rounded shadow-lg dark:shadow-2xl mt-6
                text-dark-grayish-blue h-12 flex content-center
                justify-center bg-white dark:bg-very-dark-desaturated-blue
                dark:text-very-dark-grayish-blue-dark-mode-1 "
            ><Filters/></div>}
          </div>
        </main>    
      </div>
    </div>
  )
}

