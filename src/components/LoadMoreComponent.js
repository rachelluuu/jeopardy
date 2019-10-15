import React from 'react';
import { Button } from 'reactstrap';

class LoadMore extends React.Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }

  clicked(e) {
    e.preventDefault();
    const n = this.props.appProps.qas.qas.length;
    this.props.appProps.fetchQAs(n);
  }

  render() {
    console.log("load more: ");
    console.log(this.props.appProps);
    return (
      <Button className="moreButton" onClick={this.clicked} disabled={this.props.appProps.qas.isLoading} > 
        {this.props.appProps.qas.isLoading ? "Loading..." : "More..." }
      </Button>
    );
  }
}

export default LoadMore;