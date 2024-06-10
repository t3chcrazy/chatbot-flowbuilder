import { styled } from 'styled-components'
import { Panel, useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
import { toPng } from 'html-to-image';
import React from 'react';

const Nav = styled.nav`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: .6rem 2rem;
    background-color: #ecf0f1;
`

const Button = styled.button`
    border: 1px solid #2980b9;
    outline: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    color: #2980b9;
    background-color: white;
    transition: 0.25s all;
    &:hover {
        color: white;
        background-color: #2980b9;
    }
`

const imageWidth = 1024;
const imageHeight = 768;

/**
 * 
 * @param {*} saveChanges - Function which is called on save changes button click 
 * @returns React navbar component which is displayed at the top
 */
export default function Navbar({ saveChanges }) {
    const { getNodes } = useReactFlow()

    const downloadWorkFlow = async () => {
        const nodesBounds = getRectOfNodes(getNodes())
        const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2)
        const dataUrl = await toPng(document.querySelector('.react-flow__viewport'), {
            backgroundColor: '#1a365d',
            width: imageWidth,
            height: imageHeight,
            style: {
              width: imageWidth,
              height: imageHeight,
              transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
            },
        })
        const a = document.createElement('a');
        a.setAttribute('download', 'reactflow.png');
        a.setAttribute('href', dataUrl);
        a.click();
    }

    const handleClick = () => {
        saveChanges(downloadWorkFlow)
    }

    return (
        <Nav>
            <Button onClick={handleClick}>
                Save Changes
            </Button>
        </Nav>
    )
}