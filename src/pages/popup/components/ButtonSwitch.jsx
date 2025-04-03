import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CiPower } from "react-icons/ci";
import { CiLock } from "react-icons/ci";

const ButtonSwitch = () => {
  const [state, setState] = useState({
    isConnected: false,
    isLoading: false,
    error: null
  });

  // Obtener estado inicial
  useEffect(() => {
    chrome.storage.local.get('vpnStatus', (result) => {
      setState(prev => ({ ...prev, isConnected: result.vpnStatus || false }));
    });
    
    const listener = (changes, area) => {
      if (area === 'local' && changes.vpnStatus) {
        setState(prev => ({ 
          ...prev, 
          isConnected: changes.vpnStatus.newValue 
        }));
      }
    };
    
    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  const toggleVPN = () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const action = state.isConnected ? 'disableVPN' : 'enableVPN';
    
    chrome.runtime.sendMessage({ action }, (response) => {
      if (chrome.runtime.lastError || !response) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: chrome.runtime.lastError?.message || 'Error desconocido'
        }));
      }
    });
  };

  return (
    <ButtonContainer>
      <Switch
        isEnable={state.isConnected}
      >
        <button 
          onClick={toggleVPN}
          disabled={state.isLoading}
        >
          <StyledIconPower />
        </button>
      </Switch>
      <Info isEnable={state.isConnected}>
        <CiLock />
        <span>{ state.isConnected ? 'Connected' : 'Disconnected' }</span>
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

const Switch = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  padding: .9rem;
  background: ${(props) => (props.isEnable ? '#90cfde' : 'rgba(255, 137, 137, .3)')};

  button {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: none;
    background: ${(props) => (props.isEnable ? '#006081' : '#FF8989')};
    color: white;
    cursor: pointer;
  }
`;

const StyledIconPower = styled(CiPower)`
  width: 80%;
  height: 80%;
`;

const Info = styled.div`
  display: flex;
  gap: .4rem;
  color: ${(props) => ( props.isEnable ? '#006081': '#FF7D7D')};
`;

export default ButtonSwitch;
