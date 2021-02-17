import { FC } from "react";
import styled from 'styled-components';

const _H1 = styled.div`
    color: red;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 50px;
    font-weight: bold;
`

export const H1: FC = ({children}) => {
    return <_H1>{children}</_H1>
}