import React, { FC, useCallback, useState } from 'react';

const { Title } = Typography;
import { Col, Modal, Row, Typography } from 'antd';
import { useEthersContext } from 'eth-hooks/context';

import { useAppContracts } from '../contractContext';
import LottoCard from '../lottoCard/LottoCard';

import { useContractReader } from 'eth-hooks';

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

  const ethersContext = useEthersContext();
  const lottopusContract = useAppContracts('Lottopus', ethersContext.chainId);

  const [myLottoNow] = useContractReader(
    lottopusContract,
    lottopusContract?.getMyLottoNow,
    [],
    lottopusContract?.filters.BuyLotto(ethersContext.account)
  );

  console.log(myLottoNow);

  const myLottos = myLottoNow
    ?.map((lotto, i) => ({ lottoNumber: i, purchasedAmount: lotto.toNumber() }))
    .filter(({ purchasedAmount }) => purchasedAmount > 0);

  const renderLottos = useCallback(() => {
    return myLottos?.map(({ lottoNumber, purchasedAmount }) => (
      <Col key={lottoNumber} span={8}>
        <LottoCard lottoNumber={lottoNumber} purchasedAmount={purchasedAmount} />
      </Col>
    ));
  }, [myLottos]);

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
      <Row gutter={[16, 16]}>{renderLottos()}</Row>
    </>
  );
};

export default Home;
