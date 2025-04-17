import { Header } from "./Header";
import { useState } from "react";
import * as API from './Services/data.js';
import { Box, Heading, Input, NativeSelect, Button } from "@chakra-ui/react";

export function StudentNew() {
    const [student, setStudent] = useState({
        dni: '',
        nombre: '',
        direccion: '',
        edad: '',
        email: '',
        asignatura: '1'
    });

    function handleSubmit(event) {
        event.preventDefault();
        API.addStudent(student).then(response => {
            if (response === 'true') {
                alert('Alumno creado');
                document.getElementById('formulario').reset();
            } else {
                alert('Error al crear el alumno');
            }
        }).catch(error => {
            console.error(error);
            alert('Error al crear el alumno');
        });
    }

    return (
        <>
            <Header />
            <Box p="6" bg="brand.50" minHeight="100vh">
                <Heading as="h1" size="lg" mb="6" textAlign="center" color="brand.500">
                    Nuevo Alumno
                </Heading>
                <Box bg="white" p="6" rounded="md" shadow="md">
                    <form id='formulario' onSubmit={handleSubmit}>
                        Dni: <Input type="text" id="dni" required onChange={event => setStudent({ ...student, dni: event.target.value })} /><br />
                        Nombre: <Input type="text" id="nombre" required onChange={event => setStudent({ ...student, nombre: event.target.value })} /><br />
                        Direccion: <Input type="text" id="direccion" required onChange={event => setStudent({ ...student, direccion: event.target.value })} /><br />
                        Edad: <Input type="number" id="edad" required onChange={event => setStudent({ ...student, edad: event.target.value })} /><br />
                        Email: <Input type="email" id="email" required onChange={event => setStudent({ ...student, email: event.target.value })} /><br />
                        Asignatura: <NativeSelect.Root id="asignatura" required onChange={event => setStudent({ ...student, asignatura: event.target.value })}>
                            <NativeSelect.Field>
                                <option value="1">Matemáticas</option>
                                <option value="2">Informática</option>
                                <option value="3">Inglés</option>
                                <option value="4">Literatura</option>
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                        <br />
                        <Box display="flex" justifyContent="center">
                            <Button type='submit' id='enviar' width='40%' bg="brand.400" color="white" _hover={{ bg: 'brand.300' }}>Enviar</Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
}
