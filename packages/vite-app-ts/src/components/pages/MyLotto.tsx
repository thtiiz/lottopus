import { Row, Col, Modal, Typography } from 'antd';
import React, { FC, useState } from 'react';

const { Title } = Typography;

import LottoCard from '../lottoCard/LottoCard';

const Home: FC = () => {
  const [lottos, setLottos] = useState([
    {
      reward: 500,
      amount: 2,
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const handleOk = (): void => {
    setIsModalVisible(false);
  };

  const handleCancel = (): void => {
    // setIsModalVisible(false);
  };

  return (
    <>
      <Modal visible={isModalVisible} onOk={handleOk} cancelButtonProps={{ style: { display: 'none' } }}>
        <Title level={3}>Prize you will get:</Title>
        <p>
          {lottos[0].reward} * {lottos[0].amount} = {lottos[0].reward * lottos[0].amount} THB
        </p>
      </Modal>
      <Row gutter={16}>
        {/* TODO: LOOP here */}
        <Col span={8} onClick={showModal}>
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
    </>
  );
};

export default Home;
