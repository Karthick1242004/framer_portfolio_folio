import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import ProjectDetail from './project'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/project/:id' element={<ProjectDetail/>} />
      </Routes>
    </div>
  )
}

export default App
