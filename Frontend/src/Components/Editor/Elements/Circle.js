import React,{useState} from 'react'
import { Circle,Transformer } from 'react-konva';
import useImage from 'use-image';

export const CircleField = ({
  element,setIsDragging,editPositionOfElement,selectedId,setSelectedId,editDimensionsOfElement,addHelperLine,stageDimensions
}) => {
    const [isMouseOver,setIsMouseOver] = useState(false)
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    const [image, status] = useImage(element.fillPatternImage, 'Anonymous');
    const [counter ,setCounter] = useState(0)


    const [elemento,setElement]=useState(element)

    React.useEffect(() => {
        if (selectedId == element.id) {
          // we need to attach transformer manually
          trRef.current.nodes([shapeRef.current]);
          trRef.current.getLayer().batchDraw();
        }
      }, [selectedId]);
      
      React.useEffect(()=>{
        let temp = counter+2;
        setCounter(temp)
        
        },[element.fillPatternOffsetX,element.fillPatternOffsetY]);
  


   /////////////////////////

   
   ////////////////////////




    return (
        <React.Fragment>
          
        <Circle 
        
        key={counter}
        ref={shapeRef}
        draggable
        x={element.x}
        y={element.y}
        name={element.id}
        stroke={element.strokeColor}
        strokeWidth ={element.strokeWidth}
        width={element.width}
        rotation={element.rotation}
        height={element.height}
        fill={element.fill !==null  ? element.fill : undefined}
        fillPatternImage={ image}
        fillPatternRepeat="no-repeat"

        offsetX={-element.width/2}
        fillPatternOffset={  {x:  element.fillPatternOffsetX+ (element.width/2),y:element.fillPatternOffsetY+ ( element.height/2)}}
        fillPatternScale={1}
        onMouseOver={(event)=>{
            setIsMouseOver(true)
        }}

        onMouseLeave={(event)=>{
          setIsMouseOver(false)
      }}

        onClick={()=>{setSelectedId(element.id);}}
        onTap={()=>{setSelectedId(element.id);}}

        onDragMove={(event)=>{
          setIsDragging(true)

        //  event.target.moveToTop()

   
        }
      }
        onDragStart = {(event)=>{
            setIsDragging(true)
          }}
          onDragEnd ={(event)=>{
            editPositionOfElement(element.id,event)
            setIsDragging(false)

          }}
          onTransformStart={(e)=>{
            setIsDragging(true)
            
          }}
          onTransform={
            (e)=>{
       
              editPositionOfElement(element.id,e)

            }
          }
          onTransformEnd = {(e)=>{
            const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

             // we will reset it back
             node.scaleX(1);
             node.scaleY(1);

            var width = Math.max(5, node.width() * scaleX);
           var  height=   Math.max(node.height() * scaleY);
          editDimensionsOfElement(element.id,width,height) // node is the transformer we need to get its dimension and set it to the image
          setIsDragging(false)

          }}
        />


        {selectedId == element.id  && (
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
