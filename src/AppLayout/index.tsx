import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import { Theme } from 'material-ui/styles/createMuiTheme';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Nav from './Nav';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
// import MenuIcon from 'material-ui-icons/Menu';
import Reboot from 'material-ui/Reboot';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

const drawerWidth = 240;

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
    height: '100%',
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '85vh',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    },
  },
});

class AppLayout extends React.Component<
  WithStyles<'root'> &
    WithStyles<'drawerHeader'> &
    WithStyles<'appFrame'> &
    WithStyles<'appBar'> &
    WithStyles<'navIconHide'> &
    WithStyles<'drawerPaper'> &
    WithStyles<'content'>
> {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  handleDrawerClose() {
    this.setState({ mobileOpen: false });
  }
  render() {
    const { classes } = this.props;

    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => this.handleDrawerToggle()}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Nav onClick={() => this.handleDrawerClose()} />
      </div>
    );

    return (
      <div className={classes.root}>
        <Reboot />
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar} color="default">
            <Toolbar>
              <Typography type="title" color="inherit" noWrap={true}>
                Contentful Models to TypeScript Type Definitions
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            type="temporary"
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClose={() => this.handleDrawerToggle()}
          >
            {drawer}
          </Drawer>

          <main className={classes.content}>{this.props.children}</main>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)<{}>(AppLayout);
