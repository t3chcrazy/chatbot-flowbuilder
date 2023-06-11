import { Handle, Position, useStore } from 'reactflow'
import { styled } from 'styled-components'
import images from '../../constants/images'
import { SELECTED_NODES_SELECTOR } from '../../constants/utils'

const Container = styled.div`
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    border-radius: .5rem;
    overflow: hidden;
    min-width: 300px;
    border: ${props => `1px solid ${props.nodeselected === "true"? "blue": "transparent"}`};
`

const Header = styled.div`
    background-color: #55efc4;
    display: flex;
    align-items: center;
    padding: 4px 10px;
    font-size: 10px;
    font-weight: 700;
    & > div:nth-child(2) {
        flex: 1;
        padding: 0 10px;
    }
`

const Body = styled.div`
    padding: 10px;
`

const ChannelContainer = styled.div`
    background-color: white;
    width: 14px;
    height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
`

const SmallIcon = styled.img`
    width: 10px;
    height: 10px;
`

export default function TextNode({ data }) {
    const { channel = "whatsapp", text, id } = data
    const selected = useStore(SELECTED_NODES_SELECTOR)?.[0]?.id === id

    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
            />
            <Container nodeselected = {selected?.toString()}>
                <Header>
                    <SmallIcon src={images.Message} alt="Message" />
                    <div>Send Message</div>
                    <ChannelContainer>
                        <SmallIcon src={images.Whatsapp} alt="Whatsapp" />
                    </ChannelContainer>
                </Header>
                <Body>
                    {text}
                </Body>
            </Container>
            <Handle
                type="source"
                position={Position.Right}
            />
        </>
    )
}