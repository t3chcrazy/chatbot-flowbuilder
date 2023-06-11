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