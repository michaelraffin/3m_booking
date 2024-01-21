"use client"
import React, { useEffect } from 'react';
import { Loader2 } from "lucide-react"
import { useUrl } from 'nextjs-current-url';
import { useRouter, useSearchParams } from 'next/navigation'
import { getSession, getProfile } from '../../Utils/login_service'

import { axios, productStats } from "@/Utils/axios"
export default function Auth() {
  const { href: currentUrl, pathname } = useUrl() ?? {};
  const router = useRouter();



  async function recordProductStats(e: any, date: any) {
    try {

      const data = { storeOwner: '3MVisual', cType: '3m Visual Booking Page', cName: "website", "data": date, "date": new Date(), action: e }
      const response = await productStats.put('/Items', data)
      return response

    } catch (error) {
      console.log('error recordProductStats', error)
    }
  }
  useEffect(() => {
    try {
      localStorage.clear()
      const accessToken = `${currentUrl}`
      const access_token = new URLSearchParams(accessToken.split('#')[1]).get('access_token');
      const provider_token = new URLSearchParams(accessToken.split('#')[1]).get('provider_token');
      const refresh_token = new URLSearchParams(accessToken.split('#')[1]).get('refresh_token');

      
      localStorage.setItem('access_token', `${access_token}`);
      localStorage.setItem('provider_token', `${provider_token}`);
      localStorage.setItem('refresh_token', `${refresh_token}`);
      localStorage.setItem('uuid', `${refresh_token}`);

      console.log('welcome to auth')

      getSession().then((e) => {
        console.log(e)
        localStorage.setItem('uuid', `${e.data.user.id}`);
        getProfile().then((e) => {
          let user = e.data[0]
          localStorage.setItem('user_profile', JSON.stringify(user));

          console.log(e.data)
          // storePayload(e.data)
          // if (user.user_details === null) {
            router.push('/');
          // } else {
          //   router.push('/');
          // }
        })
      })
    } catch (error) {
      console.log('account setup ', error)
    }






    //Redirect when Profile is empty
    // setTimeout(() => {

    //     router.push('/redirect');
    //   }, 3000);

  })


  const storePayload = (payloads: any) => {
    try {
      localStorage.setItem('userCache', JSON.stringify(payloads))
      // recordProductStats(`3mCustomer`, payloads)
    } catch (error) {
      console.log('storePayload',error)
    }
  }


  return (<>
    <div className='text-lg col-auto ml-4 '>
      <div className="h-56 grid grid-cols-3 gap-4 content-center place-items-center ">
        <div></div>
        <div className='justify-center place-items-center'> Authenticating.... <Loader2 className="mr-2 h-4 w-4 animate-spin" /></div>
        <div></div>
      </div>
    </div>
  </>)
}
