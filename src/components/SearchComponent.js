import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

function RenderQAItem({ qa, onClick }) {
    return (
        <Card>
            <Link to={`/search/${qa.id}`} >
                <center>
                    <CardTitle>
                        {qa.category.title}
                    </CardTitle>
                </center>
                <CardBody>
                    {qa.question}
                </CardBody>
            </Link>
        </Card>
    );
}

const Search = (props) => {
    const results = props.qas.qas
        .filter((qa) => qa.question !== '')
        .map((qa) => {
            return (
                <div className="question col-lg-3 col-md-6 col-12" key={qa.id}>
                    <RenderQAItem qa={qa} onClick={props.onClick} />
                </div>
            );
        });

    if (props.qas.isLoading) {
        return (
            <div className="container">
                <div className="xxxrow">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.qas.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{props.qas.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="container">
            <div className="row">
                {results}
            </div>
        </div>
    );
}

export default Search;