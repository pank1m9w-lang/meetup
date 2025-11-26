import Home from './components/Home';
import EventDetails from './components/EventDetails';
import Program from './components/Program';
import RegistrationForm from './components/RegistrationForm';
import JoinUs from './components/JoinUs';
import './App.css';

function App() {
  return (
    <div className="app">
      <Home />
      <EventDetails />
      <Program />
      <RegistrationForm />
      <JoinUs />
    </div>
  );
}

export default App;
