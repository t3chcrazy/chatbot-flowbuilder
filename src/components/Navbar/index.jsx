import { styled } from 'styled-components'

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

export default function Navbar({ saveChanges }) {
    return (
        <Nav>
            <Button onClick={saveChanges}>
                Save Changes
            </Button>
        </Nav>
    )
}