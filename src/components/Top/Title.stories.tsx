import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Title, TitleProps } from './Title';

export default {
  title: 'Top/Title',
  component: Title,
} as Meta;

const Template: Story<TitleProps> = (args) => <Title {...args} />;

export const GameTitle = Template.bind({});
GameTitle.args = {
  children: 'minesweeper',
};
