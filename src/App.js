import './App.css';
import ArrowKeys from './Components/arrow-keys/arrow-keys';
import MapBase from './Components/MapBase/map-base';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="game-title">Rpg Maker Spin-off</h1>
        <span className="author-name">by Chirila Bogdan</span>
      </header>
      <main>
        <MapBase/>
        <ArrowKeys/>
      </main>
    </div>
  );
}

export default App;
