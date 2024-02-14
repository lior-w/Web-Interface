import Login from "./components/Login";
import Registration from "./components/Registration";
import CreateGame from "./components/CreateGame";
import SavedGames from "./components/SavedGames";

function App() {
  return (
    <div>
      <Registration />
      <Login />
      <CreateGame />
      <SavedGames />
    </div>
  );
}

export default App;
