import React, { useState } from 'react'
import { Image, Line, Transformer } from 'react-konva';
import useImage from 'use-image';

export const ImageField = ({
  element, setIsDragging, editPositionOfElement, selectedId, setSelectedId, editDimensionsOfElement, addHelperLine, stageDimensions
}) => {
  const [image] = useImage(element.src);
  
  const [isMouseOver, setIsMouseOver] = useState(false)
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  const [elemento, setElement] = useState(element)

  React.useEffect(() => {
    if (selectedId == element.id) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
    if(image !== undefined ){
      image.crossOrigin="anonymous"
    }
 
  }, [selectedId]);



  /////////////////////////


  ////////////////////////





  return (
    <React.Fragment>

      <Image
      
        ref={shapeRef}
        image={ image}
        draggable
        x={element.x}
        y={element.y}
        name={element.id}
        stroke={"grey"}
        strokeWidth={isMouseOver && element.id !== selectedId ? 1:0}
        width={element.width}
        rotation={element.rotation}
        height={element.height}
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
            //event.target.moveToTop();
            trRef.current !== null && trRef.current.moveToTop();
          }

        }}
        onTap={(event) => {
          setSelectedId(element.id);
          if (!element.isLocked) {
          //  event.target.moveToTop();
            trRef.current !== null && trRef.current.moveToTop();
          }
        }

        }

        onDragMove={(event) => {
          setIsDragging(true)

          event.target.moveToTop()


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
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            return newBox;
          }}
        />
      )}


    </React.Fragment>
  )
}
