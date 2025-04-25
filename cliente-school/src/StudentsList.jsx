import { useState, useEffect } from "react";
import * as API from './Services/data.js';
import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Heading,
    Table,
    Text,
    Icon,
    Input
} from "@chakra-ui/react";
import { HiPencil, HiTrash, HiStar } from "react-icons/hi";
import { Toaster, toaster } from './components/ui/toaster';
import { motion } from 'framer-motion';

export function StudentsList() {
    let user = sessionStorage.getItem('usuario');
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        API.getStudents(user).then(setStudents);
    }, [user]);

    async function deleteStudent(id) {
        event.preventDefault();
        const response = await API.deleteStudent(id);
        if (response === 'true') {
            toaster.success({
                title: "Alumno eliminado.",
                description: "El alumno ha sido eliminado correctamente.",
            });
            API.getStudents(user).then(setStudents);
        } else {
            toaster.error({
                title: "Error al eliminar.",
                description: "Hubo un error al intentar eliminar el alumno.",
            });
        }
    }

    const filteredStudents = students.filter(student =>
        student.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box p="6" bg="brand.50" minHeight="100vh">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.3 }}
            >
                <Heading as="h1" size="lg" mb="6" textAlign="center" color="brand.500">
                    Lista de Alumnos
                </Heading>
            </motion.div>
            <Box mb="6" textAlign="center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Input
                        placeholder="Buscar por nombre"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        maxW="400px"
                        mx="auto"
                    />
                </motion.div>
            </Box>
            <Box overflowX="auto" bg="white" p="6" rounded="md" shadow="md" m='0 auto' maxW='80em'>
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>ID</Table.ColumnHeader>
                            <Table.ColumnHeader>DNI</Table.ColumnHeader>
                            <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                            <Table.ColumnHeader>Dirección</Table.ColumnHeader>
                            <Table.ColumnHeader hideBelow="md">Edad</Table.ColumnHeader>
                            <Table.ColumnHeader hideBelow="md">Email</Table.ColumnHeader>
                            <Table.ColumnHeader>Asignatura</Table.ColumnHeader>
                            <Table.ColumnHeader>Modificar</Table.ColumnHeader>
                            <Table.ColumnHeader>Calificar</Table.ColumnHeader>
                            <Table.ColumnHeader>Eliminar</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filteredStudents.map((student) => (
                            <motion.tr
                                key={`${student.id}-${student.asignatura}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Table.Cell>{student.id}</Table.Cell>
                                <Table.Cell>{student.dni}</Table.Cell>
                                <Table.Cell>{student.nombre}</Table.Cell>
                                <Table.Cell>{student.direccion}</Table.Cell>
                                <Table.Cell hideBelow="md">{student.edad}</Table.Cell>
                                <Table.Cell hideBelow="md">{student.email}</Table.Cell>
                                <Table.Cell>{student.asignatura}</Table.Cell>
                                <Table.Cell>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
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
                                            <Icon hideFrom="md" size="lg" color="brown.600">
                                                <HiPencil />
                                            </Icon>
                                        </Button>
                                    </motion.div>
                                </Table.Cell>
                                <Table.Cell>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Button
                                            as={Link}
                                            to={`/student/califications/${student.matriculaId}`}
                                            bg="brand.400"
                                            color="white"
                                            _hover={{
                                                bg: 'brand.300',
                                            }}
                                        >
                                            <Text hideBelow="md">Calificar</Text>
                                            <Icon hideFrom="md" size="lg" color="brown.600">
                                                <HiStar />
                                            </Icon>
                                        </Button>
                                    </motion.div>
                                </Table.Cell>
                                <Table.Cell>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Button
                                            bg="brand.400"
                                            color="white"
                                            _hover={{
                                                bg: 'brand.300',
                                            }}
                                            onClick={() => deleteStudent(student.id)}
                                        >
                                            <Text hideBelow="md">Eliminar</Text>
                                            <Icon hideFrom="md" size="lg" color="brown.600">
                                                <HiTrash />
                                            </Icon>
                                        </Button>
                                    </motion.div>
                                </Table.Cell>
                            </motion.tr>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Box>
            <Toaster />
        </Box>
    );
}
