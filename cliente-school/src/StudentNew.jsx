import { Header } from "./Header";
import { useState } from "react";
import * as API from './Services/data.js';
import { Box, Heading, Input, NativeSelect, Button } from "@chakra-ui/react";
import { Toaster, toaster } from './components/ui/toaster';
import { motion } from 'framer-motion';

export function StudentNew() {
    const [student, setStudent] = useState({
        dni: '',
        nombre: '',
        direccion: '',
        edad: '',
        email: '',
        asignatura: '1'
    });

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await API.addStudent(student);
            if (response === "true") {
                toaster.success({
                    title: "Alumno creado.",
                    description: "El alumno ha sido creado exitosamente.",
                });
                document.getElementById('formulario').reset();
            } else {
                toaster.error({
                    title: "El alumno con ese DNI ya está registrado.",
                    description: "Ha ocurrido un error al crear el alumno.",
                });
            }
        } catch (error) {
            console.error(error);
            toaster.error({
                title: "Error al crear el alumno.",
                description: "Ha ocurrido un error al crear el alumno.",
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
                        Nuevo Alumno
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
                            Dni: <Input type="text" id="dni" required onChange={event => setStudent({ ...student, dni: event.target.value })} /><br />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            Nombre: <Input type="text" id="nombre" required onChange={event => setStudent({ ...student, nombre: event.target.value })} /><br />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7 }}
                        >
                            Direccion: <Input type="text" id="direccion" required onChange={event => setStudent({ ...student, direccion: event.target.value })} /><br />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            Edad: <Input type="number" id="edad" required onChange={event => setStudent({ ...student, edad: event.target.value })} /><br />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.9 }}
                        >
                            Email: <Input type="email" id="email" required onChange={event => setStudent({ ...student, email: event.target.value })} /><br />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            Asignatura: <NativeSelect.Root id="asignatura" required onChange={event => setStudent({ ...student, asignatura: event.target.value })}>
                                <NativeSelect.Field>
                                    <option value="1">Matemáticas</option>
                                    <option value="2">Informática</option>
                                    <option value="3">Inglés</option>
                                    <option value="4">Literatura</option>
                                </NativeSelect.Field>
                                <NativeSelect.Indicator />
                            </NativeSelect.Root>
                        </motion.div>
                        <br />
                        <Box display="flex" justifyContent="center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                style={{ width: '50%' }}
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
