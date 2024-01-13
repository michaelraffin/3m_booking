"use client" 
import React, { useEffect } from 'react';
import { Loader2 } from "lucide-react"
import { useUrl } from 'nextjs-current-url';
import { useRouter ,useSearchParams} from 'next/navigation'
import {getSession,getProfile} from '../../Utils/login_service'
export default function Auth() {
    const { href: currentUrl, pathname } = useUrl() ?? {};
    const router = useRouter();
    useEffect(() => {
        const accessToken =  `${currentUrl}`
        const access_token = new URLSearchParams(accessToken.split('#')[1]).get('access_token');
        const provider_token = new URLSearchParams(accessToken.split('#')[1]).get('provider_token');
        const refresh_token = new URLSearchParams(accessToken.split('#')[1]).get('refresh_token');
      console.log('GGGG accessToken',accessToken)
      console.log('GGGG provider_token',provider_token)
        localStorage.clear()
        localStorage.setItem('access_token', `${access_token}`);
        localStorage.setItem('provider_token', `${provider_token}`);
        localStorage.setItem('refresh_token', `${refresh_token}`);
        localStorage.setItem('uuid', `${refresh_token}`);

      console.log('welcome to auth')

        getSession().then((e)=>{
          console.log(e)
          localStorage.setItem('uuid', `${e.data.user.id}`);
                
      getProfile().then((e) =>{
        let user = e.data[0]
        localStorage.setItem('user_profile', JSON.stringify(user));


        if(user.user_details === null){
  router.push('/');
        }else {
  router.push('/');
        }
        console.log(e.data)
      })
      })
      





        //Redirect when Profile is empty
        // setTimeout(() => {
          
        //     router.push('/redirect');
        //   }, 3000);
     
    })

    return (<>
    <div className='text-lg col-auto ml-4 '>
    <div className="h-56 grid grid-cols-3 gap-4 content-center place-items-center ">
  <div></div>
  <div className='justify-center place-items-center'> Authenticating.... <Loader2 className="mr-2 h-4 w-4 animate-spin" /></div>
  <div></div>
</div>
​

  
    </div>
    </>)
}
