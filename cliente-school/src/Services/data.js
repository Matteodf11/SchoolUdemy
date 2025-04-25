const URL = 'https://localhost:7086/api/'


export function login(usuario, pass) {
    let datos = { usuario: usuario, pass: pass };

    return fetch(URL + 'Profesores/Login', {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then(data => data.text())
}

export function getStudents(usuario) {
    return fetch(URL + `Alumnos/alumnosProfesor?usuario=${usuario}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.json())
}

export function addStudent(student) {

    let data = {
        dni: student.dni,
        nombre: student.nombre,
        direccion: student.direccion,
        edad: student.edad,
        email: student.email,
        asignatura: student.asignatura
    }

    return fetch(URL + `Alumnos/crearAlumno?id_asig=${student.asignatura}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.text())
}

export function deleteStudent(id) {

    return fetch(URL + `Alumnos/eliminarAlumno?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.text())
}

export function getStudentDetails(id) {
    return fetch(URL + `Alumnos/datosAlumno?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.json())
}

export function updateStudent(student) {
    return fetch(URL + 'Alumnos/editarAlumno', {
        method: 'PUT',
        body: JSON.stringify(student),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.text())
}

export function getCalifications(id) {
    return fetch(URL + `Calificaciones/calificacionesAlumno?idMatricula=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.json())
}

export function addCalification(calificacion, id) {
    let data = {
        descripcion: calificacion.descripcion,
        nota: calificacion.nota, // Convertir a número flotante
        porcentaje: calificacion.porcentaje, // Convertir a número entero
        matriculaId: id// Asegúrate de que sea un número entero
    };

    return fetch(URL + `Calificaciones/crearCalificacion`, {
        method: 'POST',
        body: JSON.stringify(data), // Serializar el objeto como JSON
        headers: {
            'Content-Type': 'application/json' // Especificar el tipo de contenido
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error al crear la calificación');
        }
        return response.text();
    });

}

export function deleteCalification(id) {

    return fetch(URL + `Calificaciones/eliminarCalificacion?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.text())
}