import "./App.css";
import AppRoutes from "./AppRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
