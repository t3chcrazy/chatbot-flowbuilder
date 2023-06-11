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

export default function TextSettings({ resetElements, handleNodeEdit, defaultValue }) {
    
    const handleChange = e => {
        handleNodeEdit(e.target.value)
    }
    
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
                <NewText defaultValue={defaultValue} onChange={handleChange} rows="4"></NewText>
            </AsideContent>
        </SettingsContainer>
    )
}