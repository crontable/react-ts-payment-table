import { css } from '@emotion/react';

export const containerStyle = css`
  position: relative;
  width: 100%;
`;

export const triggerButtonStyle = css`
  width: 100%;
  min-width: 120px;
  padding: 6px 32px 6px 12px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  text-align: left;
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
`;

export const dropdownMenuStyle = css`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 280px;
  overflow-y: auto;
  z-index: 1000;
`;

export const searchInputWrapperStyle = css`
  padding: 8px;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
`;

export const searchInputStyle = css`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const optionItemStyle = (isSelected: boolean) => css`
  padding: 8px 12px;
  cursor: pointer;
  background: ${isSelected ? '#f0f0f0' : 'white'};
  transition: background 0.15s ease;
  font-size: 14px;

  &:hover {
    background: #f8f8f8;
  }
`;

export const noResultsStyle = css`
  padding: 12px;
  color: #999;
  text-align: center;
  font-size: 14px;
  user-select: none;
`;
