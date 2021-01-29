import { useState } from 'react';
import { useAlert } from "react-alert";
import { Download } from "@styled-icons/bootstrap";
import { Close } from "@styled-icons/ionicons-sharp";

function InputFile() {
    const [upload, setUpload] = useState(undefined);
    const [drag, setDrag] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorName, setErrorName] = useState("");
    const alert = useAlert();

    function dragStartHandler(e) {
        e.preventDefault()
        setDrag(true)
    }

    function dragLeaveHandler(e) {
        e.preventDefault()
        setDrag(false)
    }

    function onDropHandler(e) {
        e.preventDefault()
        let file = e.dataTransfer.files[0]
        validateInput(file)
        setDrag(false)
        setUpload(file)
    }

    function handleUpload(e) {
        validateInput(upload)
        if(hasError){
            alert.error(errorName)
        } else{
            console.log(upload)
        }
    }

    function validateInput (e){
        let split = e.name.split(".");
        if (split[split.length - 1] !== "txt") {
            setHasError(true);
            setErrorName("Wrong file format");
          } else if (e.size > 1024 * 1024 * 10) {
            setHasError(true);
            setErrorName("File size larger than 10Mb");
          } else{
            setHasError(false);
            setErrorName("");
          }
    }
    
    return (
        <div className="input unselectable">
            <div className="input__content">
                {upload ?
                        //Файл заружен
                        <div className="loaded">
                            <Close onClick={() => setUpload(undefined)} className="loaded__cancel" />
                            <div className="loaded__name">
                                {upload.name}
                            </div>
                        </div>
                        : drag
                        //Дрoп файла
                        ? 
                        <div
                            onDragStart={e => dragStartHandler(e)}
                            onDragLeave={e => dragLeaveHandler(e)}
                            onDragOver={e => dragStartHandler(e)}
                            onDrop={e => onDropHandler(e)}
                            className="waiting-drop">
                            <Download className="waiting__icon" />
                            <label className="waiting__label-main">Drop to upload</label> 
                        </div>
                        //oснoвнoй
                        : 
                        <div
                            onDragStart={e => dragStartHandler(e)}
                            onDragLeave={e => dragLeaveHandler(e)}
                            onDragOver={e => dragStartHandler(e)}
                            className="waiting">
                            <Download className="waiting__icon" />
                            <label className="waiting__label-main">Drag file here</label>
                            <div className="waiting__sub-text"> 
                                <label className="waiting__label-sub">Or </label>
                                <label htmlFor="file" className="waiting__label-link"> choose a file</label>
                            </div>
                            
                        </div>}
            </div>
            {!upload ? 
            <input type="file" id="file" name="file" className="display-none" onChange={(e) => { setUpload(e.target.files[0]); validateInput(e.target.files[0]);  }} />
            : ""}
            <button className="input__upload" onClick={(e) => handleUpload(e)} disabled={upload ? false : true}>Upload</button> 
        </div>
    )
}

export default InputFile