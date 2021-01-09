import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import { GameContext } from "./GameContext";
import useInterval from "../hooks/use-interval.hook";

function App() {

  const { numCookies, setNumCookies, cookiesPerSecond} = React.useContext(
    GameContext
  );

  useInterval(() => {
    setNumCookies(numCookies + cookiesPerSecond);
  }, 1000);

  window.addEventListener('load',()=>{
    const lastLoadTime = localStorage.getItem("lastLoadTime");
    const secondsElapsedFromUnload = Math.floor((Date.now()-lastLoadTime)/1000);
    const cookiesGeneratedDuringUnload = cookiesPerSecond*secondsElapsedFromUnload;
    const totalCookiesAfterUnload = numCookies+cookiesGeneratedDuringUnload;
    setNumCookies(totalCookiesAfterUnload);
  });

  window.addEventListener('unload', ()=> {
    localStorage.setItem("lastLoadTime",Date.now());
  });

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;
