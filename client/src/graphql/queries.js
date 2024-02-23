import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
  {
    people {
      firstName
      id
      lastName
      cars {
        id
        make
        model
        price
        year
      }
    }
  }
`;

export const GET_CARS = gql`
  {
    cars {
      id
      make
      model
      price
      year
      personId
    }
  }
`;

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const ADD_CAR = gql`
  mutation AddCar(
    $id: String!
    $year: Int!
    $make: String!
    $model: String!
    $price: Float!
    $personId: String!
  ) {
    addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      make
      model
      price
      year
      personId
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson(
    $id: String!
    $firstName: String!
    $lastName: String!
  ) {
    updatePerson(
      id: $id
      firstName: $firstName
      lastName: $lastName
    ) {
      firstName
      id
      lastName
    }
  }
`;

export const UPDATE_CAR = gql`
  mutation UpdateCar(
    $id: String!
    $year: Int!
    $make: String!
    $model: String!
    $price: Float!
    $personId: String!
  ) {
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      make
      price
      model
      year
      personId
    }
  }
`;

export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    deletePerson(id: $id) {
      firstName
      id
      lastName
    }
  }
`;

export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!) {
    deleteCar(id: $id) {
      id
      make
      model
      price
      year
      personId
    }
  }
`;
