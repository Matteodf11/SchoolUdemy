import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as API from './Services/data.js';
import { Header } from "./Header.jsx";
import { Box, Heading, Input, Button, Table, Text } from "@chakra-ui/react";


export function StudentCalifications() {
    let params = useParams();
    const [calificaciones, setCalificaciones] = useState([]);
    const [calificacion, setCalificacion] = useState({ descripcion: '', nota: '', porcentaje: '' });

    useEffect(() => {
        API.getCalifications(params.matriculaId).then(setCalificaciones);
    }, [params.matriculaId]);

    let total = 0;
    calificaciones.forEach(calificacion => {
        total += calificacion.nota * calificacion.porcentaje / 100;
    });

    function createCalificacion(event) {
        event.preventDefault();
        let { descripcion, nota, porcentaje } = calificacion;
        let isValid = descripcion.trim() !== '' && nota.trim() !== '' && porcentaje.trim() !== '';

        if (isValid) {
            API.addCalification(calificacion, params.matriculaId).then(response => {
                if (response === 'true') {
                    alert('Calificación creada');
                    API.getCalifications(params.matriculaId).then(setCalificaciones);
                    setCalificacion({ descripcion: '', nota: '', porcentaje: '' });
                } else {
                    alert('Error al crear la calificación');
                }
            }).catch(err => {
                console.error('Error al crear la calificación:', err);
            });
        } else {
            alert('Todos los campos son obligatorios');
        }
    }

    function deleteCalificacion(id) {
        API.deleteCalification(id).then(response => {
            if (response === 'true') {
                alert('Calificación eliminada');
                API.getCalifications(params.matriculaId).then(setCalificaciones);
            } else {
                alert('Error al eliminar la calificación');
            }
        }).catch(err => {
            console.error('Error al eliminar la calificación:', err);
        });
    }

    return (
        <>
            <Header />
            <Box p="6" bg="brand.50" minHeight="100vh">
                <Heading as="h1" size="lg" mb="6" textAlign="center" color="brand.500">
                    Calificaciones del Alumno
                </Heading>
                <Box bg="white" p="6" rounded="md" shadow="md">
                    <Table.Root>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Descripcion</Table.ColumnHeader>
                                <Table.ColumnHeader>Nota</Table.ColumnHeader>
                                <Table.ColumnHeader>Ponderacion</Table.ColumnHeader>
                                <Table.ColumnHeader></Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {calificaciones.map(calificacion => (
                                <Table.Row key={calificacion.id}>
                                    <Table.Cell>{calificacion.descripcion}</Table.Cell>
                                    <Table.Cell>{calificacion.nota}</Table.Cell>
                                    <Table.Cell>{calificacion.porcentaje}%</Table.Cell>
                                    <Table.Cell>
                                        <Button bg="brand.400" maxWidth="100px" width="100%"
                                            color="white"
                                            _hover={{
                                                bg: 'brand.300',
                                            }} onClick={() => deleteCalificacion(calificacion.id)}>
                                            Eliminar
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                            <Table.Row>
                                <Table.Cell>
                                    <Input
                                        type="text"
                                        id="descripcion"
                                        placeholder="Descripcion"
                                        value={calificacion.descripcion}
                                        onChange={event => setCalificacion({ ...calificacion, descripcion: event.target.value })}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        type="number"
                                        id="nota"
                                        placeholder="Nota"
                                        value={calificacion.nota}
                                        onChange={event => setCalificacion({ ...calificacion, nota: event.target.value })}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        type="number"
                                        id="porcentaje"
                                        placeholder="Ponderacion"
                                        value={calificacion.porcentaje}
                                        onChange={event => setCalificacion({ ...calificacion, porcentaje: event.target.value })}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button bg="brand.400" maxWidth="100px" width="100%"
                                        color="white"
                                        _hover={{
                                            bg: 'brand.300'
                                        }} onClick={createCalificacion}>
                                        Nueva
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table.Root>
                    <Text mt="4" fontWeight="bold">Nota Total: {total}</Text>
                </Box>
            </Box>
        </>
    );
}
