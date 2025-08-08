import { useEffect } from "react";
import axios from "axios";

function App() {

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api");
      console.log(response.data);
    };
    fetchData();
  }, []);
  
  return (
    <div className="App">
      asdasdzzzss
    </div>
  );
}

export default App;
