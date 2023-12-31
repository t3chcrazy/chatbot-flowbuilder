import { useEffect, useRef } from 'react'
import { styled } from 'styled-components'
import images from '../../../constants/images'
import { AsideContent } from './commonStyles'

const SettingsContainer = styled.div`
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding-bottom: .5rem;
`

const Header = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    border: 1px solid #ccc;
    padding: .5rem 0;
`

const BackButton = styled.button`
    position: absolute;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    top: calc(.5rem + 2px);
    left: 0;
    & img {
        width: 20px;
        height: 20px;
        object-fit: contain;
    }
`

const NewText = styled.textarea`
    width: 100%;
    border: 1px solid #ccc;
    border-radius: .5rem;
    padding: 0.5rem;
    box-sizing: border-box;
`

/**
 * 
 * @param {*} resetElements - Method to reset selected status of nodes
 * @param {*} handleNodeEdit - Callback which runs on onChange event of textarea
 * @param {String} defaultValue - Initial default value of text area
 * @returns A react component used to handle node text edits whenever a ndoe is selected
 */
export default function TextSettings({ resetElements, handleNodeEdit, defaultValue }) {
    const inputRef = useRef()

    const handleChange = e => {
        handleNodeEdit(e.target.value)
    }

    useEffect(() => {
        if (!!defaultValue) {
            inputRef.current.value = defaultValue
        }
    }, [defaultValue])
    
    return (
        <SettingsContainer className="settingsContainer">
            <Header>
                <BackButton onClick={resetElements}>
                    <img src={images.Back} alt="Back button" />
                </BackButton>
                <div>Messages</div>
            </Header>
            <AsideContent>
                <h5>Text</h5>
                <NewText ref={inputRef} defaultValue={defaultValue} onChange={handleChange} rows="4"></NewText>
            </AsideContent>
        </SettingsContainer>
    )
}