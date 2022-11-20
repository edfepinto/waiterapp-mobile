import * as React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/product';
import { formatCurrency } from '../../utils/formatCurrency';

import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Button } from '../Button';
import { Text } from '../Text';

import {
  Item,
  Actions,
  ProductContainer,
  ProductDetails,
  Image,
  QuantityContainer,
  Summary,
  TotalContainer
} from './styles';
import { OrderConfirmedModal } from '../OrderConfirmedModal';

interface CartProps {
  cartItems: CartItem[],
  onAdd: (Product: Product) => void,
  onDecrement: (Product: Product) => void,
  onConfirmOrder: () => void
}

export function Cart({
  cartItems,
  onAdd,
  onDecrement,
  onConfirmOrder
}: CartProps) {
  const [isLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const total = cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.product.price;
  }, 0);

  function handleConfirmOrder() {
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOk}
      />

      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.0.199:3001/uploads/${cartItem.product.imagePath}`
                  }}
                />

                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text
                    size={14}
                    weight="600"
                  >
                    {cartItem.product.name}
                  </Text>
                  <Text
                    size={14}
                    color="#666"
                    style={{ marginTop: 4 }}
                  >
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onDecrement(cartItem.product)}
                >
                  <MinusCircle />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color='#666'>Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color='#999'>Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
