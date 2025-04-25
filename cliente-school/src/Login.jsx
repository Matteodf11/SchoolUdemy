import { useState } from 'react';
import * as API from './Services/data.js';
import imagen from './assets/login.jpg';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Input, Button, Image } from '@chakra-ui/react';
import { Toaster, toaster } from './components/ui/toaster';
import { motion } from 'framer-motion';

export function Login() {
    const [teacher, setTeacher] = useState({ usuario: '', password: '' });
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await API.login(teacher.usuario, teacher.password);
        if (response === 'true') {
            sessionStorage.setItem('usuario', teacher.usuario);
            toaster.success({
                title: "Login exitoso.",
                description: "Has iniciado sesión correctamente.",
            });
            navigate('/dashboard');
        } else {
            toaster.error({
                title: "Error en el login.",
                description: "Usuario o contraseña incorrectos.",
            });
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bg="brand.50"
            p="4"
        >
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3 }}
                style={{ width: '100%', maxWidth: '400px' }}
            >
                <Box
                    bg="white"
                    p="6"
                    rounded="md"
                    shadow="md"
                    width="100%"
                    maxWidth="400px"
                    textAlign="center"
                >
                    <Image src={imagen} alt="Login" boxSize="100px" mx="auto" mb="4" borderRadius="full" />
                    <Heading as="h2" size="lg" color="brand.500" mb="6">
                        Iniciar Sesión
                    </Heading>
                    <form id="formulario" onSubmit={handleSubmit}>
                        <Box mb="4">
                            <Input
                                type="text"
                                id="usuario"
                                placeholder="Usuario"
                                value={teacher.usuario}
                                onChange={(event) =>
                                    setTeacher({ ...teacher, usuario: event.target.value })
                                }
                                borderColor="brand.300"
                                focusBorderColor="brand.500"
                            />
                        </Box>
                        <Box mb="6">
                            <Input
                                type="password"
                                id="password"
                                placeholder="Contraseña"
                                value={teacher.password}
                                onChange={(event) =>
                                    setTeacher({ ...teacher, password: event.target.value })
                                }
                                borderColor="brand.300"
                                focusBorderColor="brand.500"
                            />
                        </Box>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}>
                            <Button
                                type="submit"
                                bg="brand.500"
                                color="white"
                                _hover={{
                                    bg: 'brand.600',
                                }}
                                width="100%"
                            >
                                Iniciar Sesión
                            </Button></motion.div>
                        
                    </form>
                </Box>
            </motion.div>
            <Toaster />
        </Box>
    );
}
