import { Card } from 'antd';
import React, { FC } from 'react';

interface LottoCardProps {
  lottoNumber: number;
  purchasedAmount: number;
}

const LottoCard: FC<LottoCardProps> = ({ lottoNumber, purchasedAmount }) => {
  return (
    <div>
      <Card style={{ width: 300 }} hoverable>
        <p>Lotto No. : {lottoNumber}</p>
        <p>Purchased Amount : {purchasedAmount}</p>
      </Card>
    </div>
  );
};

export default LottoCard;
