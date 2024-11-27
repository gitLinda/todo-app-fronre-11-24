import ReactDOM from 'react-dom/client';
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./pages/RootLayout.tsx";
import {Welcome} from "./components/Welcome.tsx";
import {CreateTodo} from "./pages/CreateTodo.tsx";
import {TodoList} from "./pages/TodoList.tsx";
import { StrictMode } from 'react';
import {TodoDetails} from "./pages/TodoDetails.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Welcome /> },
            {
                path: 'create',
                element: <CreateTodo />,
            },
            {
                path: 'list',
                element: <TodoList />,
            },
            {
                path: 'details/:todoId',
                element: <TodoDetails />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
