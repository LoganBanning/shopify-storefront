import './App.css';
import ProductPage from './Components/ProductPage';

function App({shopifyClient}) {
  return (
    <div className="App">
      <ProductPage shopifyClient={shopifyClient} />
    </div>
  );
}

export default App;
