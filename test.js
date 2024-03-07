//console.log("Chuck Test JS Node Module");

//Write a function that will be given an array of numbers, 
//and returns the sum of all numbers that follow an even number in the array.

console.log(sumnumbers([1,3,5,2,1,2,3]));

function sumnumbers(arrNum){
    let tmpIndex = -1;
    arrNum.forEach((element, index) => {if (element % 2 == 0  && tmpIndex == -1) 
        {tmpIndex = index};})
    arr2 = arrNum.slice(tmpIndex + 1);
    console.log("Here " + arr2);
    
    let vint2 = 0;
    for (let vint=0; vint < arr2.length; vint++) {
        vint2 += arr2[vint]
    }
    return vint2;
        

}