import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import OrganizationInterface from './components/organization/OrganizationInterface'
import BlogPostList from './components/blog/BlogPostList'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrganizationInterface />} />
        <Route path="/blog" element={<BlogPostList />} />
      </Routes>
    </Router>
  )
}

export default App
