import React from 'react';
import styled from 'styled-components';
import HeroSection from './sections/HeroSection';
import ServiceSection from './sections/ServiceSection';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: auto;
`
function App() {
  return (
    <AppContainer>
      <HeroSection />
      <ServiceSection/>
    </AppContainer>
  );
}

export default App;
