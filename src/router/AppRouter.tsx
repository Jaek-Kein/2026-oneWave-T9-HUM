import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import WordDetailPage from "../pages/WordDetailPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/words/:wordId" element={<WordDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
