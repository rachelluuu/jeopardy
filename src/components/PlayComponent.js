import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

// Display the quetion boxes in all the rows except the top row of the gameboard
const RenderQAItem = ({ catId, row, qa }) => (
    <div className="playTile col-2" key={catId + '.' + row}>
        <Link to={`/play/${catId}/${row}`} >
            <Card className="playCard">
                <CardBody className="playValue">${qa.value}</CardBody>
            </Card>
        </Link>
    </div>
);

// Display the category boxes in the top row of the game board.
const CategoryBar = ({ cats }) => cats.map((cat) => (
    <div className="playTile col-2" key={cat.id}>
        <Card className="playCard">
            <CardBody className="playCategory">{cat.title}</CardBody>
        </Card>
    </div>
));

// Display the respective message for Loading or errors
const Play = ({ appProps }) => {
    if (appProps.cats.isLoading)
        return (<div className="row"> <Loading msg="Categories" /> </div>);

    if (appProps.catQAs.isLoading)
        return (<div className="row"> <Loading msg="Categories Questions" /> </div>);

    if (appProps.cats.errMess) {
        return (
            <div className="row">
                <div className="col-12">
                    <h4>{appProps.qas.errMess}</h4>
                </div>
            </div>
        );
    }

    // generate the table of the game board
    const results = [];
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 6; c++) {
            const catId = appProps.cats.cats[c].id;
            if (appProps.catQAs) {
                const qas = appProps.catQAs.catQAs['c' + catId];
                if (qas && qas[r]) {
                    const val = (r + 1) * 200;
                    let i = 0;
                    while (i < qas.length && qas[i].value !== val) i++;
                    if (i < qas.length)
                        results.push((<RenderQAItem key={'c' + c + 'r' + r} catId={catId} row={i} qa={qas[i]} />));
                }
            }
        };
    }

    // Define the first row for categories, and the rest as questions
    return (
        <div className="playBoard">
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