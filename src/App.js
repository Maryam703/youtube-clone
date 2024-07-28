import Header from "./components/Header/Header";
import "./App.css";
import { Outlet } from "react-router-dom";
import ContextProvider from "./Context/ContextProvider";

function App() {
  return (
    <>
      <ContextProvider>
        <Header />
        <Outlet className="outlet" />
      </ContextProvider>
    </>
  );
}

export default App;
