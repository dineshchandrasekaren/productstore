import {
  Box,
  Button,
  Container,
  Input,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import useStore from "../store/store";

const CreatePage = ({ isEdit = false }) => {
  const [product, setProduct] = useState({ name: "", price: "", image: "" });
  const { createProduct } = useStore();
  const toast=useToast();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Container width={"container.sm"} textAlign={"center"}>
      {isEdit && (
        <Text fontSize={"4xl"} fontWeight={"bold"} margin={"30px 0"}>
          Create New Product
        </Text>
      )}
      <VStack
        as={"form"}
        spacing={4}
        padding={6}
        shadow="lg"
        bg={useColorModeValue("white", "gray.800")}
        rounded="md"
        w={"full"}
      >
        <Input
          type="text"
          placeholder="Name"
          size="md"
          name="name"
          onChange={handleChange}
          value={product.name}
        />
        <Input
          type="number"
          placeholder="Price"
          size="md"
          name="price"
          onChange={handleChange}
          value={product.price}
        />
        <Input
          type="url"
          placeholder="Image Url"
          size="md"
          name="image"
          onChange={handleChange}
          value={product.image}
        />

        <Button
          colorScheme="blue"
          w={"full"}
          onClick={async () => {
            const { success, message } = await createProduct(product);
            if(success){

              toast({
                title: "Success",
          description: <>{message} <a href="/">Go Home</a></> ,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })   
        setProduct({name:"",price:"",image:""})

      }else{
        toast({
                title: 'Failure',
          description:message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        
      }
          }}
        >
          Add Product
        </Button>
      </VStack>
    </Container>
  );
};

export default CreatePage;
