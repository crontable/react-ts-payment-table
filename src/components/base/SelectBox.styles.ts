import { css } from '@emotion/react';

export const selectBoxStyle = css`
  width: 100%;
  min-width: 120px;
  height: 32px;
  padding: 4px 32px 4px 12px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #999;
  }

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.6;
  }

  option {
    padding: 8px;
  }
`;
