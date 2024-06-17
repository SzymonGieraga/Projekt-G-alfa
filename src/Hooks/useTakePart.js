import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

const useTakePart = ({id, session, table, data, id_name, row}) => {
    const [takePart, setTakePart] = useState(false);

    useEffect(()=>{
        if (!session) return;
        supabase.from(table)
        .select()
        .eq(id_name, data.id)
        .then(({data})=>{
            if (data && data.length>0) setTakePart(true);
        })

    }, [session, table, id])

    const takePartHandler = async (e) => {
            if (!session) return;
            setTakePart(e.target.checked)
            if(e.target.checked){
                await supabase
                .from(table)
                .insert([
                    {user_id:session.user.id, event_id:data.id}
                ]).then(({error})=>{
                    if (error){
                        console.log(error);
                    }
                })
            }
            else{
                await supabase
                .from(table)
                .delete()
                .eq('user_id', session.user.id)
                .eq(id_name, id)
                .then(({error}) => {
                    if (error) console.log(error);
                })
            }
    }

    return {takePart, takePartHandler}
}
 
export default useTakePart;