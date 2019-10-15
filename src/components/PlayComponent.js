import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

const NUM_CAT = 6;

const RenderQAItem = ({ catId, row, qa }) => (
    <Card className="value col-2">
        <Link to={`/play/${catId}/${row}`} >
            <CardBody> <center> $ {qa.value} </center> </CardBody>
        </Link>
    </Card>
);

const CategoryBar = ({ cats }) => cats.map((cat) => (
    <Card className="category col-2" key={cat.id}>
        <CardBody > {cat.title}</CardBody>
    </Card>
));

const Play = ({ appProps }) => {
    console.log("play render " + JSON.stringify(appProps.catQAs));
    if (appProps.cats.isLoading)
        return (<div className="container"> <div className="row"> <Loading msg="Categories" /> </div> </div>);

    if (appProps.catQAs.isLoading)
        return (<div className="container"> <div className="row"> <Loading msg="Categories Questions" /> </div> </div>);

    if (appProps.cats.errMess) {
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

    const results = [];
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 6; c++) {
            const catId = appProps.cats.cats[c].id;
            if (appProps.catQAs) {
                const qas = appProps.catQAs.catQAs['c' + catId];
                if (qas)
                    results.push((
                        <RenderQAItem catId={catId} row={r} qa={qas[r]} />
                    ));
            }
        };
    }

    return (
        <div className="container">
            <div className="categoryBar row">
                <CategoryBar cats={appProps.cats.cats}></CategoryBar>
            </div>
            <div className="row">
                {results}
            </div>
        </div>
    );
}

export default Play;