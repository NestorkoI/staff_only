import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './routes/home';
import Login from './routes/login';
import Signup from './routes/signup';
import Chat from './routes/chat';
import NotFound from './routes/404';
import 'rsuite/dist/rsuite.min.css';
import Private from './components/privateRoute/private';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="chat"
          element={
            <Private>
              <Chat />
            </Private>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
