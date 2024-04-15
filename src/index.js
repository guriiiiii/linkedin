/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */

var candies = [2,3,5,1,3]
var extraCandies = 3
var kidsWithCandies = function(candies, extraCandies) {
    var previous =0
    var greatest = 0

    for(let i =0;i!=candies.length;i++){
        if(candies[i]>previous){
            greatest = candies[i]
            previous = candies[i]
        }
        console.log(greatest)
    }

    var result =[]

    for(let i =0;i!=candies.length;i++){
        if(candies[i]+extraCandies>=greatest){
            result[i]=true
        }
        else{
            result[i]=false
        }
    }
    return result
};

console.log(kidsWithCandies(candies,extraCandies))