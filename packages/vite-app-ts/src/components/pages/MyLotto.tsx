import { Row, Col } from 'antd';
import React, { FC } from 'react';

import LottoCard from '../lottoCard/LottoCard';

const Home: FC = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <LottoCard lottoNumber={67} purchasedAmount={2} />
        </Col>
        <Col span={8}>
          <LottoCard lottoNumber={23} purchasedAmount={1} />
        </Col>
        <Col span={8}>
          <LottoCard lottoNumber={99} purchasedAmount={9} />
        </Col>
        <Col span={8}>
          <LottoCard lottoNumber={44} purchasedAmount={6} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
