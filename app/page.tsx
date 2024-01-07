"use client"
import React, { useEffect, useState,useRef } from 'react';
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { isSameDay } from 'date-fns';
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import moment from "moment"
import { axios } from "@/Utils/axios"
import { DateRange } from 'react-day-picker';
const css = `

  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border-radius: 25px;
    background-color:black;
    
    color: white;
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) {
    border-color: black;
    background-color:#eebd43;
    
    color: white;
    border-radius: 25px;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: red;
    border-radius: 25px;
    
  }
  
`;
// #eebd43

export default function Home() {
  const [date, setDate] = useState<DateRange>({from:new Date(),to: new Date()});
  
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [products, setProduct] = useState<[{id: String | null; title: String | null,price:number;subtitle:String | null}]>([{
    id:null,
    title:null,
    price:0,
    subtitle:null
  }]);
  const [status, setStatus] = useState(false)
  const [selectedService, setSelectedService] = useState<{
    title: String | null;id:String | null; price: number
}>({ title:null,id: null, price: 0 })

  const scrollRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  

  

  useEffect(() => {

  }, [products])

  const clearDate=()=>{
    setSelectedService({title:null, id: null, price: 0 })
    setProduct([{id: null, title:null,price:0,subtitle:null}])
    setDate(null);

  }
  const didTappSearch = () => {


    try {
      setStatus(true)
      fetchProduct().then(items => {
        setStatus(false)
        let results = items.results
        let availableSelection = results[0].productPicker
        
        if (availableSelection.items) {



          // if (availableSelection.lenght >= 1) {
          //   console.log('Moree')
          setProduct(availableSelection.items)
          setTimeout(() => {
            if (scrollRef.current) {
              scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }, 500);
          
          
 
          // } else {
          //   console.log('not found')
          //   setProduct(results)
          // }
        }
        

      })

      
    } catch (error) {
      console.log('error in didTapped', error)
    }

  }

  const displayFirstLastDate = () => {
    try {
      if (date != undefined) {
        return (<>
          <div className="flex flex-col gap-2 mt-4 ...">
            <div><Badge variant="outline">{moment(date.from).format('LL')}</Badge></div>
            <div><Badge variant="outline">{moment(date.to).format('LL')}</Badge></div>
          </div>
        </>)
      }



    } catch (error) {
      return null
    }
  }


  async function fetchProduct() {
    try {
      const data = {
        id: "Visual", queryType: "filter", storeOwner: "60b1c9a9a001ef1e463d52c2",
        "isAPI": true, "showLimit": true, "number": 8, "deliveryDate": moment(date.from).format('YYYY-MM-DD')
      }


      const response = await axios.post('/productV2/Product', data)
      return response.data
    } catch (error) {
      console.log('errorr', error)
    }
  }


  
  const didTappedService=(item:any)=>{
    try {
      
      setSelectedService(item)
      setTimeout(() => {
        if (cartRef.current) {
          cartRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } catch (error) {
      
    }
  }
  type YourItemType = {id: String | null; title: String | null,price:number,subtitle:String | null}
  const renderServices = () => {
    try {
      let items = [<></>]

      products.map((item:YourItemType, _index: number) => {
        let isActive = selectedService.id === item.id
        items.push(
          <a href="javascript:void(0);" onClick={() => didTappedService(item)}>
            <article className={`rounded-lg border ${isActive ? ' border-gray-300 bg-black p-6' : ' border-gray-300 bg-white p-6'} hover:shadow-lg`}>
              <div>
                <p className={`text-sm ${isActive ? 'text-white' : 'text-black'}`}>Price</p>

                <p className={`text-2xl font-medium ${isActive ? 'text-white' : 'text-black'}`}>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(item.price)}<span className='text-xs'>/Day</span></p>
              </div>

              <div className="mt-1 flex gap-1 text-green-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>

                <p className="flex gap-2 text-xs">
                  {/* <span className="font-medium"> 67.81% </span> */}

                  <span className={`text-xs ${isActive ? 'text-white' : 'text-black'}`}> {item.subtitle} </span>
                </p>
              </div>
            </article>
          </a>
        )
      })
      return items
    } catch (error) {
      console.log("error rendering", error)
    }
  }
  const getBookNowTitle = () => {
    try {
      return <>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(selectedService.price)} Book now</>
    } catch (error) {
      return <>Book now</>
    }
  }
  const renderCartComponent = () => {
    try {
      if (selectedService.price != 0) {
        return (
          <div ref={cartRef} className="lg:grid flex flex-col lg:grid-rows-3 grid-flow-col gap-4 mt-20">

            <div className="col-span-2 ... lg:mt-10 mt-20 ">
              <h2 className={`mb-10 text-2xl font-semibold `}>
                Available Payment Option
              </h2>
              {AccordionComponent()}
              
              
              <div className="row-span-2 col-span-2 ...">
              {/* <Image
        src="/mop.jpg"
        alt="Vercel Logo"
        className="dark:invert"
        width={250}
        height={120}
        priority
      /> */}

        {/* <h2 className={`mb-3 text-1xl font-semibold mt-10`}>
                Flexible Payment Option
              </h2>         */}
              </div>

            </div>

            <div className="row-span-3 ... mt-20 lg:mt-0">
              {renderCart()}
            </div>

          </div>
        )
      }
    } catch (error) {
      return null
    }
  }
  const renderServicesComponent = () => {
    if (products.length) {
      return <>


        <div ref={scrollRef} className="lg:grid flex flex-col lg:grid-rows-3 grid-flow-col gap-4 mt-10 ">
          <div className="row-span-3 ...">
            <img src="https://www.hdledisplay.com/wp-content/uploads/2020/08/small-pixel-pitch-led-wall-3.jpg"
              width={'80%%'}
              height={200}
            />
            {/* <Calendar
            mode="range"
            // numberOfMonths={1}
            selected={date}
            onSelect={setDate}
            className={`rounded-md border mr-32 ${status ? 'opacity-10' : 'opacity-100'} `}
            modifiersClassNames={{
              selected: 'my-selected',
              today: 'my-today'
            }}

          /> */}
          </div>
          <div className="col-span-2 ... lg:mt-0 mt-10 ">
            <h2 className={`mb-10 text-2xl font-semibold `}>
              Select your service
            </h2>
          {/* <p className='text-xs'>500x500mm</p> */}
          <p className='text-xs'>number of days {daysCounter()}</p>
            <div className="w-full ">
              <div className="w-full  grid lg:grid-cols-3 gap-4 m-2">

                {renderServices()}
              </div></div>
          </div>
          <div className="row-span-2 col-span-2 ...">
           
          <h1>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(daysCounter() * selectedService.price )}</h1>
            <Button
              disabled={status}
              onClick={() => didTappSearch()}
              variant="outline" className=' rounded-full hover:shadow-lg bg-black text-white mt-10'>{status ? 'Searching...' : 'Continue'}</Button>
          </div>
        </div>
      </>
    }
  }
  const renderCart = () => {
    try {
      return (
        <div className="flex flex-col max-w-md p-6 space-y-4 divide-y sm:w-96 sm:p-10 dark:divide-gray-700 dark:bg-gray-900 dark:text-gray-100">
          <h2 className="text-2xl font-semibold">Cart Items</h2>
          <ul className="flex flex-col pt-4 space-y-2">
            <li className="flex items-start justify-between">
              <h3>{selectedService.title}
                <span className="text-sm dark:text-violet-400"> X {daysCounter()}</span>
              </h3>
              <div className="text-right">
                <span className="block">{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(daysCounter() * selectedService.price)}</span>
                
              </div>
            </li>
            {/* <li className="flex items-start justify-between">
              <h3>Hard taco, beef
                <span className="text-sm dark:text-violet-400">x3</span>
              </h3>
              <div className="text-right">
                <span className="block">$8.25</span>
                <span className="text-sm dark:text-gray-400">à $2.75</span>
              </div>
            </li>
            <li className="flex items-start justify-between">
              <h3>Curly fries
                <span className="text-sm dark:text-violet-400">x1</span>
              </h3>
              <div className="text-right">
                <span className="block">$1.75</span>
                <span className="text-sm dark:text-gray-400">à $1.75</span>
              </div>
            </li>
            <li className="flex items-start justify-between">
              <h3>Large soda
                <span className="text-sm dark:text-violet-400">x2</span>
              </h3>
              <div className="text-right">
                <span className="block">$4.00</span>
                <span className="text-sm dark:text-gray-400">à $2.00</span>
              </div>
            </li> */}
          </ul>
          <div className="pt-4 space-y-2">
            <div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(daysCounter() * selectedService.price)}</span>
              </div>
              {/* <div className="flex items-center space-x-2 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-3 h-3 mt-1 fill-current dark:text-violet-400">
                  <path d="M485.887,263.261,248,25.373A31.791,31.791,0,0,0,225.373,16H64A48.055,48.055,0,0,0,16,64V225.078A32.115,32.115,0,0,0,26.091,248.4L279.152,486.125a23.815,23.815,0,0,0,16.41,6.51q.447,0,.9-.017a23.828,23.828,0,0,0,16.79-7.734L486.581,296.479A23.941,23.941,0,0,0,485.887,263.261ZM295.171,457.269,48,225.078V64A16.019,16.019,0,0,1,64,48H225.373L457.834,280.462Z"></path>
                  <path d="M148,96a52,52,0,1,0,52,52A52.059,52.059,0,0,0,148,96Zm0,72a20,20,0,1,1,20-20A20.023,20.023,0,0,1,148,168Z"></path>
                </svg>
                <span className="dark:text-gray-400">Spend $20.00, get 20% off</span>
              </div> */}
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(0)}</span>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(0)}</span>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <span>Delivery fee</span>
                <span>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(0)}</span>
              </div>
              {/* <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-violet-400">How do our fees work?</a> */}
            </div>
            <div className="space-y-6">
              <div className="flex justify-between">
                <span>Total</span>
                
                <span className="font-semibold">{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(daysCounter() * selectedService.price)}</span>
              </div>
              {/* <Button className='rounded-full bg-black text-xs'>
        Book now
      </Button> */}

     
              {/* <button type="button" className="w-full py-2 font-semibold border rounded dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400">Go to checkout</button> */}
            </div>
          </div>
        </div>
      )
    } catch (error) {
      console.log('error cart', error)
    }
  }

  const AccordionComponent=()=> {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>E-Wallet</AccordionTrigger>
          <AccordionContent>
            {/* Yes. It adheres to the WAI-ARIA design pattern. */}
            <img src="https://pbs.twimg.com/media/FHba1s4aQAQnVy0.jpg"
                width={'200'}
                height={200}
                className='hover:shadow-lg rounded-lg ml-4'
              />

          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Installment</AccordionTrigger>
          <AccordionContent>
          <img src="https://pbs.twimg.com/media/FHba1s4aQAQnVy0.jpg"
                width={'200'}
                height={200}
                className='hover:shadow-lg rounded-lg ml-4'
              />
               <img src="https://pbs.twimg.com/media/FHba1s4aQAQnVy0.jpg"
                width={'200'}
                height={200}
                className='hover:shadow-lg rounded-lg ml-4'
              />
            {/* Yes. It comes with default styles that matches the other
            components&apos; aesthetic. */}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Credit Card/Debit</AccordionTrigger>
          <AccordionContent>
          <img src="https://pbs.twimg.com/media/FHba1s4aQAQnVy0.jpg"
                width={'200'}
                height={200}
                className='hover:shadow-lg rounded-lg ml-4'
              />
            {/* Yes. It's animated by default, but you can disable it if you prefer. */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  const daysCounter =()=>{
    try {
      let value = moment(date.to).diff(date.from,'days') + 1
      if (value >= 1) {
        return  value
      }else {
        return 1
      }
    } catch (error) {
      return 0
    }
  }
  // type userDateType = {from: Date; to: Date }
  const setDateUser=(date:DateRange)=>{ 
    setDate({from:date.from,to:date.to})
  }
  
  return (
    <main   className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          {/* <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a> */}
        </div>
      </div>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/3m.png"
          alt="Next.js Logo"
          width={100 * 2}
          height={37 * 2}
          priority
        />
      </div>
      <div>
        <h2 className={`mb-3 text-2xl font-semibold mt-10`}>
          Your LED Solution!
        </h2>
        {/* <h2 className={`mb-3 text-1xl font-semibold mt-10`}>
          Flexible Payment Option
        </h2> */}



      </div>
      <div className="lg:grid flex flex-col lg:grid-rows-3 grid-flow-col gap-4 mt-60">
        <div className="row-span-3 ...">
          <style>{css}</style>
          <Calendar
            mode="range"
            selected={date}
            onSelect={(e:DateRange)=>setDateUser(e)}
            className={`rounded-md border mr-32 ${status ? 'opacity-10' : 'opacity-100'} `}
            modifiersClassNames={{
              selected: 'my-selected',
              today: 'my-today'
            }}

          />
        </div>
        <div className="col-span-2 ... lg:mt-0 mt-10 ">
          <h2 className={`mb-10 text-2xl font-semibold `}>
            What date works for you?
          </h2>

          <p className='text-xs text-gray-700'>Selected days: ({daysCounter()}) {displayFirstLastDate()}</p>
        </div>
        <div className="row-span-2 col-span-2 ...">
<Button 
onClick={()=>clearDate()}
variant={"ghost"} className='rounded-full text-xs mr-2'> Clear</Button>
          <Button
            disabled={status}
            onClick={() => didTappSearch()}
            variant="outline" className=' rounded-full text-xs hover:shadow-lg bg-black text-white mt-10'>{status ? 'Searching...' : 'Search available slot'}</Button>
        </div>
      </div>
      {renderServicesComponent()}


      {renderCartComponent()}
      {/* <Drawer>
  <DrawerTrigger className=''>
  Submit booking</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
      <input placeholder='Full name'/>
      <input placeholder='Mobile Number'/>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer> */}
      
      <div className='mb-20'/>
    </main>
  )
}
