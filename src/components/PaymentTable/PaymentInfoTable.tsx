import Badge from '../base/Badge';
import { horizontalScrollableStyle, PAYABLE_TABLE_FIRST_COLUMN_WIDTH, tableStyle } from './styles';
import type { PaymentInfoGroup } from '../../types';

interface PaymentInfoTableProps {
  paymentInfo: PaymentInfoGroup;
}

function PaymentInfoTable({ paymentInfo }: PaymentInfoTableProps) {
  return (
    <table css={tableStyle}>
      <tbody>
        <tr>
          <th style={{ width: `${PAYABLE_TABLE_FIRST_COLUMN_WIDTH}px` }}>Payment Due</th>
          <td>
            <div css={horizontalScrollableStyle}>{paymentInfo.paymentDue}</div>
          </td>
        </tr>
        <tr>
          <th>Payment Date</th>
          <td>
            <div css={horizontalScrollableStyle}>
              {paymentInfo.paymentDate ?? <Badge variant="warning">Not yet</Badge>}
              {paymentInfo.paymentDate && <Badge variant="primary">Paid</Badge>}
            </div>
          </td>
        </tr>
        <tr>
          <th>Attatchment</th>
          <td>
            <div css={horizontalScrollableStyle}>
              {paymentInfo.attachment.map((attachment) => (
                <Badge key={attachment}>{attachment}</Badge>
              ))}
            </div>
          </td>
        </tr>
        <tr>
          <th>Memo</th>
          <td>
            <div css={horizontalScrollableStyle}>{paymentInfo.memo || '-'}</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default PaymentInfoTable;
