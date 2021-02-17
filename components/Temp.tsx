import { FC } from "react";
import styled from "styled-components";

const _Temp = styled.div`
    color: red;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 50px;
    font-weight: bold;
`

export const Temp: FC = ({children}) => {
    return <_Temp>{children}</_Temp>
}