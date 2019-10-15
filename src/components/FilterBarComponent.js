import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.catToggle = this.catToggle.bind(this);
    this.valToggle = this.valToggle.bind(this);
    this.catSelected = this.catSelected.bind(this);
    this.valSelected = this.valSelected.bind(this);
    this.state = { catDropdownOpen: false, valDropdownOpen: false };
  }

  catToggle() { this.setState(prevState => ({ catDropdownOpen: !prevState.catDropdownOpen })); }
  valToggle() { this.setState(prevState => ({ valDropdownOpen: !prevState.valDropdownOpen })); }

  catSelected(e) {
    e.preventDefault();
    const newCat = e.currentTarget.innerText;
    console.log("FilterBar new cat: " + newCat)
    this.props.appProps.filterQAsByCat(newCat === "Clear" ? null : newCat);
  }

  valSelected(e) {
    e.preventDefault();
    const newVal = e.currentTarget.innerText;
    console.log("FilterBar new val: " + newVal);
    this.props.appProps.filterQAsByVal(newVal === "Clear" ? null : newVal);
  }

  render() {
    console.log("filterBar rendering:" + JSON.stringify(this.state));
    const fqas = this.props.appProps.qas.qas
        .filter((qa) => {
            const t = qa.category.title;
            const v = qa.value;
            return qa.question !== '' && 
                (!this.props.appProps.qas.selectedCat || this.props.appProps.qas.selectedCat === t) &&
                (!this.props.appProps.qas.selectedVal || this.props.appProps.qas.selectedVal == v);
        });

    const categories = [...new Set(fqas.map((qa)=>qa.category.title))];
    const catItems = categories.sort().map((cat) => (
        <DropdownItem key={cat} onClick={this.catSelected}>{cat}</DropdownItem>
    ));
    const values = [...new Set(fqas.map((qa)=>qa.value))];
    const valItems = values.sort().map((val) => (
        <DropdownItem key={val} onClick={this.valSelected}>{val}</DropdownItem>
    ));
    return (
      <div className="row">
        <Dropdown isOpen={this.state.catDropdownOpen} toggle={this.catToggle}>
            <DropdownToggle caret> Category {this.props.appProps.qas.selectedCat}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem key='clear' onClick={this.catSelected}>Clear</DropdownItem>
              <DropdownItem divider />
              {catItems}
            </DropdownMenu>
        </Dropdown>
        <Dropdown isOpen={this.state.valDropdownOpen} toggle={this.valToggle}>
            <DropdownToggle caret> Value {this.props.appProps.qas.selectedVal}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem key='clear' onClick={this.valSelected}>Clear</DropdownItem>
              <DropdownItem divider />
              {valItems}
            </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default FilterBar;