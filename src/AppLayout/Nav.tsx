import * as React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';
import { ButtonProps } from 'material-ui/Button';

interface Props {
  onClick: () => void;
}

const NavLink: React.SFC<{ route: string; label: string; onClick: () => void }> = ({
  route,
  label,
  onClick,
}) => (
  <ListItem
    button={true}
    component={(buttonProps: ButtonProps) => <Link to={route} {...buttonProps} onClick={onClick} />}
  >
    <ListItemText primary={label} />
  </ListItem>
);

class Nav extends React.Component<Props> {
  render() {
    return (
      <List>
        <NavLink route="/" label="Playground" onClick={this.props.onClick} />
        <NavLink route="/about" label="About" onClick={this.props.onClick} />
        <NavLink route="/guides/install" label="Install" onClick={this.props.onClick} />
        <NavLink route="/guides/usage" label="Usage" onClick={this.props.onClick} />
      </List>
    );
  }
}

export default Nav;
