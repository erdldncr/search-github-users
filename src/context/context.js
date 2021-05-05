import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

export const GithubContext=React.createContext()

export function GithubProvider({children}){
const [githubUser,setGithubUser]=useState(mockUser)
const [repos,setRepos]=useState(mockRepos)
const [followers,setFollowers]=useState(mockFollowers)
//requestLoading
const [requests,setRequests]=useState(0)
const [isLoading,setIsLoading]=useState(false)
///error
const [error,setError]=useState({show:false,msg:''})

const searchGithubUser=async(user)=>{
    toggleError()
    setIsLoading(true)
    try{
        const res=await axios(rootUrl+'/users/'+user)
        const repos= await axios(rootUrl+'/users/'+user+'/repos?per_page=100')
        const followers =await axios(rootUrl+'/users/'+user+'/followers')
      
            setFollowers(followers.data)
            setRepos(repos.data)
            setGithubUser(res.data)
        
  
    }catch (err){
        console.log(err)
        toggleError(true,'there is no user with that username')
  
        setGithubUser([])
        setFollowers([])
        setRepos([])
    }   
    checkRequests()
    setIsLoading(false)    
        
}
///check rate
const checkRequests=()=>{
    axios(rootUrl+'/rate_limit')
    .then(res=>{
    setRequests(res.data.resources.core.remaining)
    if(res.data.resources.core.remaining===0){
        toggleError(true,'sorry you exceeded your hourly rate!')
    }
})
    .catch((err)=>console.log(err))
}
function toggleError(show=false,msg=''){
    setError({show,msg})
}
//request
useEffect(checkRequests,[])


return <GithubContext.Provider value={{githubUser,repos,followers,requests,error,searchGithubUser,isLoading}}>
    {children}

</GithubContext.Provider>
}