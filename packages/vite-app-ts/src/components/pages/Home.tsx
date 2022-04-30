import { faker } from '@faker-js/faker';
import { Row, Col, Statistic, Button, Input, Modal } from 'antd';
import React, { FC, useState } from 'react';

import { HistogramChart } from '../main/HistogramChart';

const labels = Array.from(Array(100).keys());
const data = labels.map(() => faker.datatype.number({ min: 15, max: 100 }));

const Home: FC = () => {
  const [input, setInput] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const handleOk = (): void => {
    setIsModalVisible(false);
    window.location.href = 'http://localhost:3000/My-Lotto';
  };

  const handleCancel = (): void => {
    setIsModalVisible(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const onFinish = () => () => {
    return null;
  };

  const { Countdown } = Statistic;

  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
  return (
    <>
      <Modal title="Confirm purchase" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Lotto No. {input}</p>
      </Modal>
      <Row justify="center">
        <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
      </Row>
      <Row justify="center">
        <Button type="primary">Trigger Random</Button>
      </Row>

      <HistogramChart labels={labels} data={data} />
      <Row justify="center">
        <Col span={8}>
          <Input placeholder="type 0-99" onChange={handleChange} type="number" />
        </Col>
        <Col>
          <Button type="primary" onClick={showModal} disabled={input === ''}>
            Buy
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Home;