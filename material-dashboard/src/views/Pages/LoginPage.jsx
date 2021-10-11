import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      email: '',
      password: '',
      loggedIn: false,
    };
    this.handleLogin = this.handleLogin.bind(this)
  }

  onChange(input, value) {
    this.setState({
      [input]: value
    })
  }

  handleLogin() {
    const data = {
      'email' : this.state.email, 
      'password' : this.state.password
    }

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(
      response => response.json()
    ).then(
      data => this.setState({ loggedIn: data.logged_in })
    )
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  render() {
    const { classes } = this.props;
    return this.state.loggedIn ? (
      <Route>
        <Redirect to={{
            pathname: "/dashboard",
            state: { loggedIn: this.state.loggedIn }
          }}
        />
      </Route>
    ) : 
    (<div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>Log in</h4>
                  <div className={classes.socialLine}>
                    {[
                      "fab fa-facebook-square",
                      "fab fa-twitter",
                      "fab fa-google-plus"
                    ].map((prop, key) => {
                      return (
                        <Button
                          color="transparent"
                          justIcon
                          key={key}
                          className={classes.customButtonClass}
                        >
                          <i className={prop} />
                        </Button>
                      );
                    })}
                  </div>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      onChange: (e) => this.onChange('email', e.target.value)
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      onChange: (e) => this.onChange('password', e.target.value)
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button color="rose" simple size="lg" block onClick={this.handleLogin}>
                    Let's Go
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>) 
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
