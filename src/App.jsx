import './App.css'
import { BrowserRouter as Router, Route,Routes, Navigate } from 'react-router-dom'
import TestPage from './test.jsx'
import HomePage from './components/home.jsx'
import AnalyticsPage from './analytics.jsx'
import StudentPage from './student_stats.jsx'
import WhiteboardPage from './components/whiteboard/whiteboard'
import LoginPage from './login.jsx'
import UserProfilePage from './components/profile.jsx'
import StudentRatingPage from './student_ratings.jsx'
import TestResults from './components/testResults.jsx'
import TeamResults from './components/teamresults.jsx'
import TeamStats from './teamStats.jsx'
function App() {
  return(
  <>
  
  <Router>
    <Routes>
      
      <Route path = '/test/:id' element = {<TestPage/>}>

      </Route>
      <Route path = '/' element = {<HomePage/>}>

      </Route>
      <Route path=  '*' element = {<Navigate to='/'/>}></Route>
      <Route path = '/analytics' element = {<AnalyticsPage/>}></Route>
      <Route path=  '/student/:id' element = {<StudentPage/>}></Route>
      <Route path = '/whiteboard' element = {<WhiteboardPage/>}></Route>
      <Route path = '/login' element = {<LoginPage></LoginPage>}/>
      <Route path = '/profile' element = {<UserProfilePage/>}></Route>
      <Route path = '/rating' element ={<StudentRatingPage/>}/>
      <Route path = '/results/:id' element = {<TestResults/>}/>
      <Route path = '/teams' element = {<TeamResults/>}/>
      <Route path = '/teams/results/:id' element = {<TeamStats/>}/>
    </Routes>
  </Router>

  </>
  )
}

export default App
