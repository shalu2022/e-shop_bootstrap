import Main from "./component/Main";
import DataProvider from "./GlobalContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
         <Main/ >
      </DataProvider> 
    </div>
  );
}

export default App;
