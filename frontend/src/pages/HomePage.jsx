import {  Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import useStore from "../store/store";
import { useEffect } from "react";


const HomePage = () => {
  const { products, getProduct } = useStore();

  useEffect(() => {
    const abortController = new AbortController();

    getProduct(abortController.signal);

    return () => abortController.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 


  return (
    <Container maxWidth={1140} marginTop={10}>
    
     {products.length? <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3 }} spacing="40px">
        {products.map((product) => (
          <ProductCard {...product} key={product._id}/>
        ))}
      </SimpleGrid>:      <VStack textAlign="center">
              {/* <Modal/> */}
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          margin={"35px 0"}
        >
          Current Product 🚀{" "}
        </Text>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          No Product Found 🥲. &nbsp;{" "}
          <Link to="/create">
            <Text as={"span"} color="blue.500" display={"inline-block"}>
              Create a product
            </Text>
          </Link>
        </Text>
      </VStack>}
    </Container>
  );
};

export default HomePage;
