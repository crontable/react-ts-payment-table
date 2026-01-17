import { css } from '@emotion/react';

export const TABLE_ROW_HEIGHT = 40;

export const PAYABLE_TABLE_WIDTH = 352;
export const PAYABLE_TABLE_FIRST_COLUMN_WIDTH = 128;

export const palette = {
  grayScale: {
    200: 'rgba(36, 35, 45, 1)', // Gray Scale / Achromatic (dark)
    150: 'rgba(232, 235, 240, 1)', // Gray Scale / Cool Gray
    100: 'rgba(235, 240, 246, 1)', // Gray Scale / Cool Gray (lighter)
    0: 'rgba(255, 255, 255, 1)', // White
  },
};

export const paymentLayoutStyle = css`
  width: 100%;
  overflow-x: auto;

  display: flex;
  background-color: ${palette.grayScale[150]};
  gap: 8px;
`;

export const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid${palette.grayScale[150]};

  td.right {
    text-align: right;
  }

  td.amount {
    position: relative;
    text-align: right;

    &::before {
      position: absolute;
      left: 8%;
      top: 50%;
      transform: translate(0, -50%);
      content: '$';
      font-weight: bold;
    }
  }

  tr.meta-row > td,
  th {
    font-weight: bold;
    background-color: ${palette.grayScale[100]};
  }

  td,
  th {
    height: ${TABLE_ROW_HEIGHT}px;
    border: 1px solid ${palette.grayScale[100]};
    padding: 8px;
  }

  tr.narrow-padding th,
  tr.narrow-padding td {
    padding: 4px;
  }

  td {
    background-color: ${palette.grayScale[0]};
  }
`;

const baseTitleStyle = css`
  display: flex;
  align-items: center;
  font-weight: bold;
  padding-left: 16px;
  background-color: ${palette.grayScale[100]};
`;

export const tableTitleStyle = (rowCount: number) => css`
  ${baseTitleStyle}
  height: ${TABLE_ROW_HEIGHT * rowCount}px;
  justify-content: space-between;
  padding-right: 16px;
`;

export const searchToggleButtonStyle = (isActive: boolean) => css`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid ${isActive ? palette.grayScale[200] : palette.grayScale[150]};
  border-radius: 4px;
  background-color: ${isActive ? palette.grayScale[200] : palette.grayScale[0]};
  color: ${isActive ? palette.grayScale[0] : palette.grayScale[200]};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${isActive ? palette.grayScale[200] : palette.grayScale[150]};
  }
`;

export const payableTitleStyle = css`
  ${baseTitleStyle}
  height: ${TABLE_ROW_HEIGHT}px;
  border-bottom: 2px solid ${palette.grayScale[150]};
`;

export const horizontalScrollableStyle = css`
  display: flex;
  gap: 4px;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: ${PAYABLE_TABLE_WIDTH - PAYABLE_TABLE_FIRST_COLUMN_WIDTH - 32}px;
`;
