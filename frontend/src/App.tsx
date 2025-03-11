import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import OrganizationInterface from './components/organization/OrganizationInterface'
import BlogPostList from './components/blog/BlogPostList'
import PageDetail from './components/blog/PageDetail'
import Login from './components/auth/Login'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import ProtectedRoute from './components/auth/ProtectedRoute'
import FAQList from './components/faq/FAQList'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrganizationInterface />} />
        <Route path="/blog" element={<ProtectedRoute><BlogPostList /></ProtectedRoute>} />
        <Route path="/pages/:slug" element={<ProtectedRoute><PageDetail /></ProtectedRoute>} />
        <Route path="/login/" element={<Login/>} />
<Route path="/forgot-password" element={<ForgotPassword/>} />
<Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/faq" element={<ProtectedRoute><FAQList /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
