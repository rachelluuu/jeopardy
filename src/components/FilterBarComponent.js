import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.catSelected = this.catSelected.bind(this);
    this.state = { dropdownOpen: false };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  catSelected(e) {
    e.preventDefault();
    const newCat = e.currentTarget.innerText;
    console.log("FilterBar new cat: " + newCat)
    this.props.appProps.filterQAs(newCat);
  }

  render() {
    console.log("filterBar rendering:" + JSON.stringify(this.state));
    const categories = [...new Set(this.props.appProps.qas.qas.map((qa)=>qa.category.title))];
    const items = categories.sort().map((cat) => (
        <DropdownItem key={cat} onClick={this.catSelected}>{cat}</DropdownItem>
    ));
    return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret> Category </DropdownToggle>
            <DropdownMenu>
                {items}
            </DropdownMenu>
        </Dropdown>
    );
  }
}

export default FilterBar;