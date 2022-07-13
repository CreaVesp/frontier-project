import classes from './Menu.module.css';

const UsersMenu = () => {
  return (
    <div className={classes.layout}>
      <div>
        <p>Список пользователей</p>
      </div>
      <div>
        <p>К какому клиенту прикреплен выбранный пользователь</p>
      </div>
      <div>
        <p>Список продуктов доступных выбранному пользователю</p>
      </div>
    </div>
  );
};

export default UsersMenu;
