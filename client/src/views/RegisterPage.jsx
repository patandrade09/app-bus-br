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
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import api from '../api';
import ColorfullStreet from '../assets/colorfulstreet.png';

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
  const [confirmShow, setConfirmShow] = useState(false);
  const [message, setMessage] = useState('');
  const [validatePassword, setValidatePassword] = useState({
    case: false,
    number: false,
    length: false,
    special: false,
  });
  const handleClick = () => setShow(!show);
  const handleClickConfirmShow = () => setConfirmShow(!confirmShow);

  
  const emailValidation = () => {
    const regex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!regex.test(email) && email !== '') {
      setMessage('E-mail inválido');
    } else {
      setMessage('');
    }
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    emailValidation();
  };
  
  const secureText = (password) => {
    let newPassword = password.target.value;
    setPassword(newPassword);
    console.log(newPassword.length);
    const regexUppercase = new RegExp(/^(?=.*[A-Z]).+$/);
    const regexLowercase = new RegExp(/^(?=.*[a-z]).+$/);
    const regexNumber = new RegExp(/^(?=.*[0-9]).+$/);
    const length = newPassword.length >= 8;
    const regexSpecial = new RegExp(/[^a-zA-Z 0-9]+/g);

    setValidatePassword({
      case:
        regexUppercase.test(newPassword) && regexLowercase.test(newPassword),
      number: regexNumber.test(newPassword),
      length,
      special: regexSpecial.test(newPassword),
    });
  };


  const registerUser = async (e) => {
    e.preventDefault();
    console.log('clicado');
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
      console.log(error);
    }
  };

  return (
    <Box bg={'#cffafe'} display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'}>
      <Container maxW={'500px'} m={'3rem 0 3rem 8rem'}>
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
              margin={'0'}
              isRequired={true}
            />
            <small style={{ color: 'red' }}>
              {email.length === 0 ? '' : message}
            </small>
            <FormLabel mt={'.8rem'}>Cadastre sua senha </FormLabel>
            <InputGroup>
              <Input
                value={password}
                type={show ? 'text' : 'password'}
                onChange={secureText}
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
            <Text fontSize={'15px'}>Sua senha deve ter:</Text>
            <Flex flexDirection={'row'} mt={'.5rem'} alignItems={'center'}>
              {validatePassword.length ? (
                <CheckIcon fontSize={'12px'} color={'green'} ml={'20px'} />
              ) : (
                <CloseIcon
                  padding={'0'}
                  fontSize={'12px'}
                  color={'red'}
                  ml={'20px'}
                />
              )}
              <Text fontSize={'14px'} ml={'20px'}>
                No mínimo 8 caractéres
              </Text>
            </Flex>
            <Flex flexDirection={'row'} alignItems={'center'}>
              {validatePassword.number ? (
                <CheckIcon fontSize={'12px'} color={'green'} ml={'20px'} />
              ) : (
                <CloseIcon fontSize={'12px'} color={'red'} ml={'20px'} />
              )}
              <Text fontSize={'14px'} ml={'20px'}>
                Pelo menos um número
              </Text>
            </Flex>
            <Flex flexDirection={'row'} alignItems={'center'}>
              {validatePassword.case ? (
                <CheckIcon fontSize={'12px'} color={'green'} ml={'20px'} />
              ) : (
                <CloseIcon fontSize={'12px'} color={'red'} ml={'20px'} />
              )}
              <Text fontSize={'14px'} ml={'20px'}>
                Pelo menos uma letra maiúscula e uma minúscula
              </Text>
            </Flex>
            <Flex flexDirection={'row'} alignItems={'center'}>
              {validatePassword.special ? (
                <CheckIcon fontSize={'12px'} color={'green'} ml={'20px'} />
              ) : (
                <CloseIcon fontSize={'12px'} color={'red'} ml={'20px'} />
              )}
              <Text fontSize={'14px'} ml={'20px'}>
                Pelo menos um caractére especial
              </Text>
            </Flex>
            <FormLabel mt={'1rem'}>Confirme a senha </FormLabel>
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
                mt={'3rem'}
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
      <Container
        maxWidth="100%"
        backgroundImage={ColorfullStreet}
        bgSize="cover"
        bg></Container>
    </Box>
  );
};

export default RegisterPage;
