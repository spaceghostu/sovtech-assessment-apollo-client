import React, { Key, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useQuery } from '@apollo/client';
import { GET_PEOPLE } from '../../GraphQL/Queries';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { IPerson } from '../../models/person';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '550px',
    justifyContent: 'center',
    display: 'flex',
  },
  list: {
    width: '100%',
  },
  list_item: {
    padding: '10px 50px',
  },
  loader: {
    marginTop: '100px',
  }
}));

export default function PeopleList({ page }: { page: number}) {
  const classes = useStyles();

  const { error, loading, data } = useQuery(GET_PEOPLE, {
    variables: { page },
  });

  const [people, setPeople] = useState<IPerson[]>([]);

  useEffect(() => {
    if (data) {
      setPeople(data.people.results);
    }
  }, [data]);

  if (loading) return (
    <div className={classes.root}>
      <CircularProgress className={classes.loader} />
    </div>
  );
  if (error) return (
    <div className={classes.root}>
      Error! {error.message}
    </div>
  );

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="People" className={classes.list}>
        {people.map(person =>
        <Link to={`/person/${person.name}`} key={(person.name as Key)}>
          <ListItem className={classes.list_item} button>
            <ListItemText primary={person.name} />
          </ListItem>
        </Link>
        )}
      </List>
    </div>
  );
}