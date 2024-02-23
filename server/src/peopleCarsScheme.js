import { find, remove } from "lodash";

const peopleArray = [
  {
    id: "1",
    firstName: "Bill",
    lastName: "Gates",
  },
  {
    id: "2",
    firstName: "Steve",
    lastName: "Jobs",
  },
  {
    id: "3",
    firstName: "Linux",
    lastName: "Torvalds",
  },
];

const carsArray = [
  {
    id: "1",
    year: "2019",
    make: "Toyota",
    model: "Corolla",
    price: "40000",
    personId: "1",
  },
  {
    id: "2",
    year: "2018",
    make: "Lexus",
    model: "LX 600",
    price: "13000",
    personId: "1",
  },
  {
    id: "3",
    year: "2017",
    make: "Honda",
    model: "Civic",
    price: "20000",
    personId: "1",
  },
  {
    id: "4",
    year: "2019",
    make: "Acura ",
    model: "MDX",
    price: "60000",
    personId: "2",
  },
  {
    id: "5",
    year: "2018",
    make: "Ford",
    model: "Focus",
    price: "35000",
    personId: "2",
  },
  {
    id: "6",
    year: "2017",
    make: "Honda",
    model: "Pilot",
    price: "45000",
    personId: "2",
  },
  {
    id: "7",
    year: "2019",
    make: "Volkswagen",
    model: "Golf",
    price: "40000",
    personId: "3",
  },
  {
    id: "8",
    year: "2018",
    make: "Kia",
    model: "Sorento",
    price: "45000",
    personId: "3",
  },
  {
    id: "9",
    year: "2017",
    make: "Volvo",
    model: "XC40",
    price: "55000",
    personId: "3",
  },
];

const typeDefs = `
  type Person {
    id: String!
    firstName: String!
    lastName: String!
    cars: [Car]
  }

  type Car {
    id: String!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: String!
  }

  type Query {
    people: [Person]
    cars: [Car] 
  }

  type Mutation {
    addPerson (id: String!, firstName: String!, lastName: String!): Person
    updatePerson (id: String!, firstName: String!, lastName: String!): Person
    deletePerson (id: String!): Person
    addCar (id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
    updateCar (id: String!, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Car
    deleteCar (id: String!): Car
  }
`;

const resolvers = {
  Query: {
    people: () => peopleArray,
    cars: () => carsArray,
  },

  Person: {
    cars: (parent) => carsArray.filter((car) => car.personId === parent.id),
  },

  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };

      peopleArray.push(newPerson);
      return newPerson;
    },
    updatePerson: (root, args) => {
      const person = find(peopleArray, { id: args.id });
      if (!person) {
        throw new Error(`Couldn\'t find person with id ${args.id}`);
      }

      person.firstName = args.firstName;
      person.lastName = args.lastName;

      return person;
    },
    deletePerson: (root, args) => {
      const deletedPerson = find(peopleArray, { id: args.id });
      if (!deletedPerson) {
        throw new Error(`Couldn\'t find person with id ${args.id}`);
      }

      remove(peopleArray, (p) => {
        return p.id === deletedPerson.id;
      });

      return deletedPerson;
    },
    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };

      carsArray.push(newCar);
      return newCar;
    },
    updateCar: (root, args) => {
      const car = find(carsArray, { id: args.id });
      if (!car) {
        throw new Error(`Couldn\'t find car with id ${args.id}`);
      }

      (car.id = args.id),
        (car.year = args.year),
        (car.make = args.make),
        (car.model = args.model),
        (car.price = args.price);
      car.personId = args.personId;

      return car;
    },
    deleteCar: (root, args) => {
      const deletedCar = find(carsArray, { id: args.id });
      if (!deletedCar) {
        throw new Error(`Couldn\'t find car with id ${args.id}`);
      }

      remove(carsArray, (c) => {
        return c.id === deletedCar.id;
      });

      return deletedCar;
    },
  },
};

export { typeDefs, resolvers };
