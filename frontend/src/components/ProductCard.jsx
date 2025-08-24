import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  IconButton,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { MdOutlineDelete, MdEdit } from "react-icons/md";
import Modal from "./Modal";
import useStore from "../store/store";
import { useState } from "react";
const ProductCard = ({ _id, image, name, price }) => {
  const [product, setProduct] = useState({ name, price, image });
  const { deleteProduct, updateProduct } = useStore();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({ ...prev, [name]: value }));
  };
  const toast = useToast();

  return (
    <Card maxW="md" shadow="md">
      <Image objectFit="cover" src={image} alt="Chakra UI" />
      <CardBody>
        <Heading size="md">{name}</Heading>

        <Text py="2" fontWeight="semibold">
          ${price}
        </Text>
      </CardBody>
      <CardFooter>
        <Modal
          title="Update Product"
          body={
            <VStack as={"form"} spacing={4} w={"full"}>
              {" "}
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
            </VStack>
          }
          savebtntxt="Update Product"
          onSuccess={async (close) => {
            const { success, message } = await updateProduct({
              ...product,
              _id,
            });
            if (success) {
              toast({
                title: "Success",
                description: (
                  <>
                    {message} <a href="/">Go Home</a>
                  </>
                ),
                status: "success",
                duration: 9000,
                isClosable: true,
              });

              close();
            } else {
              toast({
                title: "Failure",
                description: message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          }}
        >
          {" "}
          <IconButton
            colorScheme="blue"
            aria-label="Call Segun"
            size="md"
            icon={<MdEdit size={20} />}
            marginRight={2}
          />
        </Modal>

        <Modal
          title="Delete Product"
          body="Confirmation to delete the product "
          savebtntxt="Ok"
          onSuccess={(close) => {
            deleteProduct(_id);
            close();
          }}
        >
          <IconButton
            colorScheme="red"
            icon={<MdOutlineDelete size={20} />}
            aria-label="Call Segun"
            size="md"
          />
        </Modal>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
