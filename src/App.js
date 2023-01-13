import "./App.css";
import Footer from "./components/Common/Footer";
import Header from "./components/Common/Header";
import MainComponent from "./components/LandingPage/MainComponent";

function App() {
  return (
    <div className="App">
      <Header />
      <MainComponent />
      <Footer />
    </div>
  );
}

export default App;
