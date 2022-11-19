import * as React from 'react';

import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';

import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer
} from './styles';
import { TableModal } from '../components/TableModal';

export default function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = React.useState(false);
  const [selectedTable, setSelectedTable] = React.useState('');

  function handleSaveTable(table: string){
    setSelectedTable(table);
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
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
