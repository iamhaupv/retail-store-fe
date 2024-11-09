import AllRoute from "./components/AllRoute";
import { ShelfProvider } from "./contexts/ShelfContext";
// import { configDotenv } from "dotenv";
function App() {
  return (
    <>
      <ShelfProvider>
        <AllRoute />
      </ShelfProvider>
    </>
  );
}

export default App;
