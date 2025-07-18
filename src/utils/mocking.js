import { faker } from '@faker-js/faker';

export const generateMockPet = () => {
    return {
        name: faker.animal.dog(),
        specie: faker.helpers.arrayElement(['dog', 'cat', 'bird']),
        birthDate: faker.date.past(),
        adopted: false,
        owner: null,
        image: faker.image.animals()
    };
};

export const generateMockPets = (count = 100) => {
    const pets = [];
    for (let i = 0; i < count; i++) {
        pets.push(generateMockPet());
    }
    return pets;
};


export const generateMockUser = () => {
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: "coder123",
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: [] 
    };
};

export const generateMockUsers = (count = 50) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push(generateMockUser());
    }
    return users;
};