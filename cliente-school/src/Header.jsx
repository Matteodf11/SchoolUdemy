﻿import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { motion } from 'framer-motion';

export function Header() {
    const navigate = useNavigate();

    function cerrarSesion() {
        sessionStorage.removeItem('usuario');
        navigate('/');
    }

    return (
        <Box bg="brown.200" p="4" color="white">
            <Flex justify="space-between" align="center">
                <Flex>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button as={Link} to="/dashboard" bg="brown.700" mr="4" _hover={{ bg: 'brown.400' }}>
                            Listado
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button as={Link} to="/student" bg="brown.700" mr="4" _hover={{ bg: 'brown.400' }}>
                            Nuevo usuario
                        </Button>
                    </motion.div>
                </Flex>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Button bg="red.600" onClick={cerrarSesion} _hover={{ bg: 'red.500' }}>
                        Cerrar Sesión
                    </Button>
                </motion.div>
            </Flex>
        </Box>
    );
}
