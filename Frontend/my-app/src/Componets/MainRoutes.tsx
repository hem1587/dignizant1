import Form from "./Form";
import { Route, Routes } from "react-router-dom";
import FormDataCount from "./FormDataCount";
const MainRoutes: React.FC = () => {
    return (
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/res" element={<FormDataCount />} />
      </Routes>
    );
  };
  
  export default MainRoutes;