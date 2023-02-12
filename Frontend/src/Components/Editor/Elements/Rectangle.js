import React, { useState } from 'react'
import { useEffect } from 'react';
import { Rect, Transformer } from 'react-konva';
import useImage from 'use-image';

export const Rectangle = ({
  element, setIsDragging, editPositionOfElement, selectedId, setSelectedId, editDimensionsOfElement, addHelperLine, stageDimensions
}) => {
  const [isMouseOver, setIsMouseOver] = useState(false)
  const [counter, setCounter] = useState(0)

  const [image, status] = useImage(element.fillPatternImage, 'Anonymous');

  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (selectedId == element.id && element.isLocked == false) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId,]);

  React.useEffect(() => {
    let temp = counter + 2;
    setCounter(temp)

  }, [element.fillPatternOffsetX, element.fillPatternOffsetY,element.fillPatternRotation, element.isLocked]);

  /////////////////////////
  ////////////////////////
  return (
    <React.Fragment>
      <Rect
        key={counter}
        ref={shapeRef}
        draggable={element.isLocked ? false : true}
        x={element.x}
        y={element.y}
        name={element.id}
        stroke={element.strokeColor}
        strokeWidth={element.strokeWidth}
        width={element.width}
        rotation={element.rotation}
        height={element.height}
        cornerRadius={element.cornerRadius}
        fill={element.fill !== null ? element.fill : undefined}
        fillPatternImage={image}
        fillPatternOffset={{ x: element.fillPatternOffsetX, y: element.fillPatternOffsetY }}
        fillPatternRepeat="no-repeat"
        fillPatternScaleX={element.fillPatternScaleX}
        fillPatternScaleY={element.fillPatternScaleY}
        fillPatternRotation={element.fillPatternRotation}
        opacity={element.opacity}


        onMouseOver={(event) => {
          setIsMouseOver(true)
        }}

        onMouseLeave={(event) => {
          setIsMouseOver(false)
        }}

        onClick={(event) => {
          setSelectedId(element.id);

          if (!element.isLocked) {
            // event.target.moveToTop();
            // trRef.current !== null && trRef.current.moveToTop();
          }

        }
        }
        onTap={(event) => {
          setSelectedId(element.id);

          if (!element.isLocked) {
            // event.target.moveToTop();
            // trRef.current !== null && trRef.current.moveToTop();
          }

        }
        }
        onDragMove={(event) => {
          // event.target.moveToTop()
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
          setIsDragging(true);
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

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);

          var width = Math.max(5, node.width() * scaleX);
          var height = Math.max(node.height() * scaleY);
          editDimensionsOfElement(element.id, width, height) // node is the transformer we need to get its dimension and set it to the image
          setIsDragging(false)

        }}
      />


      {selectedId == element.id && (
        <Transformer
          name={counter}
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }
          }
        />
      )}


    </React.Fragment>
  )
}
