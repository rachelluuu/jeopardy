import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import FilterBar from './FilterBarComponent';
import LoadMore from './LoadMoreComponent';

const RenderQAItem = ({ qa }) => (
    <Card>
        <Link to={`/search/${qa.id}`} >
            <CardTitle>
                {qa.category.title}
            </CardTitle>
            <CardBody>
                {qa.question}
            </CardBody>
        </Link>
    </Card>
);

const Search = ({ appProps }) => {
    if (appProps.qas.isLoading && !appProps.qas.qas) {
        return (<div className="container"> <div className="row"><Loading /> </div> </div>);
    }

    if (appProps.qas.errMess) {
        return (<div className="container"> <div className="col-12"> <h4>{appProps.qas.errMess}</h4> </div> </div>);
    }

    const selectedCat = appProps.qas.selectedCat;
    const selectedVal = appProps.qas.selectedVal;
    const results = appProps.qas.qas
        .filter((qa) => {
            const t = qa.category.title;
            const v = qa.value;
            return qa.question !== '' &&
                (!selectedCat || selectedCat === t) &&
                (!selectedVal || selectedVal == v);
        })
        .map((qa) => (
            <div className="question col-lg-3 col-md-6 col-12" key={qa.id}>
                <RenderQAItem qa={qa} />
            </div>
        ));

    return (
        <div className="container">
            <div className="filterBar row">
                <FilterBar appProps={appProps} />
            </div>
            <div className="row">
                {results}
            </div>
            <div className="row">
                <LoadMore appProps={appProps} />
            </div>
        </div>
    );
}

export default Search;