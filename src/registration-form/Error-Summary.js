import styled from '@emotion/styled';

export default styled.div`
  max-width: 40em;
  padding: 16px;
  margin-bottom: 20px;
  border: 4px solid #b00f1f;

  &:focus {
    outline: 0;
    box-shadow: 0 0 1px 4px #ffbf47;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    margin-left: 0;
    margin-bottom: 0;
    color: #b00f1f;
    font-size: 1.125em;
    line-height: 1.38889;
  }

  a {
    color: #b00f1f;
    font-weight: 700;
  }
`;
