/*
Have the function MovingMedian(arr) read the array of numbers stored in arr which 
will contain a sliding window size, N, as the first element in the array and the rest will 
be a list of numbers. 
Your program should return the Moving Median for each element based on the element and its N-1 predecessors, 
where N is the sliding window size. 
The final output should be a string with the moving median corresponding to each entry in the original array separated by commas.

Note that for the first few elements (until the window size is reached), the median is computed on a smaller number of entries. 
For example: if arr is [3, 1, 3, 5, 10, 6, 4, 3, 1] then your program should output "1,2,3,5,6,6,4,3".

Input: [3, 0, 0, -2, 0, 2, 0, -2]
Output: 0,0,0,0,0,0,0

Input: [5, 2, 4, 6]
Output: 2,3,4

*/

function movingMedian(arr){
    const n = arr[0]
    const data = arr.slice(1)
    const output = []
    for (let i=0;i<data.length;i++){
        const startIndex = Math.max(0,i-(n-1))
        const nextMedianArr = data.slice(startIndex,i+1)
        const midPoint = nextMedianArr.length/2
        nextMedianArr.sort((a,b)=>a-b)
        console.log(nextMedianArr,midPoint)
        if (nextMedianArr.length%2 === 1) output.push(nextMedianArr[Math.floor(midPoint)])
        if (nextMedianArr.length%2 === 0) output.push((nextMedianArr[midPoint]+nextMedianArr[midPoint-1])/2)
    }
    return output.join(',')
}

console.log(movingMedian([5, 2, 4, 6]))
console.log(movingMedian([3, 0, 0, -2, 0, 2, 0, -2]))