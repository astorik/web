import './App.css';
import icon from './astorik.jpg'

function App() {
  return (
    <div className="container font-sans">
      <div className="flex justify-between items-center w-screen bg-indigo-400 h-24 px-7">
        <img src={icon} alt="Astorik" className="h-1/2 w-auto"/>
        <div className="container">
          <p className="text-xl font-bold text-gray-100">user@host.com</p>
        </div>
      </div>
    </div>
  );
}

export default App;
