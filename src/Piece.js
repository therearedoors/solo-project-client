import {React, useState, useRef, useEffect} from 'react'
import {getPositions,getCoords} from './validPositions';

export default function Piece ({value, piece}) {
    const [position,setPosition] = useState(getCoords(value));
    //useEffect(()=>setPosition())
    //const [refPosition,setRefPosition] = useState({});

    function dragMouseDown(e) {
        const elmnt = document.getElementById(value);
        //setRefPosition(getPositions(elmnt.offsetTop,elmnt.offsetLeft))
        //console.log(elmnt.offsetTop,elmnt.offsetLeft,)
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        e = e || window.event;
        //e.preventDefault();
  
        function elementDrag(e) {
            console.log("event: ",e,"win: ",window.event)
            e = e || window.event;
            console.log(e)
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            const targetY = elmnt.offsetTop - pos2
            const targetX = elmnt.offsetLeft - pos1
            setPosition(getPositions(targetX,targetY))
          }
  
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        
        document.onmouseup = null;
        document.onmousemove = null;
      }

    return <img src={piece} className={'piece'} onMouseDown={dragMouseDown} style={position} id={value} ></img>
}