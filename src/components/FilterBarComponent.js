import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.catToggle = this.catToggle.bind(this);
    this.valToggle = this.valToggle.bind(this);
    this.catSelected = this.catSelected.bind(this);
    this.valSelected = this.valSelected.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.state = { 
      catDropdownOpen: false, 
      valDropdownOpen: false,
      startDate: props.appProps.qas.selectedStartDate, // important since a new component seems to be created
      endDate: props.appProps.qas.selectedEndDate 
    };
  }

  catToggle() { this.setState(prevState => ({ catDropdownOpen: !prevState.catDropdownOpen })); }
  valToggle() { this.setState(prevState => ({ valDropdownOpen: !prevState.valDropdownOpen })); }

  catSelected(e) {
    e.preventDefault();
    const newCat = e.currentTarget.innerText;
    this.props.appProps.filterQAsByCat(newCat === "Clear" ? null : newCat);
  }

  valSelected(e) {
    e.preventDefault();
    const newVal = e.currentTarget.innerText;
    this.props.appProps.filterQAsByVal(newVal === "Clear" ? null : newVal);
  }

  handleStartDateChange = date => { 
    if (date) { 
      date.setHours(0); 
      date.setMinutes(0); 
      date.setSeconds(0); 
    }
    console.log("start date change fired date,state:", date, this.state);
    this.setState({ startDate: date }); 
    this.props.appProps.filterQAsByDate(date, this.state.endDate); 
  };
  handleEndDateChange = date => { 
    if (date) {
      date.setHours(23);
      date.setMinutes(59);
      date.setSeconds(59);
    }
    console.log("end date change fired date,state:", date, this.state);
    this.setState({ endDate: date }); 
    this.props.appProps.filterQAsByDate(this.state.startDate, date); 
  };

  render() {
    const qas = this.props.appProps.qas;
    const fqas = qas.qas.filter((qa) => (
        qa.question !== '' && 
            (!qas.selectedCat || qas.selectedCat === qa.category.title) &&
            (!qas.selectedVal || qas.selectedVal === qa.value) &&
            (!qas.selectedStartDate || qa.airdate >= qas.selectedStartDate) &&
            (!qas.selectedEndDate || qa.airdate <= qas.selectedEndDate)
    ));

    const categories = [...new Set(fqas.map((qa)=>qa.category.title))];
    const catItems = categories.sort().map((cat) => (
        <DropdownItem key={cat} onClick={this.catSelected}>{cat}</DropdownItem>
    ));
    const values = [...new Set(fqas.map((qa)=>qa.value))];
    const valItems = values.sort().map((val) => (
        <DropdownItem key={val} onClick={this.valSelected}>{val}</DropdownItem>
    ));
    const startMaxDate = this.state.endDate ? Math.min(this.props.maxDate, this.state.endDate) : this.props.maxDate;
    const endMinDate = this.state.startDate ? Math.max(this.props.minDate, this.state.startDate) : this.props.minDate;
    console.log('filterBar render props min,max, start max, end min:', this.props.minDate, this.props.maxDate, startMaxDate, endMinDate);
    return (
      <div className="filterBar row">
        <Dropdown isOpen={this.state.catDropdownOpen} toggle={this.catToggle}>
          <DropdownToggle caret color='primary'> Category {qas.selectedCat}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem key='clear' onClick={this.catSelected}>Clear</DropdownItem>
            <DropdownItem divider />
            {catItems}
          </DropdownMenu>
        </Dropdown>
        <Dropdown isOpen={this.state.valDropdownOpen} toggle={this.valToggle}>
          <DropdownToggle caret color='primary'> Value {qas.selectedVal?qas.selectedVal:''}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem key='clear' onClick={this.valSelected}>Clear</DropdownItem>
            <DropdownItem divider />
            {valItems}
          </DropdownMenu>
        </Dropdown>
        <div className="dateRangePicker">
          <DatePicker className="startDatePicker" popperPlacement='top' placeholderText='Start air date'
            minDate={this.props.minDate} maxDate={startMaxDate} isClearable selected={this.state.startDate} 
            onChange={this.handleStartDateChange}/>
          <DatePicker className="endDatePicker" popperPlacement='top' placeholderText='End air date'
            minDate={endMinDate} maxDate={this.props.maxDate} isClearable selected={this.state.endDate} 
            onChange={this.handleEndDateChange}/>
        </div>
        <div className="cardTotal">{fqas.length} Question</div>
      </div>
    );
  }
}

export default FilterBar;