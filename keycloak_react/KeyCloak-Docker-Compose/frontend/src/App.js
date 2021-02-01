import logo from './logo.svg';
import './App.css';
import Secured from "./secured.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Secured />
      </header>
    </div>
  );
}

export default App;
