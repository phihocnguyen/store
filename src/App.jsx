import { Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/landing'
import Login from './pages/loginpage'
import Signup from './pages/signuppage'
import Mainpage from './pages/mainpage'
import Appointments from './pages/appointments'
import Patients from './pages/patients'
import Messages from './pages/messages'
import Report from './pages/report'
import Personal from './pages/personal'
import Settings from './pages/settings'
import { UserContextProvider } from './userContext'
import DoctorProfile from './pages/doctor-profile'
import Appointment from './pages/appointment'
import News from './pages/news'
import NewsSearch from './pages/news-search'
import Doctors from './pages/doctors'
import BlogEditor from './pages/blog-editor'
import BlogDetail from './pages/blog-detail'
import WorkingSchedule from './pages/working-schedule'
import Order from './pages/order'
import Profile from './pages/profile'
import ChangePassword from './pages/change-password'
import Conversation from './pages/conversation'
import UserMessages from './pages/user-messages'
import Blogs from './pages/blogs'
import DoctorSearch from './pages/doctor-search'
import ManageDoctors from './pages/admin-doctors'
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/mainpage' element={<Mainpage />} />
        <Route path='/appointments' element={<Appointments />} />
        <Route path='/patients' element={<Patients />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/report' element={<Report />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/personal' element={<Personal />} />
        <Route path='/doctor-profile/:id' element={<DoctorProfile />} />
        <Route path='/appointment/:id' element={<Appointment />} />
        <Route path='/news' element={<News />} />
        <Route path='/news-search' element={<NewsSearch/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/blog-editor' element={<BlogEditor/>} />
        <Route path='/blog-detail/:id' element={<BlogDetail/>} />
        <Route path='/working-schedule' element={<WorkingSchedule/>} />
        <Route path='/user/order' element={<Order/>} />
        <Route path='/user/profile' element={<Profile/>} />
        <Route path='/user/settings' element={<ChangePassword/>} />
        <Route path='/conversation/:id' element={<Conversation/>} />
        <Route path='/user/messages' element={<UserMessages/>} />
        <Route path='/blogs' element={<Blogs/>} />
        <Route path='/doctors/search' element={<DoctorSearch/>} />
        <Route path='/admin/doctors' element={<ManageDoctors/>} />
      </Routes>
    </UserContextProvider>
  )
}

export default App