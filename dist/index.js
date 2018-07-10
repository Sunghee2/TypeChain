"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Human {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
const lynn = new Human("Sunghee", 24, "female");
const sayHi = (person) => {
    return `Hello ${person.name}, you are ${person.age}, you ar a ${person.gender}`;
};
console.log(sayHi(lynn));
//# sourceMappingURL=index.js.map