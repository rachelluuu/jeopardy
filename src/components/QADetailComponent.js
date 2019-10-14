import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { Loading } from './LoadingComponent';

function RenderQA({qa}) {
    return (
        /*<FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>*/
            <Card>
                <CardHeader className="bg-primary text-white"><b>{qa.question}</b></CardHeader>
                <CardBody>
                    <dl className="row p-1">
                        <dt className="col-6">Answer</dt>
                        <dd className="col-6"><b>{qa.answer}</b></dd>
                        <dt className="col-6">Value</dt>
                        <dd className="col-6">{qa.value}</dd>
                        <dt className="col-6">Air Date</dt>
                        <dd className="col-6">{qa.airdate}</dd>
                    </dl>
                </CardBody>
            </Card>
        /*</FadeTransform> */
    );
}

const QADetail = props => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }

    if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
        <div className="row">
            <div className="question col-12">
                <RenderQA qa={props.qa} />
            </div>
        </div>
        </div>
    );
}

export default QADetail;