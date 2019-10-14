import React, { Component } from 'react';
import Search from './SearchComponent';
import QADetail from './QADetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQAs } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    qas: state.qas
  }
};

const mapDispatchToProps = dispatch => ({
  fetchQAs: () => { dispatch(fetchQAs()); }
});

class Main extends Component {

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  componentDidMount() {
    this.props.fetchQAs();
  }

  render() {
    const SearchPage = () => (
      <div className="container">
        <Search qas={this.props.qas} onClick={(qaId) => this.onQASelect(qaId)} />
        <QADetail qa={this.props.qas.qas.filter((qa) => qa.id === this.props.selectedQa)[0]} />
      </div>
    );

    const QAWithIdPage = ({ match }) => (
      <QADetail qa={this.props.qas.qas.filter((qa) => qa.id === parseInt(match.params.qaId, 10))[0]}
        isLoading={this.props.qas.isLoading}
        errMess={this.props.qas.errMess}
      />
    );

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch location={this.props.location}>
              <Route exact path='/' component={SearchPage} />
              <Route path='/jeopardy/search/:qaId' component={QAWithIdPage} />
              <Redirect to="/" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));