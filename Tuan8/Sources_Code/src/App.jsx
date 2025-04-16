import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cach1 from "./components/Bai1_Cach1";
import Cach2 from "./components/Bai1_Cach2";
import Cach3 from "./components/Bai1_Cach3";

import Cach1_B2 from "./components/Bai2_Cach1";
import Cach2_B2 from "./components/Bai2_Cach2";
import Cach3_B2 from "./components/Bai2_Cach3";

import Cach1_B3 from "./components/Bai3_Cach1";
import Cach2_B3 from "./components/Bai3_Cach2";
import Cach3_B3 from "./components/Bai3_Cach3";

import Cach1_B4 from "./components/Bai4_Cach1";
import Cach2_B4 from "./components/Bai4_Cach2";
import Cach3_B4 from "./components/Bai4_Cach3";

import Cach1_B5 from "./components/Bai5_Cach1";
import Cach2_B5 from "./components/Bai5_Cach2";
import Cach3_B5 from "./components/Bai5_Cach3";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/cach1" element={<Cach1 />} />
          <Route path="/cach2" element={<Cach2 />} />
          <Route path="/cach3" element={<Cach3 />} />

          <Route path="/cach1_b2" element={<Cach1_B2 />} />
          <Route path="/cach2_b2" element={<Cach2_B2 />} />
          <Route path="/cach3_b2" element={<Cach3_B2 />} />

          <Route path="/cach1_b3" element={<Cach1_B3 />} />
          <Route path="/cach2_b3" element={<Cach2_B3 />} />
          <Route path="/cach3_b3" element={<Cach3_B3 />} />

          <Route path="/cach1_b4" element={<Cach1_B4 />} />
          <Route path="/cach2_b4" element={<Cach2_B4 />} />
          <Route path="/cach3_b4" element={<Cach3_B4 />} />

          <Route path="/cach1_b5" element={<Cach1_B5 />} />
          <Route path="/cach2_b5" element={<Cach2_B5 />} />
          <Route path="/cach3_b5" element={<Cach3_B5 />} />

          {/* Route mặc định */}
          <Route path="*" element={<Cach1 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
