import {
  Box,
  Container,
  Input,
  Flex,
  Text,
  Button,
  Link,
  Checkbox,
  FormLabel,
  FormControl,
  FormHelperText,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import React, { useState } from 'react';
import api from '../api';
import Falls from '../assets/cataratas.png';

const blue = {
  blue1: '#fbfdff',
  blue2: '#f5faff',
  blue3: '#edf6ff',
  blue4: '#e1f0ff',
  blue5: '#cee7fe',
  blue6: '#b7d9f8',
  blue7: '#96c7f2',
  blue8: '#5eb0ef',
  blue9: '#0091ff',
  blue10: '#0081f1',
  blue11: '#006adc',
  blue12: '#00254d',
};

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false)
  const [message, setMessage] = useState("")
  const handleClick = () => setShow(!show);
  const handleClickConfirmShow = () => setConfirmShow(!confirmShow)

  const emailValidation = () => {
    const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!regex.test(email) && email !== "") {
      setMessage("E-mail inválido")
    } else {
      setMessage("")
    }
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
    emailValidation()
  }

  const registerUser = async (e) => {
    e.preventDefault()
    console.log("clicado")
    try {
      const response = await api.post('//localhost:5000/register', {
        email,
        password,
        username,
      });
      window.location.href = '/';
      console.log(response);
    } catch (error) {
      if (error.response.status === 401) {
        alert('Invalid credentials');
      }
      console.log(error)
    }
   };

  return (
    <Box
      bg={blue.blue4}
      display={'grid'}
      gridTemplateColumns={'repeat(2, 1fr)'}>
      <Container maxW={'500px'} mt={'3rem'}>
        <Text marginBottom={'1rem'} fontSize={'3xl'}>
          Cadastre-se, colabore e conheça rotas variadas pelo Brasil
        </Text>
        <Text marginBottom={'1rem'} fontSize={'xl'}>
          Já é cadastrado? <Link color={blue.blue11}>Faça Login</Link>
        </Text>
        <FormControl>
          <form onSubmit={registerUser}>
            <Flex justifyContent={'space-between'} mb={'.8rem'}>
              <Flex display={'column'} marginRight={'1rem'}>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  bg={'white'}
                  isRequired={true}
                />
              </Flex>
              <Flex display={'column'}>
                <FormLabel>Sobrenome</FormLabel>
                <Input bg={'white'} required />
              </Flex>
            </Flex>

            <FormLabel>E-mail</FormLabel>
            <Input
              type="text"
              value={email}
              onChange={handleEmail}
              bg={'white'}
              
              margin={"0"}
              isRequired={true}
            />
            <small>{email.length === 0 ? "" : message}</small>
            <FormLabel mt={".8rem"}>Cadastre sua senha </FormLabel>
            <InputGroup>
              <Input
                value={password}
                type={show ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                bg={'white'}
                mb={'.8rem'}
                isRequired={true}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="2rem"
                  ml={'1rem'}
                  bgColor={'white'}
                  onClick={handleClick}>
                  {show ? <FiEyeOff /> : <FiEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormLabel>Confirme a senha </FormLabel>
            <InputGroup>
              <Input
                type={confirmShow ? 'text' : 'password'}
                bg={'white'}
                mb={'.8rem'}
                isRequired={true}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="2rem"
                  ml={'1rem'}
                  bgColor={'white'}
                  onClick={handleClickConfirmShow}>
                  {confirmShow ? <FiEyeOff /> : <FiEye />}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Checkbox colorScheme="blue" border={'black'} defaultChecked>
              Eu concordo com os{' '}
              <Link color={blue.blue11}>Termos e Condições</Link> do Brasil de
              Busão.
            </Checkbox>
            <Flex flexDirection={'row'} justifyContent={'center'}>
              <Button
                mt={'2rem'}
                bg={blue.blue10}
                color="white"
                padding={'1rem 13rem'}
                _hover={{ color: 'black', background: 'white' }}
                type="submit">
                Cadastrar
              </Button>
            </Flex>
          </form>
        </FormControl>
      </Container>
      <img src={Falls} alt="main" style={{ minHeight: '100vh' }} />
    </Box>
  );
};

export default RegisterPage;
