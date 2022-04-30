import { Card, Row, Col, Typography, Divider, Image } from 'antd';
import React, { FC } from 'react';

import ball from '../../images/blue.png';
import PrizeBox from '../prizeBox/PrizeBox';

const { Title, Text } = Typography;

const Announcement: FC = () => {
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
            Drawn Apr 30, 2022, 7:00 AM
          </Title>
        </Row>
        <Divider />
        <Row gutter={16} justify="center">
          <Col>
            <Text strong style={{ fontSize: '18px' }}>
              Winning Number:
            </Text>
          </Col>
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
              <Title level={3}>1</Title>
            </Text>
          </Col>
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
              <Title level={3}>4</Title>
            </Text>
          </Col>
        </Row>
        <Divider />
        <Row justify="center">
          <Col span={8}>
            <Row justify="center">
              <Title level={3}>Prize pool</Title>
            </Row>
            <Row justify="center">
              <Title style={{ color: '#00BFFF' }}>100 ETH</Title>
            </Row>
            <Row justify="center">
              <Title level={3}>Total players: 77</Title>
            </Row>
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
