import { Typography, Row, Col } from 'antd';
import React, { FC } from 'react';

interface LottoCardProps {
  gotPrize: boolean;
}
const { Title } = Typography;

const PrizeBox: FC<LottoCardProps> = ({ gotPrize }) => {
  return gotPrize ? (
    <div>
      <Row justify="center">
        <Title>Congrats !</Title>
      </Row>
      <Row justify="center">
        <Title>You've got 10 ETH</Title>
      </Row>
    </div>
  ) : (
    <div>
      <Row justify="center">
        <Title>Sorry, you don't catch the prize</Title>
      </Row>
    </div>
  );
};

export default PrizeBox;
