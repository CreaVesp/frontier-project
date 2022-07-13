import List from '../components/Lists/List';
import classes from './Menu.module.css';

const PRODUCTS = [
  { id: Math.round(Math.random() * 100), name: 'Banking Dashboard' },
  { id: Math.round(Math.random() * 100), name: 'Financial Datasheet' },
  { id: Math.round(Math.random() * 100), name: 'Transport Dashboard' },
  { id: Math.round(Math.random() * 100), name: 'Logistics CRM' },
  { id: Math.round(Math.random() * 100), name: 'Financial Datasheet' },
  { id: Math.round(Math.random() * 100), name: 'Interactive Railroads Map' },
];

const ProductsMenu = () => {
  return (
    <div className={classes.layout}>
      <List data={PRODUCTS} />
    </div>
  );
};

export default ProductsMenu;
