import { Provider } from "react-redux";
import { store } from "./store/store";
import ServiceForm from "./components/ServiceForm";
import SearchBar from './components/SearchBar';
import ServiceList from "./components/ServiceList";
import "./App.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="App">
          <div className="container">
            <h1>Управление услугами</h1>
            <ServiceForm />
            <SearchBar />
            <ServiceList />
          </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
