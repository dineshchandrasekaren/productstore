import {  Button, Container,  HStack, Text, useColorMode } from "@chakra-ui/react";
import { FaRegPlusSquare } from "react-icons/fa";

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxWidth={1140} display="flex" justifyContent={"space-between"} padding={"20px"}>
      <Text
        fontSize={{ base: "22", sm: "28" }}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        textAlign={"center"}
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip={"text"}
      >
 <Link to={"/"}>Product Store 🛒</Link>
      </Text>
      <HStack spacing={2} alignItems="center" >
        <Button onClick={toggleColorMode}  marginRight={"10px"}>
          {colorMode === "light" ? <MdLightMode size={20}/> : <MdDarkMode size={20} />}
        </Button>
        <Button>
         <Link to={"/create"}><FaRegPlusSquare size={20} /></Link> 
        </Button>
      </HStack>
    </Container>
  );
};

export default Navbar;
