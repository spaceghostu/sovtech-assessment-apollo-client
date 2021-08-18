

import { gql } from '@apollo/client';

export const GET_PEOPLE = gql`
    query GetPeople($page: Int) {
        people(page: $page) {
            previous,
            next,
            results {
                name
            }
        }
    }
`

export const GET_PERSON = gql`
    query GetPeople($name: String) {
        person(name: $name) {
            results {
                name,
                height,
                mass,
                gender,
                homeworld,
            }
        }
    }
`