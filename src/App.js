import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Error404 from "./pages/Error404";
import SignUp from "./pages/SignUp";
function App() {
  return (
   <>
    <Routes>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="*" element={<Error404/>}/>
    </Routes>
   </>
  );
}

export default App;
