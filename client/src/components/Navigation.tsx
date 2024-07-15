import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from '../utils/routes';

const Navigation = () => {
    const navigate = useNavigate();

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
    <ul>
        {menuLinks.map(route => (
        <li><Link key={route.name} to={route.path}> {route.name} </Link></li>
        ))}
    </ul>
  )
}

export default Navigation