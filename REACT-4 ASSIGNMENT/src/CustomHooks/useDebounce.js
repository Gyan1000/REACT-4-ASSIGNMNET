function useDebounce(cb,delay_time=200)
{
     let timerId;
     
     return(...args)=>{

        console.log("call_back args",...args);
        
        clearTimeout(timerId);
        timerId=setTimeout(()=>{
            cb(...args);
        },delay_time)
     }
}

export default useDebounce;