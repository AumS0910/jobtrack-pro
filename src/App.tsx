import Home from './pages/Home';
import { JobProvider } from './context/JobContext';
function App() {


  return (
    <JobProvider>
      <Home />
    </JobProvider>

  )
}

export default App
