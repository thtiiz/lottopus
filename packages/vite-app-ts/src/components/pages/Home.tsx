import { Row, Col, Statistic, Button, Image } from 'antd';
import React, { FC } from 'react';

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

      <Image width={200} src="https://datavizproject.com/wp-content/uploads/2015/10/1-Line-Chart.png" />
      <Row justify="center">
        <Button type="primary">Buy</Button>
      </Row>
    </div>
  );
};

export default Home;
