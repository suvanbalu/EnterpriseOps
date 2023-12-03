import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './ParentNavigation';
import DashboardScreen from './screens/DashboardScreen';
// import PurchasesScreen from './screens/PurchasesScreen';
// import SalesScreen from './screens/SalesScreen';
// import InventoryScreen from './screens/InventoryScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigation />} >
          <Route path="/" element={<DashboardScreen />} />
          {/* <Route path="purchases/*" element={<PurchasesRoutes />} />
              <Route path="sales/*" element={<SalesRoutes />} />
              <Route path="inventory/*" element={<InventoryRoutes />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;