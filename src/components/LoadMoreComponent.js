import React from 'react';
import { Button } from 'reactstrap';

class LoadMore extends React.Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }

  clicked(e) {
    e.preventDefault();
    this.props.appProps.fetchQAs(this.props.appProps.qas);
  }

  render() {
    return (
      <Button className="moreButton" onClick={this.clicked} disabled={this.props.appProps.qas.isLoading} > 
        {this.props.appProps.qas.isLoading ? "Loading..." : "More..." }
      </Button>
    );
  }
}

export default LoadMore;