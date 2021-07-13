import { NavLink } from "react-router-dom"

export const NavBar = () => {
    return (
        <nav className="nav-bar">
            <NavLink exact to="/">Random</NavLink>
            <NavLink to="/search">Search</NavLink>
        </nav>
    )
}