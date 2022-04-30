import { Row, Col, Statistic, Button, Input, Modal, Typography } from 'antd';
import { useContractReader } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import React, { FC, useMemo, useState } from 'react';

import { useAppContracts } from '../contractContext';
import { HistogramChart } from '../main/HistogramChart';

import Announcement from './Announcement';

const { Title } = Typography;

// const data = labels.map(() => faker.datatype.number({ min: 15, max: 100 }));

const Home: FC = () => {
  const ethersContext = useEthersContext();
  const lottopusContract = useAppContracts('Lottopus', ethersContext.chainId);
  // const [buyLotto] = useEventListener(lottopusContract, lottopusContract?.filters.BuyLotto(ethersContext.account), 0);
  // console.log(buyLotto);

  const [currentStake] = useContractReader(
    lottopusContract,
    lottopusContract?.getCurrentStakes,
    [],
    undefined
    // lottopusContract?.filters.BuyLotto(undefined)
  );

  const histogramLabels = useMemo(
    () => Array.from(Array((!!currentStake ? currentStake : []).length).keys()),
    [currentStake]
  );

  const histogramData = useMemo(() => {
    if (!currentStake) return [];
    return currentStake.map((lotto) => lotto.toNumber());
  }, [currentStake]);

  const [input, setInput] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const onClickProvideSeed = async (): Promise<void> => {
    await lottopusContract?.seed();
  };

  const onClickDistributeReward = async (): Promise<void> => {
    await lottopusContract?.pay();
  };

  const handleOk = async (): Promise<void> => {
    setIsModalVisible(false);
    // window.location.href = 'http://localhost:3000/My-Lotto';
    const trans = await lottopusContract?.buyLotto(Number(input), { value: 20 });
    console.log(trans);
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

  const [currentRoundNumber] = useContractReader(lottopusContract, lottopusContract?.currentRoundNumber, [], undefined);
  const [endTime] = useContractReader(
    lottopusContract,
    lottopusContract?.roundEndTime,
    [currentRoundNumber ? currentRoundNumber : 0],
    undefined
  );

  const safeEndTime = !!endTime ? endTime.toNumber() * 1000 : 0;
  return (
    <>
      <Modal title="Confirm purchase" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Lotto No. {input}</p>
      </Modal>

      <Row justify="center">
        <Title level={2}>Countdown</Title>
      </Row>
      <Row justify="center">
        <Countdown title="" value={safeEndTime} onFinish={onFinish} />
      </Row>
      <Row justify="center" style={{ paddingBottom: '8px', paddingTop: '8px' }}>
        <Button type="primary" style={{ marginRight: '8px' }} onClick={onClickProvideSeed}>
          Provide Seed
        </Button>
        <Button type="primary" onClick={onClickDistributeReward}>
          Distribute Reward
        </Button>
      </Row>
      <Announcement />

      <HistogramChart labels={histogramLabels} data={histogramData} />
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
