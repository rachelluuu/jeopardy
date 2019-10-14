import React from 'react';
import { Card, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import FilterBar from './FilterBarComponent';

const RenderQAItem = ({qa, onClick}) => (
    <Card>
        <Link to={`/search/${qa.id}`} >
            <CardTitle>{qa.question}</CardTitle>
        </Link>
    </Card>
);

const Search = (props) => {
    const selectedCat = props.appProps.qas.selectedCat;
    console.log("search render cat : " + selectedCat)
    const results = props.appProps.qas.qas
        .filter((qa) => {
            const t = qa.category.title;
            return qa.question !== '' && (!selectedCat || selectedCat === t);
        })
        .map((qa) => {
        return (
            <div className="question col-lg-3 col-md-6 col-12"  key={qa.id}>
                <RenderQAItem qa={qa} onClick={props.onClick} />
            </div>
        );
    });

    if (props.appProps.qas.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }

    if (props.appProps.qas.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{props.appProps.qas.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="filterBar row">
                <FilterBar appProps={props.appProps}></FilterBar>
            </div>
            <div className="row">
                {results}
            </div>
        </div>
    );
}

export default Search;