import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';

function RenderQA({qa}) {
    return (
        /*<FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>*/
            <Card>
                <CardBody>
                    <CardTitle>Question: {qa.question}</CardTitle>
                    Answer: {qa.answer} 
                    <hr/>
                    <ul>
                    <li>Value: {qa.value}</li>
                    <li>Category: {qa.category.title}</li>
                    <li>Air Date: {qa.airdate}</li>
                    </ul>
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

    console.log(props);
    let qa = props.qa;
    if (qa == null)
        return( <div></div> );

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