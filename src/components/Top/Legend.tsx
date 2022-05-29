import React from 'react';
import styled from '@emotion/styled';

export interface LegendProps {
  /**
   * Feature that should be activated by first and second actions
   */
  feature: string;
  /**
   * First action
   */
  firstAction: string;
  /**
   * Second action
   */
  secondAction: string;
}

export const Legend: React.FC<LegendProps> = ({
  feature,
  firstAction,
  secondAction,
}) => {
  return (
    <Parent>
      <strong>{feature}: </strong>
      <CodeContainer>
        <code>
          <FirstAction>{firstAction}</FirstAction> +{' '}
          <SecondAction>{secondAction}</SecondAction>
        </code>
      </CodeContainer>
    </Parent>
  );
};

const CodeContainer = styled.code`
  background: #e3e3e3;
  padding: 2px 4px;
  border-radius: 4px;
`;

const Parent = styled.legend`
  font-size: 1em;
  margin: 0 auto 2vh;
  line-height: 1.25em;
`;

const FirstAction = styled.span`
  color: #ec433c;
`;

const SecondAction = styled.span`
  color: #2a48ec;
`;
