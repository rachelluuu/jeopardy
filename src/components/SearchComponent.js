import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import FilterBar from './FilterBarComponent';
import LoadMore from './LoadMoreComponent';

const RenderQAItem = ({ qa }) => (
    <Link to={`/search/${qa.id}`} >
        <Card className="questionCard">
            <CardHeader className="questionCategory">{qa.category.title}</CardHeader>
            <CardBody className="question">{qa.question}</CardBody>
        </Card>
    </Link>
);

const Search = ({ appProps }) => {
    if (appProps.qas.isLoading && !appProps.qas.qas) {
        return (<div className="row"><Loading /> </div>);
    }

    if (appProps.qas.errMess) {
        return (<div className="col-12"> <h4>{appProps.qas.errMess}</h4> </div>);
    }

    const selectedCat = appProps.qas.selectedCat;
    const selectedVal = appProps.qas.selectedVal;
    const selectedStartDate = appProps.qas.selectedStartDate;
    const selectedEndDate = appProps.qas.selectedEndDate;
    const catValQas = appProps.qas.qas.filter((qa) => (
        qa.question !== '' &&
        (!selectedCat || selectedCat === qa.category.title) &&
        (!selectedVal || selectedVal === qa.value)));
    const results = catValQas.filter((qa) => (
        (!selectedStartDate || qa.airdate >= selectedStartDate) &&
        (!selectedEndDate || qa.airdate <= selectedEndDate)));
    const qaItems = results.map((qa) => (
        <div className="questionTile col-lg-3 col-md-6 col-12" key={qa.id}>
            <RenderQAItem qa={qa} />
        </div>));
    console.log("search render: ", selectedStartDate, selectedEndDate, catValQas.length, results.length);
    return (
        <div className="questionBoard">
            <FilterBar appProps={appProps} minDate={new Date(Math.min(...catValQas.map(qa => qa.airdate)))} maxDate={new Date(Math.max(...catValQas.map(qa => qa.airdate)))} />
            <div className="row">
                {qaItems}
            </div>
            <div className="row">
                <LoadMore appProps={appProps} />
            </div>
        </div>
    );
}

export default Search;