import styles from './Content.module.css'
import {useState, useEffect} from 'react'

const Content = ({text, defaultSizeToDisplay}) => {
    const textSizeOverDefault = () => (text.length>defaultSizeToDisplay);
    const [showAll, setShowAll] = useState(!textSizeOverDefault());
    const [contentToDisplay, setContentToDisplay] = useState('');
    const setEntireTextVisibility = (e, val) => {
        setShowAll(val);
        e.preventDefault();
    }

    useEffect(()=>{
        setContentToDisplay(showAll ? text : text.substring(0,defaultSizeToDisplay));
    },[showAll, text])

    useEffect(()=>{
        setShowAll(!textSizeOverDefault());
    },[text, defaultSizeToDisplay])

    return ( 
            <>
                {contentToDisplay}
                {!showAll && (
                    <a className={styles.textSizeControll} 
                    href='#' 
                    onClick={(e) => setEntireTextVisibility(e, true)}>...</a>
                )}
                {showAll && textSizeOverDefault() && (
                    <a className={styles.textSizeControll} 
                    href='#' 
                    onClick={(e) => setEntireTextVisibility(e, false)}> Ukryj </a>
                )}
            </>
     );
}
 
export default Content;