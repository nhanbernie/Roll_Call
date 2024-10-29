import Roll from './modules//components/Roll'
import { BrowserRouter, Routes, Route } from "react-router-dom"; import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentDetail from './modules/components/StudentDetail';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
      <BrowserRouter basename="/ManagerStudent">
        <Routes>
          <Route path="/" element={<Roll />} />
          <Route path="/student/:studentId" element={<StudentDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
