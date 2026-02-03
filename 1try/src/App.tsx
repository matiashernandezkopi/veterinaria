import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import Studies from "./pages/Studies";
import NewStudy from "./components/NewStudy";
import StudyPage from "./pages/StudyPage";
import QRStudy from "./components/QRStudy";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/qr/:id" element={<QRStudy />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Studies />} />
          <Route path="/new-study" element={<NewStudy />} />
          <Route path="/studies/:id" element={<StudyPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
