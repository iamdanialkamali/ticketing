class Person {
    constructor(name ='Anonymous' , age = 0){
        this.name = name;
        this.age = age ;
    }
    getGreeting(){
        return `Hi. I am ${this.name}!`
    }
    getDescription(){
        return `${this.name} is ${this.age} year(s) old.`
    }
}

class Traveler extends Person{
    constructor(name , age , homeLocation ){
        super(name,age);
        this.homeLocation = homeLocation;
    }
    getGreeting(){
        let greeting = super.getGreeting();
        if (this.homeLocation){
            greeting += `I'm visiting from ${this.homeLocation}.`;
        }
    return greeting;
    }
}


const me = new Traveler('Amir' , 20 , 'Amesterdam');
console.log(me.getGreeting())

const other = new Traveler();
console.log(other.getGreeting())