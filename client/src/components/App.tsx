import React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Fib from "./Fib";

const App = (): JSX.Element => {
  return (
    <div>
      <Fib />
    </div>
  );
};

export default App;
