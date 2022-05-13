import styled from "styled-components";
import { AppContainer } from "../App";
import { NodeCard } from "../components/Cards";
import { Section } from "../components/Containers";
import { NavbarDApp } from "../components/Navbar/Navbar";


const Container = styled(Section)`
    background-image: url(${process.env.PUBLIC_URL + "/img/backgrounds/background.png"});
    background-size: cover;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const Nodes = () => {
    return (
        <AppContainer style={{ backgroundColor: 'black' }}>
            <NavbarDApp />
            <Container>
                <NodeCard nodeName='NodeCardTest1' videoUrl={process.env.PUBLIC_URL + "/media/fuji.mp4"} price={24} fee={53} reward={9} />
                <NodeCard nodeName='NodeCardTest2' videoUrl={process.env.PUBLIC_URL + "/media/fuji.mp4"} price={25} fee={75} reward={36}  />
                <NodeCard nodeName='NodeCardTest3' videoUrl={process.env.PUBLIC_URL + "/media/fuji.mp4"} price={23} fee={34} reward={56} />
            </Container>
        </AppContainer>
    )
}

export default Nodes;