import "./App.css";
import Header_table from "./Header/Header_table";
import Detail_Table from "./Table/Detail_Table";
import TopBar from "./Topbar/TopBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="" element={<Detail_Table />}></Route>
        <Route path="header" element={<Header_table />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
