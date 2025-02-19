"use client";

import { useCallback, useEffect, useState } from "react";

const useAPI = (path:string, method?:method, body?:any) => {
  if (!method) method = "GET";
  const [res, setRes] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const run = useCallback((path:string, method:method, body?:any)=>{
    if (method === "GET"){
        async function get(){
            setLoading(true);
            try {
                const res = await fetch(`/api/${path}`);
                if (!res.ok){
                    setError(res.statusText);
                }
                const data = await res.json();
                setRes(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        get();
    } else if (method === "POST" || method === "DELETE" || method === "PUT"){
        async function post(){
            setLoading(true);
            try {
                const res = await fetch(`/api/${path}`, {
                    method: method,
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!res.ok){
                    setError(res.statusText);
                }
                const data = await res.json();
                setRes(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        post();
    }
  }, []);
  useEffect(()=>{
    if (method === "GET"){
        async function get(){
            setLoading(true);
            try {
                const res = await fetch(`/api/${path}`);
                if (!res.ok){
                    setError(res.statusText);
                }
                const data = await res.json();
                setRes(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        get();
    } else if (method === "POST" || method === "DELETE" || method === "PUT"){
        setRes(`You can't use this method: ${method} on initial hook initialization, use the run function`)
    }
  },[])
  return { res, loading, error, run };
}
export default useAPI;
type method = "GET" | "POST" | "PUT" | "DELETE" ;