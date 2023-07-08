import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Movies from './components/Movies/Movies';
import People from './components/People/People';
import Rigster from './components/Rigster/Rigster';
import TvShows from './components/TvShows/TvShows';
import WeekTrend from './components/Home/HomeComponents/WeekTrend/WeekTrend';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="positionRelative">
        <Navbar/>
        <Routes>
          <Route path='home' element={<Home/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='Logout' element={<Logout/>}/>
          <Route path='movies' element={<Movies/>}/>
          <Route path='people' element={<People/>}/>
          <Route path='rigster' element={<Rigster/>}/>
          <Route path='tvshows' element={<TvShows/>}/>
          <Route path='weektrend' element={<WeekTrend/>} />
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
