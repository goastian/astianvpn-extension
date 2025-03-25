import styled from 'styled-components'
import { FaArrowRight } from "react-icons/fa";

const ButtonSelected = () => {
  return (
    <Button>
        <ButtonLeft>
          <div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png" />
          </div>
          <LeftArrow>
              <span>Berlin City</span>
              <span>Germany</span>
          </LeftArrow>
        </ButtonLeft>
        <div>
          <FaArrowRight />
        </div>
    </Button>
  )
};

const Button = styled.button`
  width: 100%;
  padding: .4rem 1rem;
  border-radius: .4rem;
  border: none;
  border: .08rem solid #D9D9D9;
  background: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ButtonLeft = styled.div`
  display: flex;
  align-items: center;
  gap: .5rem;
  
  div:first-child {
    width: 37px;
    height: 37px;
    padding: .3rem;
    border-radius: 50%;
    background: #ECECEC;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
`;

const LeftArrow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  span:last-child {
    font-size: .8rem;
    color: gray;
  }
`;

export default ButtonSelected;
