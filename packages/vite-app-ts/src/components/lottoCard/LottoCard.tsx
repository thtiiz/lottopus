import { Card, Typography } from 'antd';
import React, { FC } from 'react';

interface LottoCardProps {
  lottoNumber: number;
  purchasedAmount: number;
}
const { Title } = Typography;

const LottoCard: FC<LottoCardProps> = ({ lottoNumber, purchasedAmount }) => {
  return (
    <div>
      <Card style={{ width: 300 }} hoverable>
        <Title level={4}>Lotto No. : {lottoNumber}</Title>
        <Title level={4}>Purchased Amount : {purchasedAmount}</Title>
      </Card>
    </div>
  );
};

export default LottoCard;
