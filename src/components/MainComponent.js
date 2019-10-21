import React, { Component } from 'react';
import Search from './SearchComponent';
import Play from './PlayComponent';
import QADetail from './QADetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQAs, fetchCats } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Shorten the naming conventions
const mapStateToProps = state => ({
  qas: state.qas,
  cats: state.cats,
  catQAs: state.catQAs
});

const mapDispatchToProps = dispatch => ({
  fetchQAs: (f) => dispatch(fetchQAs(f)),
  fetchCats: () => dispatch(fetchCats())
});

// Connects all the components to gether into a cohesive site
class Main extends Component {

  componentDidMount() {
    this.props.fetchQAs(0);
    this.props.fetchCats();
  }

  // display the desired page accordingly
  render() {
    const SearchPage = () => (
      <Search appProps={this.props} />
    );

    const PlayPage = () => (
      <Play appProps={this.props} />
    );

    // Display the details of a selected card on the search page
    const QADetailPage = ({ match }) => (
      <QADetail qa={this.props.qas.data.filter((qa) => qa.id === parseInt(match.params.qaId, 10))[0]}
        isLoading={this.props.qas.isLoading}
        errMess={this.props.qas.errMess}
      />
    );

    // Display the details of a selected card on the play page
    const PlayQADetailPage = ({ match }) => (
      <QADetail qa={this.props.catQAs.catQAs['c' + match.params.catId][match.params.row]}
        isLoading={this.props.catQAs.isLoading}
        errMess={this.props.catQAs.errMess}
      />
    );

    // Display the correct page based on the URL. The default page is Search
    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch location={this.props.location}>
              <Route exact path='/search' component={SearchPage} />
              <Route path='/search/:qaId' component={QADetailPage} />
              <Route exact path='/play' component={PlayPage} />
              <Route path='/play/:catId/:row' component={PlayQADetailPage} />
              <Redirect to='/search' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));