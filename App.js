import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProductScreen from './src/screen/ProductScreen';

const App = () => {
  return (
    <SafeAreaProvider>
      <ProductScreen />
    </SafeAreaProvider>
  );
};

export default App;
