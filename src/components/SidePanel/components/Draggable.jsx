import { styled } from 'styled-components'

const DraggableView = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .5rem 1rem;
    border: 1px solid #74b9ff;
    border-radius: 4px;
    color: #74b9ff;
    width: 48%;
`

const Img = styled.img`
    width: 30px;
    height: 30px;
    margin-bottom: .2rem;
`

/**
 * 
 * @param {*} icon - Icon to be displayed at the top of the card
 * @param {String} type - Type of draggable node
 * @param {String} title - Title to be displayed beneath the icon
 * @returns A react component which is draggable from the side panel onto react flow
 */
export default function Draggable({ icon, type, title }) {

    const handleDragStart = (event) => {
        event.dataTransfer.setData('application/reactflow', type);
        event.dataTransfer.effectAllowed = 'move';
    }

    return (
        <DraggableView draggable onDragStart={handleDragStart}>
            <Img src={icon} alt={`Draggable ${type}`} />
            {title}
        </DraggableView>
    )
}