import {useState, useLayoutEffect, useRef} from 'react'

const useTextArea = (min_textarea_height) => {
    const textareaRef = useRef(null);
    const [value, setValue] = useState("");
    const onChange = (event) => setValue(event.target.value);

    useLayoutEffect(() => {
        // Reset height - important to shrink on delete
        textareaRef.current.style.height = "inherit";
        // Set height
        textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        min_textarea_height
        )}px`;
    }, [value]);
    return {value, textareaRef, onChange};
}
 
export default useTextArea;