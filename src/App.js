import Header from "./components/Header/Header";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Outlet className="outlet" />
    </>
  );
}

export default App;
