import React from 'react'
import "./TemplateMsg.css"
import htmlToFormattedText from "html-to-formatted-text";

function TemplateMsg(props) {
    function getText(html){
        var divContainer= document.createElement("div");
        // divContainer.innerHTML = "text<br/>text";
        // return divContainer.textContent || divContainer.innerText || "";
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        let data= htmlToFormattedText(doc.body.outerHTML)
        return data; 
    }
  return (
     <div className='templateWrapper'>
         <div className='tempplateOmniwp right'>
        {getText(props.template)}
         </div>
      
     </div>
  )
}

export default TemplateMsg