import React from "react";
import { Provider } from "react-redux";
import createStore from "./store/createStore";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const store = createStore();

const App = () => (
  <Provider store={store}>
    <Dashboard />
  </Provider>
);

export default App;
