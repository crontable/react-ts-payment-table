import { css } from '@emotion/react';

const buttonStyle = css`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

export function Button() {
  return (
    <button css={buttonStyle} onClick={() => alert('Button clicked!')}>
      Test Button
    </button>
  );
}
