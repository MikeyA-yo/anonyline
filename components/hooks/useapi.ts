"use client";

import { useCallback, useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAPI = (path:string, method?:method) => {
  if (!method) method = "GET";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [res, setRes] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
               if (error instanceof Error) setError(error.message);
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
               if (error instanceof Error) setError(error.message);
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
               if (error instanceof Error) setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        get();
    } else if (method === "POST" || method === "DELETE" || method === "PUT"){
        setRes(`You can't use this method: ${method} on initial hook initialization, use the run function`)
    }
  },[method, path])
  return { res, loading, error, run };
}
export default useAPI;
type method = "GET" | "POST" | "PUT" | "DELETE" ;