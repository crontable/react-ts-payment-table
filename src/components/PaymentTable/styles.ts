import { css } from '@emotion/react';

export const TABLE_ROW_HEIGHT = 40;

export const paymentLayoutStyle = css`
  display: flex;
  gap: 40px;
`;

export const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  padding: 0 10px 20px 30px;
  border: 2px solid #ddd;

  td.right {
    text-align: right;
  }

  td.amount::before {
    content: '$';
  }

  div.layout {
    display: flex;
    gap: 40px;
  }

  td,
  th {
    height: ${TABLE_ROW_HEIGHT}px;
    border: 1px solid #ddd;
    padding: 8px 12px;
  }
`;

export const tableTitleStyle = (rowCount: number) => css`
  height: ${TABLE_ROW_HEIGHT * rowCount}px;
  background-color: yellow;
`;
