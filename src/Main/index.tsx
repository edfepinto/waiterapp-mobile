import * as React from 'react';

import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/Cart';

import { CartItem } from '../types/CartItem';
import { products } from '../mocks/products';

import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer
} from './styles';

export default function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = React.useState(false);
  const [selectedTable, setSelectedTable] = React.useState('');
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    {
      quantity: 1,
      product: products[0]
    },
    {
      quantity: 1,
      product: products[1]
    },
    {
      quantity: 1,
      product: products[2]
    },
    {
      quantity: 1,
      product: products[4]
    }
  ]);

  function handleSaveTable(table: string){
    setSelectedTable(table);
    setIsTableModalVisible(false);
  }

  function handleCancelOrder() {
    setSelectedTable('');
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleCancelOrder}
        />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu />
        </MenuContainer>
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setIsTableModalVisible(true)}>
              Novo pedido
            </Button>
          )}

          {selectedTable && (
            <Cart cartItems={cartItems} />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
