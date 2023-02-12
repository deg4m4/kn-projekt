import React,{useState} from 'react'

import { Text ,Transformer} from 'react-konva';

const TextField = ({index,element,setIsDragging,editPositionOfElement,setSelectedId,selectedId,editDimensionsOfElement}) => {
 
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const [isMouseOver,setIsMouseOver] = useState(false)
  
  React.useEffect(() => {
    if (selectedId == element.id) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
      
    }
  }, [selectedId,element]);
  

  return (
    <React.Fragment >
      
{selectedId == element.id  && (
        <Transformer
           ref={trRef}
           boundBoxFunc={(oldBox, newBox) => {
        
            return newBox;
          }}
        />
      )}
<Text
        ref={shapeRef}
        key={index}
       draggable
       x={element.x}
       y={element.y}
       height={element.height}
       width={element.width}
       rotation ={element.rotation}
       fontFamily={element.fontFamily}
       align={element.align}
       fontSize={element.fontSize}
       stroke={"grey"}
       strokeWidth ={isMouseOver && element.id !== selectedId && 1}
      type="text"
      fontStyle={element.fontStyle  ? element.fontStyle : 400}
      fill={element.fill}

       onClick={(event)=>{setSelectedId(element.id); 
        //   event.target.moveToTop();
        //  trRef.current.moveToTop();   
         }}
         onTap={(event)=>{setSelectedId(element.id); 
          //   event.target.moveToTop();
          //  trRef.current.moveToTop();   
           }}

       onDragStart = {()=>{
         setIsDragging(true)
       }}
       onDragEnd ={(event)=>{
         editPositionOfElement(element.id,event)

         setIsDragging(false)
       }}
       onTransformStart={(e)=>{
        setIsDragging(true)
        
      }}

      onMouseOver={(event)=>{
        setIsMouseOver(true)
    }}
    
    onMouseLeave={(event)=>{
      setIsMouseOver(false)
  }}


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
      
       text={element.text} />
    </React.Fragment>
        
    )
}

export default TextField
