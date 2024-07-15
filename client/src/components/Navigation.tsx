import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../utils/routes';
import './style/Navigation.css';
const Navigation = () => {
    const menuLinks = useMemo(() => {
      return routes
        .filter(route => route.children)
        .map(route => {
          return route.children!.map(route => {
            return {
              name: route.name,
              path: route.path
            }
          })
        })
        .flat()
    }, []) 
  return (
    <ul className='nav-container'>
        <h3>ASTERRA Project</h3>
        <div>
            {menuLinks.map(route => (
            <li key={route.name} ><Link to={route.path}> {route.name} </Link></li>
            ))}
        </div>
        
    </ul>
  )
}

export default Navigation