import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import {toast} from 'react-toastify'

const useTakePart = ({id, session, table, id_name, row, is_event}) => {
    const [takePart, setTakePart] = useState(false);

    useEffect(()=>{
        if (!session || !is_event) return;
        supabase.from(table)
        .select()
        .eq(id_name, id)
        .then(({data, error})=>{
            if (data && data.length>0) setTakePart(true);
            if (error) toast.error("Błąd pobierania zaznaczeń wydarzeń! Sprawdź połączenie z internetem.")
        })

    }, [session, table, id, is_event])

    const takePartHandler = async (e) => {
            if (!session || !is_event) return;
            if(e.target.checked){
                await supabase
                .from(table)
                .insert([
                    row
                ]).then(({error})=>{
                    if (error){
                        console.log(error);
                        toast.error("Nie udało się zaznaczyć udziału! - Błąd komunikacji. Sprawdź połączenie z Internetem")
                    }
                    else{
                        toast.success("Pomyślnie zaznaczono udział")
                        setTakePart(true);
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
                    if (error){
                        console.log(error);
                        toast.error("Nie udało się odnznaczyć udziału! - Błąd komunikacji. Sprawdź połączenie z Internetem")
                    }
                    else{
                        setTakePart(false);
                        toast.success("Pomyślnie odnznaczono udział")
                    }
                })
            }
    }

    return {takePart, takePartHandler}
}
 
export default useTakePart;