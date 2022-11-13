import AppRouter from './Router';
import { ChakraProvider } from '@chakra-ui/react';


const App = () => {
  return (
    <ChakraProvider>
      <div className="App" style={{ fontFamily: 'Source Sans Pro' }}>
        <AppRouter />
      </div>
    </ChakraProvider>
  );
};

export default App;
