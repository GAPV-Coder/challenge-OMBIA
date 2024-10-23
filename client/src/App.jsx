import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import LayoutApp from './components/LayoutApp';
import CreateWaitingCar from './components/CreateWaitingCar';
import WaitingCarsList from './components/WaitingCarsList';
import ProcessParkingPositions from './components/ProcessParkingPositions';
import ProcessedParkingLots from './components/ProcessedParkingLots';

const { Content } = Layout;

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LayoutApp />}>
                    <Route
                        path="waiting-cars/create"
                        element={<CreateWaitingCar />}
                    />
                    <Route
                        path="waiting-cars/list"
                        element={<WaitingCarsList />}
                    />
                    <Route
                        path="process-parking/positions"
                        element={<ProcessParkingPositions />}
                    />
                    <Route
                        path="processed-parking-lots/list"
                        element={<ProcessedParkingLots />}
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
