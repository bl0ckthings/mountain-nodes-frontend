import React from 'react';
import styled from 'styled-components';
import { Navbar } from './components/Navbar/Navbar';
import RoadmapSection from './sections/RoadmapSection';
import HeroSection from './sections/HeroSection';
import ServiceSection from './sections/ServiceSection';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
`

function App() {
  return (
    <AppContainer>
      <Navbar />
      <HeroSection />
      <ServiceSection/>
      <RoadmapSection />
    </AppContainer>
  );
}

export default App;
