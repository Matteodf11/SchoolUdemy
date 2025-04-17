import { useParams } from "react-router-dom";
import { Header } from "./Header";
import { useState, useEffect } from "react";
import * as API from './Services/data.js';
import { Box, Heading, Input, Button } from "@chakra-ui/react";

export function StudentEdit() {
    let params = useParams();
    const [student, setStudent] = useState({});

    useEffect(() => {
        API.getStudentDetails(params.studentId).then(setStudent);
    }, [params.studentId]);

    function handleSubmit(event) {
        event.preventDefault();
        API.updateStudent(student).then(response => {
            if (response === 'true') {
                alert('Alumno modificado');
                document.getElementById('formulario').reset();
            } else {
                alert('Error al modificar el alumno');
            }
        }).catch(error => {
            console.error(error);
            alert('Error al modificar el alumno');
        });
    }

    return (
        <>
            <Header />
            <Box p="6" bg="brand.50" minHeight="100vh">
                <Heading as="h1" size="lg" mb="6" textAlign="center" color="brand.500">
                    Editar Alumno
                </Heading>
                <Box bg="white" p="6" rounded="md" shadow="md">
                    <form id='formulario' onSubmit={handleSubmit}>
                        <Box mb="4">
                            <label htmlFor="dni">DNI</label>
                            <Input
                                type="text"
                                id="dni"
                                disabled
                                required
                                value={student.dni || ''}
                                onChange={event => setStudent({ ...student, dni: event.target.value })}
               
                            />
                        </Box>
                        <Box mb="4">
                            <label htmlFor="nombre">Nombre</label>
                            <Input
                                type="text"
                                id="nombre"
                                required
                                value={student.nombre || ''}
                                onChange={event => setStudent({ ...student, nombre: event.target.value })}
                            />
                        </Box>
                        <Box mb="4">
                            <label htmlFor="direccion">Dirección</label>
                            <Input
                                type="text"
                                id="direccion"
                                required
                                value={student.direccion || ''}
                                onChange={event => setStudent({ ...student, direccion: event.target.value })}
                            />
                        </Box>
                        <Box mb="4">
                            <label htmlFor="edad">Edad</label>
                            <Input
                                type="number"
                                id="edad"
                                required
                                value={student.edad || ''}
                                onChange={event => setStudent({ ...student, edad: event.target.value })}
                            />
                        </Box>
                        <Box mb="4">
                            <label htmlFor="email">Email</label>
                            <Input
                                type="email"
                                id="email"
                                required
                                value={student.email || ''}
                                onChange={event => setStudent({ ...student, email: event.target.value })}
                            />
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <Button type='submit' id='enviar' width='40%' bg="brand.400" color="white" _hover={{ bg: 'brand.300' }}>Enviar</Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
}
