import NavColumn from "../components/navcolumn"
import PatientsView from './patientsview'
import AuditsView from "./auditsview";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerifyView from "./verifyview";
import UsersView from "./usersview";
export default function Dashboard(){
    return (
        <div style={{display: 'flex'}}>
      <NavColumn/>
      <Routes>
      <Route path={`/`} element={<PatientsView/>}/>
      <Route path={`/patients`} element={<PatientsView/>}/>
      <Route path={`/audits`} element={<AuditsView/>}/>
      <Route path={`/verifications`} element={<VerifyView/>}/>
      <Route path={`/users`} element={<UsersView/>}/>
      </Routes>
    </div>
    )
}