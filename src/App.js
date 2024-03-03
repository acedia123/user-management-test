import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, NotFoundPage, UserFormPage } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-user" element={<UserFormPage />} />
        <Route path="/:id" element={<UserFormPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
