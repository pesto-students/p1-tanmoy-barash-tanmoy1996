// class Person{
//     constructor(name){
//         this.name = name;
//     }
// }

// class Teacher extends Person{
//     constructor(name){
//         super(name);
//     }
//     teach(subject){
//         console.log(`${this.name} is now teaching ${subject}`);
//     }
// }


function Person(name){
    this.name = name;
}

function Teacher(name, subject){
    Person.call(this, name);
    this.subject = subject;
}

Teacher.prototype.teach = function(subject){
    console.log(`${this.name} is now teaching ${subject}`);
}

var him = new Teacher('Arfat');
him.teach('JavaScript');