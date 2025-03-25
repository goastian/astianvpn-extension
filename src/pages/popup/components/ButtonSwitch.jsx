import styled from 'styled-components';
import { CiPower } from "react-icons/ci";
import { CiLock } from "react-icons/ci";

const ButtonSwitch = () => {
  return (
    <ButtonContainer>
      <Switch>
        <button>
          <StyledIconPower />
        </button>
      </Switch>
      <Info>
        <CiLock />
        <span>Disconnected</span>
      </Info>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: .4rem;
`;

const Switch = styled.button`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  padding: .9rem;
  background: rgba(255, 137, 137, .3);

  button {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: none;
    background: #FF8989;
    color: white;
  }
`;

const StyledIconPower = styled(CiPower)`
  width: 80%;
  height: 80%;
`;

const Info = styled.div`
  display: flex;
  gap: .4rem;
  color: #FF7D7D;
`;

export default ButtonSwitch;
