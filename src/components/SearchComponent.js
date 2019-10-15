import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import FilterBar from './FilterBarComponent';

const RenderQAItem = ({ qa }) => (
    <Card>
        <Link to={`/search/${qa.id}`} >
            <center>
                {qa.category.title}
            </center>
            <CardBody>
                {qa.question}
            </CardBody>
        </Link>
    </Card>
);

const Search = ({ appProps }) => {
    const selectedCat = appProps.qas.selectedCat;
    console.log("search render cat : " + selectedCat)
    const results = appProps.qas.qas
        .filter((qa) => {
            const t = qa.category.title;
            return qa.question !== '' && (!selectedCat || selectedCat === t);
        })
        .map((qa) => (
            <div className="question col-lg-3 col-md-6 col-12" key={qa.id}>
                <RenderQAItem qa={qa} />
            </div>
        ));

    if (appProps.qas.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

    if (appProps.qas.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{appProps.qas.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="filterBar row">
                <FilterBar appProps={appProps}></FilterBar>
            </div>
            <div className="row">
                {results}
            </div>
        </div>
    );
}

export default Search;