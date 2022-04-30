import { faker } from '@faker-js/faker';
import { Row, Col, Statistic, Button, Input } from 'antd';
import React, { FC } from 'react';

import { HistogramChart } from '../main/HistogramChart';

const labels = Array.from(Array(100).keys());
const data = labels.map(() => faker.datatype.number({ min: 15, max: 100 }));

const Home: FC = () => {
  const onFinish = () => () => {
    return null;
  };

  const { Countdown } = Statistic;

  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
  return (
    <div>
      <Row>
        <Col>Lottopus</Col>
      </Row>
      <Row justify="center">
        <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
      </Row>
      <Row justify="center">
        <Button type="primary">Trigger Random</Button>
      </Row>

      <HistogramChart labels={labels} data={data} />
      <Row justify="center">
        <Col span={8}>
          <Input placeholder="type 0-99" />
        </Col>
        <Col>
          <Button type="primary">Buy</Button>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
