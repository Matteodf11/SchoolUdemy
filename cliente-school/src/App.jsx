import { Routes, Route } from 'react-router-dom'

import { Login } from './Login.jsx'

import { Dashboard } from './Dashboard.jsx'

import { StudentNew } from './StudentNew.jsx'

import { StudentEdit } from './StudentEdit.jsx'
import { StudentCalifications } from './StudentCalifications.jsx'
export function App() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={< Dashboard />} />
            <Route path="/student" element={< StudentNew />} />
            <Route path="/student/:studentId" element={< StudentEdit />} />
            <Route path="/student/califications/:matriculaId" element={< StudentCalifications />} />
        </Routes>
    )
}


