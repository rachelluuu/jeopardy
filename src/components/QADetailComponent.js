import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

function RenderQA({qa}) {
    return (
        /*<FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>*/
            <Card>
                <CardHeader className="bg-primary text-white"><b>{qa.question}</b></CardHeader>
                <CardBody>
                    <dl className="row p-1">
                        <dt className="col-6">Answer</dt>
                        <dd className="col-6"><b>{qa.answer}</b></dd>
                        <dt className="col-6">Category</dt>
                        <dd className="col-6">{qa.category.title}</dd>
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

const QADetail = props => 
    (
        <div className="container">
        <div className="row">
            <div className="question col-12">
                <RenderQA qa={props.qa} />
            </div>
        </div>
        </div>
    );

export default QADetail;