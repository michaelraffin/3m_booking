import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const networkService = async (callback,identifier)=>{
        try {
            return   await callback()
        } catch (error) {
            console.log (' ERROR ','----', identifier,'----' , error)
        }
}

const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      // 'https://booking.3mevents.com/authLogin'
      'http://192.168.1.148:3000/authLogin'
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
    return url
  }

export const getSession = async ()=>{
  return  await networkService(()=> {
    // const { data: { user } } = await supabase.auth.getUser() 
      return supabase.auth.getUser()
  })
  }



  export const getProfile = async ()=>{
    let id = localStorage.getItem('uuid').toString()

    return  await networkService(()=> {
        return supabase
        .from('profile')
        .select()
        .eq('id',id)
    })
    }
  
  
  



export const getUser =async()=>{
  try {
    const { data, error } = await supabase.auth.getSession()
    return data
  } catch (error) {
    return null
  }
}

export const signinAuth= async()=>{
   const {data,error}  = await networkService(()=> {
        return supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo:'http://192.168.1.148:3000/authLogin',
              }
          },)}
          ,'signInWithOAuth')

}
