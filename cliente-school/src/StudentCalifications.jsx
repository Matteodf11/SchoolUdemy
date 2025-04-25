import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as API from './Services/data.js';
import { Header } from "./Header.jsx";
import { Box, Heading, Input, Button, Table, Stat } from "@chakra-ui/react";
import { Toaster, toaster } from './components/ui/toaster';
import { motion } from 'framer-motion';

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

    async function createCalificacion(event) {
        event.preventDefault();
        let { descripcion, nota, porcentaje } = calificacion;
        let isValid = descripcion.trim() !== '' && nota.trim() !== '' && porcentaje.trim() !== '';

        if (isValid) {
            try {
                const response = await API.addCalification(calificacion, params.matriculaId);
                if (response === 'true') {
                    toaster.success({
                        title: "Calificación creada.",
                        description: "La calificación ha sido creada correctamente.",
                    });
                    API.getCalifications(params.matriculaId).then(setCalificaciones);
                    setCalificacion({ descripcion: '', nota: '', porcentaje: '' });
                } else {
                    toaster.error({
                        title: "Error al crear.",
                        description: "Hubo un error al intentar crear la calificación.",
                    });
                }
            } catch (err) {
                console.error('Error al crear la calificación:', err);
                toaster.error({
                    title: "Error al crear.",
                    description: "Hubo un error al intentar crear la calificación.",
                });
            }
        } else {
            toaster.error({
                title: "Campos obligatorios.",
                description: "Todos los campos son obligatorios.",
            });
        }
    }

    async function deleteCalificacion(id) {
        try {
            const response = await API.deleteCalification(id);
            if (response === 'true') {
                toaster.success({
                    title: "Calificación eliminada.",
                    description: "La calificación ha sido eliminada correctamente.",
                });
                API.getCalifications(params.matriculaId).then(setCalificaciones);
            } else {
                toaster.error({
                    title: "Error al eliminar.",
                    description: "Hubo un error al intentar eliminar la calificación.",
                });
            }
        } catch (err) {
            console.error('Error al eliminar la calificación:', err);
            toaster.error({
                title: "Error al eliminar.",
                description: "Hubo un error al intentar eliminar la calificación.",
            });
        }
    }

    return (
        <>
            <Header />
            <Box p="6" bg="brand.50" minHeight="100vh">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.3 }}
                >
                    <Heading as="h1" size="lg" mb="6" textAlign="center" color="brand.500">
                        Calificaciones del Alumno
                    </Heading>
                </motion.div>
                <Box bg="white" p="6" rounded="md" shadow="md" m='0 auto' maxW='80em'>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
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
                                    <motion.tr
                                        key={calificacion.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Table.Cell>{calificacion.descripcion}</Table.Cell>
                                        <Table.Cell>{calificacion.nota}</Table.Cell>
                                        <Table.Cell>{calificacion.porcentaje}%</Table.Cell>
                                        <Table.Cell>
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Button bg="brand.400" width="100%" height='2.9em'
                                                    color="white"
                                                    _hover={{
                                                        bg: 'brand.300',
                                                    }} onClick={() => deleteCalificacion(calificacion.id)}>
                                                    Eliminar
                                                </Button>
                                            </motion.div>
                                        </Table.Cell>
                                    </motion.tr>
                                ))}
                                <motion.tr
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
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
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            
                                        >
                                            <Button bg="brand.400" width="100%" height='2.9em'
                                                color="white"
                                                _hover={{
                                                    bg: 'brand.300'
                                                }} onClick={createCalificacion}>
                                                Nueva
                                            </Button>
                                        </motion.div>
                                    </Table.Cell>
                                </motion.tr>
                            </Table.Body>
                        </Table.Root>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <Stat.Root mt='4'>
                            <Stat.Label>Nota Final</Stat.Label>
                            <Stat.ValueText>{total}</Stat.ValueText>
                        </Stat.Root>
                    </motion.div>
                </Box>
            </Box>
            <Toaster />
        </>
    );
}
