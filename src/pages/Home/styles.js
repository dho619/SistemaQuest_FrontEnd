import styled from "styled-components"

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    h2 {
        padding:100px;
        border: 2pt solid gray;
        max-width: 800px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media only screen and (max-device-width: 800px) {
        h2 {
            font-size: 12pt;
            padding: 20px;
            width: 200px;
        }
    }
`

export default Form