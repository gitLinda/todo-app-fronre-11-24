import { Outlet, NavLink } from 'react-router-dom';

export default function RootLayout() {
    return (
        <>
            <div id="sidebar">
                <h2>Navigation</h2>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="create">Create Todo</NavLink>
                        </li>
                        <li>
                            <NavLink to="list">Todo List</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="content">
                <Outlet />
            </div>
        </>
    );
}