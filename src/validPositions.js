const validPositions = {
    'top': [60, 126, 191,258,327,395,460,528],
    'left': [33, 100, 167, 233, 301, 373, 435, 501]
}

const positionMap = {
    'a': 33,
    'b': 100,
    'c': 167,
    'd': 233,
    'e': 301,
    'f': 373,
    'g': 435,
    'h': 501,
    '1': 528,
    '2': 460,
    '3': 395,
    '4': 327,
    '5': 258,
    '6': 191,
    '7': 126,
    '8': 60
}

function findClosest(arr,goal){
    return arr.reduce((prev,curr)=>Math.abs(curr-goal) < Math.abs(prev - goal) ? curr : prev )
}

function getPositions (targetX,targetY) {
    const posX = findClosest(validPositions.top,targetX)
    const posY = findClosest(validPositions.left,targetY)
    console.log("posY",posY,"X",posX)
    return ({'top': `${posX}px`, 'left': `${posY}px`});

}

function getCoords (key){
    return {'top': positionMap[key[1]], 'left': positionMap[key[0]]}
}

module.exports = {
    getPositions,
    getCoords
}