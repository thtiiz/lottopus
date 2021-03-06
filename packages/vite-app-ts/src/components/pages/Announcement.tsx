import { Card, Row, Col, Typography, Divider, Image } from 'antd';
import { useContractReader } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import React, { FC, ReactElement } from 'react';

import ball from '../../images/blue.png';
import { useAppContracts } from '../contractContext';
import PrizeBox from '../prizeBox/PrizeBox';

const { Title, Text } = Typography;

const Announcement: FC = () => {
  const ethersContext = useEthersContext();
  const lottopusContract = useAppContracts('Lottopus', ethersContext.chainId);

  const [currentPool] = useContractReader(lottopusContract, lottopusContract?.getCurrentRoundPool, [], undefined);

  const [currentRoundNumber] = useContractReader(lottopusContract, lottopusContract?.currentRoundNumber, [], undefined);

  const curRound = () => {
    if (!currentRoundNumber) {
      return 0;
    }

    return currentRoundNumber.toNumber() > 0 ? currentRoundNumber.toNumber() - 1 : 0;
  };

  const [winningNumber] = useContractReader(lottopusContract, lottopusContract?.winningNumber, [curRound()], undefined);
  const [endTime] = useContractReader(
    lottopusContract,
    lottopusContract?.roundEndTime,
    [currentRoundNumber ? currentRoundNumber : 0],
    undefined
  );

  const safeEndTime = new Date(!!endTime ? endTime.toNumber() * 1000 : 0);

  const renderWinningDigit = (d: string): ReactElement => {
    return (
      <Col style={{ position: 'relative', textAlign: 'center' }}>
        <Image width={50} src={ball} />
        <Text
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: ' translate(-50%, -50%)',
            color: 'white',
          }}>
          <Title level={3}>{d}</Title>
        </Text>
      </Col>
    );
  };

  const renderWinningNumber = (): ReactElement[] => {
    const safeWinningNumber = !!winningNumber ? winningNumber?.toNumber() : 0;

    return safeWinningNumber
      .toString()
      .padStart(2, '0')
      .split('')
      .map((digit) => renderWinningDigit(digit));
  };

  return (
    <div>
      <Card style={{}}>
        <Row justify="center">
          <Title level={2} style={{ fontWeight: 'bold' }}>
            Prize Announcement
          </Title>
        </Row>
        <Row justify="center">
          <Title level={3} style={{ color: '#00BFFF' }}>
            Drawn {safeEndTime.toLocaleString()}
          </Title>
        </Row>
        <Divider />
        <Row gutter={16} justify="center">
          <Col>
            <Text strong style={{ fontSize: '18px' }}>
              Winning Number:
            </Text>
          </Col>
          {renderWinningNumber()}
        </Row>
        <Divider />
        <Row justify="center">
          <Col span={8}>
            <Row justify="center">
              <Title level={3}>Prize pool</Title>
            </Row>
            <Row justify="center">
              <Title style={{ color: '#00BFFF' }}>{!!currentPool ? currentPool.toString() : 0} Wei</Title>
            </Row>
            {/* <Row justify="center">
              <Title level={3}>Total players: 77</Title>
            </Row> */}
          </Col>
        </Row>
        <Divider />
        {/* <PrizeBox gotPrize={true} /> */}
        <PrizeBox gotPrize={false} />
      </Card>
    </div>
  );
};

export default Announcement;
