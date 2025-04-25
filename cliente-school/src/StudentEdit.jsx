import { useParams } from "react-router-dom";
import { Header } from "./Header";
import { useState, useEffect } from "react";
import * as API from './Services/data.js';
import { Box, Heading, Input, Button } from "@chakra-ui/react";
import { Toaster, toaster } from './components/ui/toaster';
import { motion } from 'framer-motion';

export function StudentEdit() {
    let params = useParams();
    const [student, setStudent] = useState({});

    useEffect(() => {
        API.getStudentDetails(params.studentId).then(setStudent);
    }, [params.studentId]);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await API.updateStudent(student);
            if (response === 'true') {
                toaster.success({
                    title: "Alumno modificado.",
                    description: "El alumno ha sido modificado correctamente.",
                });
                document.getElementById('formulario').reset();
            }
        } catch (error) {
            console.error(error);
            toaster.error({
                title: "Error al modificar.",
                description: "Hubo un error al intentar modificar el alumno.",
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
                        Editar Alumno
                    </Heading>
                </motion.div>
                <Box bg="white" p="6" rounded="md" shadow="md" m='0 auto' maxW='80em'>
                    <motion.form
                        id='formulario'
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
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
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
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
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7 }}
                        >
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
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
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
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.9 }}
                        >
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
                        </motion.div>
                        <Box display="flex" justifyContent="center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                style={{ width: '40%' }}
                            >
                                <Button type='submit' id='enviar' width='100%' bg="brand.400" color="white" _hover={{ bg: 'brand.300' }}>Enviar</Button>
                            </motion.div>
                        </Box>
                    </motion.form>
                </Box>
            </Box>
            <Toaster />
        </>
    );
}
