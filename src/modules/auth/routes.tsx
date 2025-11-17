import Login from './pages/login';
import Signup from './pages/signup';

export const authRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Signup /> },
];
