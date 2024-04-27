import { useResolvedPath,useMatch, Link} from 'react-router-dom'
import "../styles.css"
export default function NavColumn(){
    // let {path, url} = useRouteMatch()
    const resolvedPath = useResolvedPath
    return (
        <nav>
            <ul>
                <li className={useMatch({path: useResolvedPath('/dashboard/patients').pathname, end: true}) ? "navActive" : ""}>
                <Link to='/dashboard/patients'>Patients Data</Link>
                </li>
                <li className={useMatch({path: useResolvedPath('/dashboard/audits').pathname, end: true}) ? "navActive" : ""}>
                <Link to='/dashboard/audits'>Audit Data</Link>
                </li>
                <li className={useMatch({path: useResolvedPath('/dashboard/verifications').pathname, end: true}) ? "navActive" : ""}>
                <Link to='/dashboard/verifications'>Verification Requests (Admin)</Link>    
                </li>
                
            </ul>
            
        </nav>
    )
}