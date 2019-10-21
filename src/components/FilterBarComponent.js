import React from 'react';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

// Contains the React Components for searching by category, value, and date
class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.catToggled = this.catToggled.bind(this);
    this.valToggled = this.valToggled.bind(this);
    this.catSelected = this.catSelected.bind(this);
    this.valSelected = this.valSelected.bind(this);
    this.startDateChanged = this.startDateChanged.bind(this);
    this.endDateChanged = this.endDateChanged.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
    this.state = {
      catDropdownOpen: false,
      valDropdownOpen: false,
      searchEnabled: false,
      catId: props.appProps.qas.catId, // thse are important since a new component seems to be created
      catTitle: props.appProps.qas.catTitle,
      value: props.appProps.qas.value,
      startDate: props.appProps.qas.startDate,
      endDate: props.appProps.qas.endDate
    };
  }

  //Update the category and value dropdowns based on user selections
  catToggled() {
    this.setState(prevState => ({ catDropdownOpen: !prevState.catDropdownOpen }));
  }
  valToggled() {
    this.setState(prevState => ({ valDropdownOpen: !prevState.valDropdownOpen }));
  }

  getText(e) {
    const t = e.currentTarget.innerText;
    return t === 'Clear' ? null : t; // Clear means reset to search for all
  }

  catSelected(e, f) {
    this.setState({
      searchEnabled: true,
      catId: this.catTitle2IdMap.get(this.getText(e)),
      catTitle: this.getText(e)
    });
  }

  valSelected(e) {
    this.setState({
      searchEnabled: true,
      value: (this.getText(e) && parseInt(this.getText(e), 10)) || null
    });
  }

  //Update the start and end date based on user selections
  startDateChanged = date => {
    if (date) {
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
    }
    this.setState({ searchEnabled: true, startDate: date });
  };

  endDateChanged = date => {
    if (date) {
      date.setHours(23);
      date.setMinutes(59);
      date.setSeconds(59);
    }
    this.setState({ searchEnabled: true, endDate: date });
  };

  //Search for the results, given the category, value, and/or dates supplied
  searchClicked = () => {
    this.props.appProps.fetchQAs({ ...this.state, offset: 0 });
  };

  // display the most recent search query in the filter bar
  render() {
    const qas = this.props.appProps.qas;
    const fqas = qas.data.filter((qa) => (
      (!qas.category || qas.category === qa.category.id) &&
      (!qas.value || qas.value === qa.value) &&
      (!qas.startDate || qa.airdate >= qas.startDate) &&
      (!qas.endDate || qa.airdate <= qas.endDate)
    ));

    this.catTitle2IdMap = new Map(fqas.map(qa => [qa.category.title, qa.category.id]));
    const sortedCategories = Array.from(this.catTitle2IdMap.entries()).sort((a, b) => (a[0] > b[0] ? 1 : -1));
    const catItems = sortedCategories.map((cat) => (
      <DropdownItem key={cat[0]} onClick={this.catSelected}>{cat[0]}</DropdownItem>
    ));

    const values = [100, 200, 400, 800, 1000];
    const valItems = values.map((val) => (
      <DropdownItem key={val} onClick={this.valSelected}>{val}</DropdownItem>
    ));

    return (
      <div className='filterBar row'>
        <Dropdown isOpen={this.state.catDropdownOpen} toggle={this.catToggled}>
          <DropdownToggle className='filterBtn' caret color='primary'> Category {this.state.catTitle}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem key='clear' onClick={this.catSelected}>Clear</DropdownItem>
            <DropdownItem divider />
            {catItems}
          </DropdownMenu>
        </Dropdown>
        <Dropdown isOpen={this.state.valDropdownOpen} toggle={this.valToggled}>
          <DropdownToggle className='filterBtn' caret color='primary'> Value {this.state.value || ''}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem key='clear' onClick={this.valSelected}>Clear</DropdownItem>
            <DropdownItem divider />
            {valItems}
          </DropdownMenu>
        </Dropdown>
        <div className='dateRangePicker'>
          <DatePicker className='filterBtn startDatePicker' popperPlacement='top' placeholderText='Start air date'
            maxDate={this.state.endDate ? this.state.endDate : new Date()} isClearable selected={this.state.startDate}
            onChange={this.startDateChanged} />
          <DatePicker className='filterBtn endDatePicker' popperPlacement='top' placeholderText='End air date'
            minDate={this.state.startDate ? this.state.startDate : null} maxDate={new Date()} isClearable selected={this.state.endDate}
            onChange={this.endDateChanged} />
        </div>
        <Button className='filterBtn searchBtn' color='primary' disabled={!this.state.searchEnabled} onClick={this.searchClicked}>Search</Button>
        <div className='cardTotal'>Showing {fqas.length} Questions</div>
      </div>
    );
  }
}

export default FilterBar;