import React, { useState } from 'react'
import { Group, Path, Transformer } from 'react-konva';
import useImage from 'use-image';

export const PathShape = ({
  element, setIsDragging, editDimensionsOfPath, editPositionOfElement, selectedId, setSelectedId, editDimensionsOfElement, stageDimensions
}) => {
  const [isMouseOver, setIsMouseOver] = useState(false)
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const [image, status] = useImage(element.fillPatternImage, 'Anonymous');
  const [counter, setCounter] = useState(0)


  const [elemento, setElement] = useState(element)

  React.useEffect(() => {
    if (selectedId == element.id && element.isLocked == false) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  React.useEffect(() => {
    let temp = counter + 2;
    setCounter(temp)

  }, [element.fillPatternOffsetX, element.fillPatternOffsetY,element.fillPatternRotation, element.isLocked]);



  /////////////////////////

  ////////////////////////




  return (
    <React.Fragment>



      <Path
        ref={shapeRef}

        key={counter}
        draggable={element.isLocked ? false : true}

        x={element.x}
        y={element.y}
        id={element.id}

        name={element.id.toString()}
        stroke={element.strokeColor}
        strokeWidth={element.strokeWidth}
        width={element.width}
        rotation={element.rotation}
        height={element.height}
        scaleX={element.scaleX}
        scaleY={element.scaleY}
        fill={element.fill !== null ? element.fill : undefined}
        fillPatternImage={image}
        fillPatternRepeat="no-repeat"
        fillPatternScaleX={element.fillPatternScaleX}
        fillPatternScaleY={element.fillPatternScaleY}
        fillPatternRotation={element.fillPatternRotation}

        opacity={element.opacity}


        fillPatternOffset={{ x: element.fillPatternOffsetX + (element.width / 2), y: element.fillPatternOffsetY + (element.height / 2) }}
        onMouseOver={(event) => {
          setIsMouseOver(true)
        }}

        onMouseLeave={(event) => {
          setIsMouseOver(false)
        }}

        onClick={(event) => {
          setSelectedId(element.id);

          if (!element.isLocked) {
          //  event.target.moveToTop();
           // trRef.current !== null && trRef.current.moveToTop();
          }
        }}
        onTap={(event) => {

          setSelectedId(element.id);

          if (!element.isLocked) {
          //  event.target.moveToTop();
        //    trRef.current !== null && trRef.current.moveToTop();
          }
        }}

        onDragMove={(event) => {
          setIsDragging(true)
     //     event.target.moveToTop()
        }
        }
        onDragStart={(event) => {
          setIsDragging(true)
        }}
        onDragEnd={(event) => {
          editPositionOfElement(element.id, event)
          setIsDragging(false)

        }}
        onTransformStart={(e) => {
          setIsDragging(true)

        }}
        onTransform={
          (e) => {

            editPositionOfElement(element.id, e)

          }
        }
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          editDimensionsOfPath(element.id, scaleX, scaleY)

        }}
        data={element.data}
      />


      {selectedId == element.id && (
        <Transformer
          ref={trRef}
          onClick={(event) => {
          //  event.target.moveToTop()

          }}

          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />

      )}


    </React.Fragment>
  )
}
