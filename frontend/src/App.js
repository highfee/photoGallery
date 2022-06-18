import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Gallery from "./components/Gallery";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
 
  return (
    <Router>
      <section className="">
        <div className="container">
           <Header />
           <Routes>
              <Route path="/" element={< Gallery/>} />
              <Route path="/login" element={ < Login/>} />
              <Route path="/register" element={ < Register/>}/>
           </Routes>
           <ToastContainer />
        </div>
      </section>
      </Router>
  );
}

export default App;
