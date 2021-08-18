import { makeStyles, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { ChangeEvent, useState } from 'react';
import PeopleList from '../../Components/PeopleList/PeopleList';
import './Home.css'

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: '1000px',
        margin: 'auto',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export function Home() {
    const classes = useStyles();
    const [page, setPage] = useState<number>(1);
    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    return (
        <div className={classes.root}>
            <header className="App-header">
                <Typography variant="h4">
                    Star Wars
                </Typography>
            </header>
            <PeopleList page={page}></PeopleList>
            <Pagination className={classes.pagination} count={9} page={page} onChange={handleChange} color="primary"/>
        </div>
    )
}