import { faker } from '@faker-js/faker';
import { Row, Col, Statistic, Button, Input, Modal, Typography } from 'antd';
import { useEventListener } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import React, { FC, useState } from 'react';

import { useAppContracts } from '../contractContext';
import { HistogramChart } from '../main/HistogramChart';
import Announcement from './Announcement';

const { Title } = Typography;

const labels = Array.from(Array(100).keys());
const data = labels.map(() => faker.datatype.number({ min: 15, max: 100 }));

const Home: FC = () => {
  const ethersContext = useEthersContext();
  const lottopusContract = useAppContracts('Lottopus', ethersContext.chainId);
  const [buyLotto] = useEventListener(lottopusContract, lottopusContract?.filters.BuyLotto(ethersContext.account), 0);
  console.log(buyLotto);
  const [input, setInput] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const handleOk = async (): Promise<void> => {
    setIsModalVisible(false);
    // window.location.href = 'http://localhost:3000/My-Lotto';
    const trans = await lottopusContract?.buyLotto(Number(input), { value: 20 });
    // console.log(trans);
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
        <Title level={2}>Countdown</Title>
      </Row>
      <Row justify="center">
        <Countdown title="" value={deadline} onFinish={onFinish} />
      </Row>
      <Row justify="center" style={{ paddingBottom: '8px', paddingTop: '8px' }}>
        <Button type="primary">Trigger Random</Button>
      </Row>
      <Announcement />
      <HistogramChart labels={labels} data={data} />
      <Row justify="center" gutter={8}>
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
