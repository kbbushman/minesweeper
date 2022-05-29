import React from 'react';
import styled from '@emotion/styled';

import { Legend, LegendProps } from './Legend';
import { Title, TitleProps } from './Title';

export type TopComponent = LegendProps & TitleProps;

export const Top: React.FC<TopComponent> = ({ children, ...legendProps }) => {
  return (
    <Header>
      <Title>{children}</Title>
      <Legend {...legendProps} />
    </Header>
  );
};

const Header = styled.header`
  text-align: center;
  position: relative;
  display: inline-block;
`;
