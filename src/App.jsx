import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LoginRegister from './pages/LoginRegister'
import Vacancy from './pages/Vaccany'
import JobDetail from './pages/JobDetail'
import Dashboard from './pages/Dashboard'
import ListJobTable from './components/ListJobTable'
import AddNewJob from './components/AddNewJob'
import CardProfile from './components/CardProfile'
import { AuthProvider } from './context/AuthContext'
import { LoginRoute, PrivateRoute } from './routes/ProtectedRoute'
import WelcomeDashboard from './components/WelcomeDashboard'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <LoginRoute>
              <LoginRegister mode="login" />
            </LoginRoute>
          }
        />
        <Route
          path="/register"
          element={
            <LoginRoute>
              <LoginRegister mode="register" />
            </LoginRoute>
          }
        />
        <Route
          path="/Vacancy"
          element={
            <>
              <Navbar />
              <Vacancy />
              <Footer />
            </>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <>
              <Navbar />
              <JobDetail />
              <Footer />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<WelcomeDashboard />} />
          <Route path="list" element={<ListJobTable />} />
          <Route path="add" element={<AddNewJob />} />
          <Route path="edit/:id" element={<AddNewJob />} />
          <Route path="profile" element={<CardProfile />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
