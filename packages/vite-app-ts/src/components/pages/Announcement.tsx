import { Card, Row, Col, Typography, Divider, Image } from 'antd';
import React, { FC } from 'react';

import ball from '../../images/blue.png';

const { Title, Text } = Typography;

const Announcement: FC = () => {
  return (
    <div>
      <Card style={{}}>
        <Row>
          <Title level={2} style={{ fontWeight: 'bold' }}>
            Prize Announcement
          </Title>
        </Row>
        <Row>
          <Title level={3} style={{ color: '#00BFFF' }}>
            Drawn Apr 30, 2022, 7:00 AM
          </Title>
        </Row>
        <Divider />
        <Row gutter={16}>
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

        <Row justify="space-around">
          <Col span={8}>
            <Row>
              <Title level={3}>Prize pot</Title>
            </Row>
            <Row>
              <Title style={{ color: '#00BFFF' }}>123132 BHT</Title>
            </Row>
            <Row>
              <Title level={3}>Total players: 77</Title>
            </Row>
          </Col>
          <Col span={12}>
            <Row justify="space-around">
              <Col>
                <Title level={4}>1 st</Title>
                <Title level={4}>400 THB</Title>
              </Col>
              <Col>
                <Title level={4}>2 nd</Title>
                <Title level={4}>100 THB</Title>
              </Col>
              <Col>
                <Title level={4}>3 rd</Title>
                <Title level={4}>100 THB</Title>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Announcement;
