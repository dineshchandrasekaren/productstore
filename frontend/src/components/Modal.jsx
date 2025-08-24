import {
  Modal as M,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'

function Modal({children,title,body,savebtntxt,onSuccess}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
 
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <M isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {body}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='solid' onClick={()=>onSuccess(onClose)}>{savebtntxt}</Button>
          </ModalFooter>
        </ModalContent>
      </M>
    </>
  )
}

export default Modal;