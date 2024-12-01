import { AuthProvider } from '../hooks/AuthContext';
import AuthPage from '../pages/AuthPage/AuthPage';
import MainPage from '../pages/MainPage/MainPage';
import '../shared/styles/App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PaymentsPage from '../pages/PaymentsPage/PaymentsPage';
import GoalsPage from '../pages/GoalsPage/GoalsPage';
import FamilyPage from '../pages/FamilyPage/FamilyPage';
import JournalPage from '../pages/JournalPage/JournalPage';

function App() {
  return (
    <AuthProvider>
      <div className="_container App">
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/auth" element={<AuthPage/>} />
          <Route 
            path="/" 
            element={
              <MainPage/>
            } 
          />
          <Route 
            path="/payments" 
            element={
              <PaymentsPage/>
            } 
          />
          <Route 
            path="/goals" 
            element={
              <GoalsPage/>
            } 
          />
          <Route 
            path="/family" 
            element={
              <FamilyPage/>  
            }
          />
          <Route 
            path="/read"
            element={
              <JournalPage/>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
