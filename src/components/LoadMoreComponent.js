import React from 'react';
import { Button } from 'reactstrap';

class LoadMore extends React.Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }

  clicked(e) {
    e.preventDefault();
    const f = {...this.props.appProps.qas};
    f.offset = f.offset ? f.offset+100 : 100;
    this.props.appProps.fetchQAs(f);
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