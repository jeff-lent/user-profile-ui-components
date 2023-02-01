import './App.css';
import CandidateAcademicInfo from './components/CandidateAcademicInfo/CandidateAcademicInfo';
import CandidatePersonalInfo from './components/CandidatePersonalInfo/CandidatePersonalInfo';
import { CandidateWorkInfo } from './components/CandidateWorkInfo/CandidateWorkInfo';



function App() {
  return (
    <div className="App">
     {/* <CandidatePersonalInfo></CandidatePersonalInfo> */}
    {/* <CandidateAcademicInfo /> */}
    <CandidateWorkInfo />
    </div>
  );
}

export default App;
