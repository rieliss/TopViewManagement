// var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
// console.log(arr);
// var removed = arr.splice(2, 2);
// console.log(removed);


// var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

// for (var i = 0; i < arr.length; i++) {

//     if (arr[i] === 5) {

//         arr.splice(i, 1);
//         console.log(arr);
//     }

// }

//=> [1, 2, 3, 4, 6, 7, 8, 9, 0]


// const arr = [{
//     "value": 10,
//     "id": "111",
//     "name": "BlackCat",
// }, {
//     "value": 10,
//     "id": "111",
//     "name": "BlackCat",
// }, {
//     "value": 15,
//     "id": "777",
//     "name": "WhiteCat",
// }];
// const combinedItems = (arr = []) => {
//     const res = arr.reduce((acc, obj) => {
//         console.log(obj)
//         let found = false;
//         for (let i = 0; i < acc.length; i++) {
//             if (acc[i].id === obj.id) {
//                 found = true;
//                 acc[i].count++;
//             };
//         }
//         if (!found) {
//             obj.count = 1;
//             acc.push(obj);
//         }
//         return acc;
//     }, []);
//     return res;
// }
// // console.log(combinedItems(arr));
// combinedItems(arr)

// const arr1 = [{ id: 1, name: 'John' }, { id: 2, name: 'Alice' }];
// const arr2 = [{ id: 3, name: 'Bob' }, { id: 4, name: 'Eve' }];

// const mergedArray1 = arr1.concat(arr2);

// console.log(mergedArray1);
// const mergedArray2 = [...arr1, ...arr2];

// console.log(mergedArray2);

// const arr1 = [
//     { id: 1, name: 'John' },
//     { id: 2, name: 'Alice' },
//     { id: 3, name: 'Bob' }
// ];

// const arr2 = [
//     { id: 2, age: 30 },
//     { id: 3, age: 25 },
//     { id: 4, age: 28 }
// ];

// const mergedArray = arr1.map((item) => {
//     const matchedObject = arr2.find((obj) => obj.id === item.id);
//     return { ...item, ...matchedObject };
// });

// console.log(mergedArray);

// function removeArrDuplicates(array) {
//     const uniqueArr = [];

//     for (let i = 0; i < array.length; i++) {
//         if (uniqueArr.indexOf(array[i]) === -1) {
//             uniqueArr.push(array[i]);
//         }
//     }
//     return uniqueArr;
// }

// const arr = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 5];
// const uniqueArr = removeArrDuplicates(arr);
// console.log(uniqueArr); // [1, 2, 3, 4, 5]


// const arr = [
//     {
//         name: 'Kate',
//         location: 'New York',
//     },
//     {
//         name: 'Mike',
//         location: 'New York',
//     },
//     {
//         name: 'Kate',
//         location: 'New York',
//     },
// ];

// const unique = [];
// for (const item of arr) {
//     // 👇 "name" and "location" used for duplicate check
//     const duplicate = unique.find(
//         (obj) => obj.location === item.location && obj.name === item.name
//     );
//     if (!duplicate) {
//         unique.push(item);
//     }
// }
// console.log(arr);
// console.log(unique);

// var aIn = new Array("A_0", "A_1", "A_2", "A.3", "A_4", "A_5", "A_6", "A_7");
// var aSum = new Array("B_0", "B_1", "B_2", "B_3", "B_4", "B_5", "B_6", "B_7");

// function SUMIF(aRange, sCriteria, aSum_Range) {
//     var fSum = 0;
//     for (i = 0; i < aRange.length; i++) {
//         if (this.getField(aRange[i]).value.toString() == sCriteria) {
//             fSum = fSum + Number(this.getField(aSum_Range[i]).value)
//         }
//     }

//     return fSum;
// }
// event.value = SUMIF(aIn, ">61", aSum);

let cart = [
    {
        name: "JavaScript book",
        quantity: 3,
        price: 4,
    },
    {
        name: "UGG Women's Hazel Ankle Boot",
        quantity: 2,
        price: 79,
    },
    {
        name: "OXO Good Grips 11-Inch Balloon Whisk",
        quantity: 5,
        price: 9,
    },
];

// totalPrice is 215

// let totalPrice = cart.reduce(function (accumulator, item) {
//     return accumulator + item.quantity * item.price;
// }, 0);

let totalPrice = cart
    .filter(
        (item) =>
            item.name === "JavaScript book" ||
            item.name === "UGG Women's Hazel Ankle Boot"
    )
    .reduce((accumulator, item) => {
        return accumulator + item.quantity * item.price;
    }, 0);

console.log(totalPrice)