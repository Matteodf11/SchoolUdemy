import { useState, useEffect } from "react";
import * as API from './Services/data.js';
import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Heading,
    Table,
    Text,
    Icon
} from "@chakra-ui/react";
import { HiHeart } from "react-icons/hi"


export function StudentsList() {
    let user = sessionStorage.getItem('usuario');
    const [students, setStudents] = useState([]);
    useEffect(() => {
        API.getStudents(user).then(setStudents);
    }, [user]);

    function deleteStudent(id) {
        event.preventDefault();
        API.deleteStudent(id).then(response => {
            if (response === 'true') {
                alert('Alumno eliminado');
                API.getStudents(user).then(setStudents);
            } else {
                alert('Error al eliminar el alumno');
            }
        });
    }

    return (
        <Box p="6" bg="brand.50" minHeight="100vh" >
            <Heading as="h1" size="lg" mb="6" textAlign="center" color="brand.500">
                Lista de Alumnos
            </Heading>
            <Box overflowX="auto" bg="white" p="6" rounded="md" shadow="md" m='0 auto' maxW='80em'>
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>ID</Table.ColumnHeader>
                            <Table.ColumnHeader>DNI</Table.ColumnHeader>
                            <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                            <Table.ColumnHeader >Dirección</Table.ColumnHeader>
                            <Table.ColumnHeader hideBelow="md">Edad</Table.ColumnHeader>
                            <Table.ColumnHeader hideBelow="md">Email</Table.ColumnHeader>
                            <Table.ColumnHeader>Asignatura</Table.ColumnHeader>
                            <Table.ColumnHeader>Modificar</Table.ColumnHeader>
                            <Table.ColumnHeader>Calificar</Table.ColumnHeader>
                            <Table.ColumnHeader>Eliminar</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {students.map((student) => (
                            <Table.Row key={student.id}>
                                <Table.Cell>{student.id}</Table.Cell>
                                <Table.Cell>{student.dni}</Table.Cell>
                                <Table.Cell>{student.nombre}</Table.Cell>
                                <Table.Cell>{student.direccion}</Table.Cell>
                                <Table.Cell hideBelow="md">{student.edad}</Table.Cell>
                                <Table.Cell hideBelow="md">{student.email}</Table.Cell>
                                <Table.Cell>{student.asignatura}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        as={Link}
                                        to={`/student/${student.id}`}
                                        bg="brand.400"
                                        color="white"
                                        _hover={{
                                            bg: 'brand.300',
                                        }}
                                    >
                                        <Text hideBelow="md">Modificar</Text> 
                                        <Icon hideFrom='md' size="lg" color="pink.700">
                                            <HiHeart />
                                        </Icon>
                                    </Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button
                                        as={Link}
                                        to={`/student/califications/${student.matriculaId}`}
                                        bg="brand.400"
                                        color="white"
                                        _hover={{
                                            bg: 'brand.300',
                                        }}


                                        
                                    >
                                        Calificar
                                    </Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button
                                        bg="brand.400"
                                        color="white"
                                        _hover={{
                                            bg: 'brand.300',
                                        }}
                                        onClick={() => deleteStudent(student.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Box>
        </Box>
    );
}
