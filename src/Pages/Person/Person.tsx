import './Person.css';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/client';
import { GET_PERSON } from '../../GraphQL/Queries';
import { useParams, Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { IPerson } from '../../models/person';
import { IPageParams } from '../../models/page-params';

const useStyles = makeStyles({
    root: {
        maxWidth: '1000px',
        margin: 'auto',
        padding: '50px',
        alignItems: 'center',
        display: 'flex',
        flexFlow: 'column',
    },
    card: {
        width: '100%',
        backgroundColor: '#424242',
        color: 'white',
    },
    title: {
        fontSize: 24,
    },
    home: {
        marginTop: '50px',
    },
    text: {
        color: 'white',
    },
});

export default function Person() {
    const classes = useStyles();
    const { name } = useParams<IPageParams>();
    const { error, loading, data } = useQuery(GET_PERSON, {
        variables: { name },
    });

    const [person, setPerson] = useState<IPerson>({
        name: '',
        gender: '',
        height: '',
        mass: '',
        homeworld: ''
    });

    useEffect(() => {
        if (data) {
            setPerson(data.person.results[0]);
        }
    }, [data]);

    if (loading) return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    );
    if (error) return (
        <div className={classes.root}>
            Error! {error.message}
            <Link to="/home" className={classes.home}>
                <Button>Home</Button>
            </Link>
        </div>
    );

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} gutterBottom>
                        Name: {person.name}
                    </Typography>
                    <Typography className={classes.text}>
                        Height: {person.height}cm
                    </Typography>
                    <Typography className={classes.text}>
                        Mass: {person.mass}kg
                    </Typography>
                    <Typography className={classes.text}>
                        {/* {person.gender.charAt(0).toUpperCase() + person.gender.slice(1)} */}
                        Gender: {person.gender}
                    </Typography>
                    <Typography className={classes.text}>
                        Homeworld: {person.homeworld}
                    </Typography>
                </CardContent>
            </Card>
            <Link to="/home" className={classes.home}>
                <Button>Home</Button>
            </Link>
        </div>
    );
}