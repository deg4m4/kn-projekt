import TextField from '../../Components/Editor/Elements/Text'
import React from 'react';
import { ImageField } from './Elements/Image';
import { Rectangle } from './Elements/Rectangle';
import { CircleField } from './Elements/Circle';
import { PathShape } from './Elements/Path';


// Function responsable in looping throu elements array and returning konva elements

export const  returnElements = (elements,setIsDragging,editPositionOfElement,selectedId,setSelectedId,editDimensionsOfElement,editDimensionsOfPath,stageDimensions,addHelperLine,removeHelper,addAllHelpersFromObjects,stageRef,layerRef) =>{
    var elementsToAdd =[]
    for (let index = 0; index < elements.length; index++) {
      
      if(elements[index].type == "text"){
        elementsToAdd.push(
          <TextField
               key={index}
               setSelectedId={setSelectedId} 
               selectedId={selectedId}
              element={elements[index]}
              setIsDragging={setIsDragging}
              editPositionOfElement={editPositionOfElement}
              editDimensionsOfElement={editDimensionsOfElement}

         />
        )
      }

      // Image

      if(elements[index].type == "image"){
        elementsToAdd.push(
           <ImageField 
           stageDimensions={stageDimensions}
           editDimensionsOfElement={editDimensionsOfElement}
           setSelectedId={setSelectedId} selectedId={selectedId} element={elements[index]} setIsDragging={setIsDragging} editPositionOfElement={editPositionOfElement} />
        )
      }

            // Image
            if(elements[index].type == "rectangle"){
              elementsToAdd.push(
                 <Rectangle 
                 stageDimensions={stageDimensions}
                 editDimensionsOfElement={editDimensionsOfElement}
                 setSelectedId={setSelectedId} selectedId={selectedId} element={elements[index]} setIsDragging={setIsDragging} editPositionOfElement={editPositionOfElement} />
              )
            }
            if(elements[index].type == "circle"){
              elementsToAdd.push(
                 <CircleField 
                 stageDimensions={stageDimensions}
                 editDimensionsOfElement={editDimensionsOfElement}
                 setSelectedId={setSelectedId} selectedId={selectedId} element={elements[index]} setIsDragging={setIsDragging} editPositionOfElement={editPositionOfElement} />
              )
            }
            if(elements[index].type == "path"){
              elementsToAdd.push(
                 <PathShape 
                 editDimensionsOfPath={editDimensionsOfPath}
                 stageDimensions={stageDimensions}
                 editDimensionsOfElement={editDimensionsOfElement}
                 setSelectedId={setSelectedId} selectedId={selectedId} element={elements[index]} setIsDragging={setIsDragging} editPositionOfElement={editPositionOfElement} />
              )
            }
    }
    return elementsToAdd
}