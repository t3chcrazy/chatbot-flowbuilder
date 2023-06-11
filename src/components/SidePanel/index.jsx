import { useStore } from 'reactflow'
import { styled } from 'styled-components'
import Draggable from './components/Draggable'
import { CHANNELS, SELECTED_NODES_SELECTOR, mapChannelToIcons } from '../../constants/utils'
import TextSettings from './components/TextSettings'

const Aside = styled.aside`
    border-left: 1px solid #ecf0f1;
    width: clamp(100px, 40%, 400px);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`

const DraggableContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;
    padding: .5rem;
`

export default function SidePanel({ handleTextNodeEdit }) {
    const selectedNodes = useStore(SELECTED_NODES_SELECTOR)
    const openSettings = selectedNodes?.length > 0
    const resetSelectedElements = useStore(state => state.unselectNodesAndEdges)

    const handleNodeEdit = value => {
        handleTextNodeEdit(value, selectedNodes?.[0]?.id)
    }

    return (
        <Aside>
            {openSettings?
            <TextSettings
                handleNodeEdit={handleNodeEdit}
                resetElements={resetSelectedElements}
                defaultValue={selectedNodes?.[0]?.data?.text ?? ""}
            />:
            <DraggableContainer>
                <Draggable
                    {...mapChannelToIcons(CHANNELS.WHATSAPP)}
                />
            </DraggableContainer>}
        </Aside>
    )
}