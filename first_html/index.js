
// create a nums object that stores numbers
let nums = {
    num1: 1,
    num2: 2
};

// add one to num1 and display it until it reached 10
while (nums.num1 < 10)
console.log(nums.num1),
nums.num1 += 1;

// create an array of colors
let colors = ['red', 'green', 'blue'];
console.log(colors)

function count(){
    nums.num2 += 1
    console.log(nums.num2);
}

count();

document.getElementById('nameButton').onclick = function (){
    let name = document.getElementById('name').value;
    document.getElementById('displayName').innerHTML = name;
}
