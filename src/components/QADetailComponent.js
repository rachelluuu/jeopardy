import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { getFormattedDate } from '../shared/helper';

/**  Display the question, answer, category, value, air date of a particular card
 * after the user selected it in Search or Play
 **/
function RenderQA({ qa }) {
    return (
        <Card className="detailCard">
            <CardHeader className="detailCategory"><b>{qa.question}</b></CardHeader>
            <CardBody className="detail">
                <dl className="row p-1">
                    <dt className="col-6">Answer</dt>
                    <dd className="col-6"><b>{qa.answer}</b></dd>
                    <dt className="col-6">Category</dt>
                    <dd className="col-6">{qa.category.title}</dd>
                    <dt className="col-6">Value</dt>
                    <dd className="col-6">{qa.value}</dd>
                    <dt className="col-6">Air Date</dt>
                    <dd className="col-6">{getFormattedDate(qa.airdate)}</dd>
                </dl>
            </CardBody>
        </Card>
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