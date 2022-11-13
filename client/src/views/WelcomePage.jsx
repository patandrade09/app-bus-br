import { Grid, GridItem, Box, Button, Text, Flex } from '@chakra-ui/react';
import Bus from '../assets/onibus-estrada.png';
import '@fontsource/source-sans-pro';
import { useNavigate } from 'react-router-dom'

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

const WelcomePage = () => {
  const navigate = useNavigate()
  return (
    <Box
      style={{ fontFamily: 'Source Sans Pro' }}
      bg={blue.blue11}
      color="white"
      fontFamily={'heading'}
      margin={0}>
      <Grid
        templateColumns="repeat(2, 1fr)"
        justifyItems={'center'}
        alignItems={'center'}
        gap={'2rem'}>
        <GridItem padding={'2rem'} alignItems={'center'}>
          <Text fontSize="5xl" fontWeight={'extrabold'}>
            Conheça o Brasil de verdade, conheça o Brasil de Busão!
          </Text>
          <Text fontSize="2xl" marginTop={'3rem'}>
            Junte-se a nossa comunidade, compartilhe e busque informações sobre
            o transporte público de diversos lugares do Brasil.
          </Text>
          <Flex flexDirection={'column'} alignItems={'center'}>
            <Button
              bg={'#04c224'}
              fontFamily={'Source Sans Pro'}
              fontSize={'1.3rem'}
              fontWeight={'bold'}
              paddingBlock={'2rem'}
              width={'50vw'}
              borderRadius={'3rem'}
              marginTop={'4rem'}
              onClick={() => {
                navigate('/register');
              }}
              color="blackAlpha.700">
              Novo por aqui? Cadastre-se
            </Button>
            <Button
              bg={'yellow.400'}
              fontFamily={'Source Sans Pro'}
              fontWeight={'extrabold'}
              fontSize={'1.3rem'}
              width={'50vw'}
              paddingBlock={'2rem'}
              borderRadius={'3rem'}
              marginTop={'2rem'}
              onClick={() => {
                navigate('/login');
              }}
              color="blackAlpha.700">
              Acesse a plataforma
            </Button>
          </Flex>
        </GridItem>
        <GridItem>
          <img src={Bus} alt="main" style={{ minHeight: '100vh' }} />
        </GridItem>
      </Grid>
    </Box>
  );
};
export default WelcomePage;
