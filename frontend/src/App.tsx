import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import './App.css'
import OrganizationInterface from './components/organization/OrganizationInterface'
import BlogPostList from './components/blog/BlogPostList'
import PageDetail from './components/blog/PageDetail'
import Login from './components/auth/Login'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import ProtectedRoute from './components/auth/ProtectedRoute'
import FAQList from './components/faq/FAQList'
import AdminLayout from './components/layout/AdminLayout'
import Dashboard from './components/dashboard/Dashboard'
import { theme } from './theme'
import { AuthProvider } from './components/auth/AuthContext'
import { OrganizationProvider } from './components/organization/OrganizationContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <OrganizationProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/organization" element={<OrganizationInterface />} />
                        <Route path="/blog" element={<BlogPostList />} />
                        <Route path="/pages/:slug" element={<PageDetail />} />
                        <Route path="/faq" element={<FAQList />} />
                      </Routes>
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </OrganizationProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
