import type { Meta, StoryObj } from '@storybook/react';

import ShoppingItem from '.';

/**
 * `ShoppingItem`은 하나의 쇼핑 품목을 나타내는 컴포넌트입니다.
 */
const meta: Meta<typeof ShoppingItem> = {
  title: 'ShoppingItem',
  component: ShoppingItem,
};

export default meta;

type Story = StoryObj<typeof ShoppingItem>;

export const DefaultShoppingItem: Story = {
  args: {
    id: 1,
    price: 20000,
    name: '[밀키트 SET] 아메리칸식 디너',
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  },
};