import { randomIndex, unique } from "../utility/array";

const maleNames: string[] = [
    "Mohamed","Abdullah","Ahmed","Ali","Yousouf","Omar","Adam","Abd",
    "Khaled","Fahd","David","Lavi","Ariel","Yosef","Noam","Uri",
    "Refael","Ari","Moshe","Yehuda","Mateo","Bautista","Juan",
    "Felipe","Bruno","Noah","Benicio","Thiago","Ciro","Liam","Miguel",
    "Arthur","Gael","Heitor","Theo","Davi","Gabriel","Bernardo",
    "Samuel","João Miguel","Noah","Jackson","Liam","Lucas","Oliver",
    "Leo","Benjamin","Theo","Jack","Aiden","Jayden","Aiden","Joshua",
    "Daniel","Nathaniel","Nathan","Malachi","Liam","Kyle","Santiago",
    "Mateo","Sebastián","Leonardo","Matías","Emiliano","Diego","Ángel",
    "Daniel","Alexander","Liam","Noah","Oliver","Elijah","James",
    "William","Benjamin","Lucas","Henry","Theodore","Aleksandar","Georgi",
    "Martin","Kaloyan","Boris","Dimitar","Teodor","Daniel","Ivan","Nikola",
    "Viktor","Martín","Hugo","Mateo","Leo","Lucas","Manuel","Daniel",
    "Alejandro","Pablo","Álvaro","Hiro","Teiki","Teiva","Tehei","Ioane",
    "Tapuarii"
];
const femaleNames: string[] = [
    "Maryam","Fatima","Lyn","Hur","Lian","Maria","Malak","Nur","Mila",
    "Farah","Emma","Olivia","Martina","Isabella","Alma","Catalina","Mia",
    "Ámbar","Victoria","Delfina","Martha","Roxana","Ana Maria",
    "Elizabeth","Sonia","Juana","Patricia","Lidia","Rosmery","Carmen",
    "Helena","Alice","Laura","Maria Alice","Valentina","Heloísa",
    "Maria Clara","Maria Cecilia","Maria Julia","Sophia","Amelia",
    "Sophia","Olivia","Aria","Emma","Chloe","Zoey","Mila","Lily","Mia",
    "Amelia","Arianna","Ariana","Kaira","Gabrielle","Gabriella",
    "Brianna","Mia","Adrianna","Savannah","Olivia","Emma","Charlotte",
    "Amelia","Ava","Sophia","Isabella","Mia","Evelyn","Harper","Hanna",
    "Anna","Zoé","Léna","Luca","Emma","Zsófia","Boglárka","Lili","Mira",
    "Lucía","Martina","Sofía","María","Valeria","Julia","Paula","Emma",
    "Daniela","Carla","Tiare","Hinano","Poema","Maeva","Hina","Vaea",
    "Moea","Moeata","Tarita","Titaina","Teura","Heikapu","Mareva"
];
const surnames: string[] = [
    "Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Garcia",
    "Rodriguez","Wilson","Martinez","Anderson","Taylor","Thomas","Hernandez",
    "Moore","Martin","Jackson","Thompson","White","Lopez","Lee","Gonzalez",
    "Harris","Clark","Lewis","Robinson","Walker","Perez","Hall","Young",
    "Abadi","Amin","Asghar","Hoffman","Hussain","Iqbal","Goldmann","Blau",
    "Ivanov","Petrov",'Vasilev','Sidorov','Kuznetsov','Kovalev','Sokolov',
];
function randomName(gender: 'male' | 'female'): string {
    let nameIndices: number[] = [];
    let names: string[] = [];
    const nameLength = 1 + (Math.random() > 0.95? 2: Math.random() < 0.05? 0: 1);
    if(gender === 'male') {
        while(nameIndices.length < nameLength) {
            nameIndices = nameIndices.concat(randomIndex(maleNames)).filter(unique);
        }
        names =  nameIndices.map(i => maleNames[i]);
    } else {
        while(nameIndices.length < nameLength) {
            nameIndices = nameIndices.concat(randomIndex(femaleNames)).filter(unique);
        }
        names =  nameIndices.map(i => femaleNames[i]);
    }
    names.push(surnames[Math.floor(Math.random() * surnames.length)]);
    if(Math.random() < 0.05) names.push(surnames[Math.floor(Math.random() * surnames.length)]);
    return names.join(" ");
}
export { randomName };