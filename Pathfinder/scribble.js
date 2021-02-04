var dict = {};
const a = {
    'something': 1,
    'some other thing': 2
};
const b = {
    'something1': 1,
    'some other thing': 2
};
const c = {
    'something2': 1,
    'some other thing': 2
};
const grid = ['1','2','3']

// grid.forEach((element)=>{
//     dict[element] = Infinity
// })
// let i = 0;
// for (var key in dict){
//     console.log(key, dict[key])
//     i++;
// }
// console.log(`The value of i is ${i}`)

for (var element in grid){
    dict[grid[element]] = a;
}
console.log(dict)