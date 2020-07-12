import React, {FC} from "react"
import preloader from "../../assets/images/preloader.svg"
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const Preloader: FC = () => {
    return (
        <Wrapper>
            <img src={preloader} alt={'preloader'}/>
        </Wrapper>
    )
}
