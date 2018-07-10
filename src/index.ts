interface Human {
    name: string,
    age: number,
    gender: string
}

const person = {
    name: "Sunghee",
    age: 24,
    gender: "female"
};

const sayHi = (person: Human): string => {
    return `Hello ${person.name}, you are ${person.age}!~, you ar a ${person.gender}`;
}

console.log(sayHi(person));

export {};
