"use client"
import React, { useEffect, useState, useRef } from 'react';
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
import moment from "moment"
import { axios, productStats } from "@/Utils/axios"
import { DateRange } from 'react-day-picker';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import Script from 'next/script'
import Head from 'next/head'
import { signinAuth } from '../Utils/login_service'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function Home() {
  const { toast } = useToast()
  const [date, setDate] = useState<DateRange>({ from: new Date(), to: new Date() });
  const [singleDate, setSingleDate] = useState<Date>(new Date());
  const [isEmpty, setIsEmpty] = useState(false)
  const [eventType, selectedEventType] = useState<String>("Single")

  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [products, setProduct] = useState<[{ id: String | null; title: String | null, price: number; subtitle: String | null }] | null>([{
    id: null,
    title: null,
    price: 0,
    subtitle: null
  }]);
  const [status, setStatus] = useState(false)
  const [selectedService, setSelectedService] = useState<{
    title: String | null; id: String | null; price: number, imgUrl: string, discountedValue: number
  }>({ title: null, id: null, price: 0, imgUrl: "", discountedValue: 0 })

  const scrollRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const emptyRef = useRef<HTMLDivElement>(null);

  const clearDate = () => {
    setSelectedService({ title: null, id: null, price: 0, imgUrl: "", discountedValue: 0 })
    setProduct([{ id: null, title: null, price: 0, subtitle: null }])
    setDate({ from: new Date(), to: new Date() });

  }

  const signinAccount = () => {
    signinAuth().then(response => {
      storePayload(response)
    })
  }
  let titlePage = "3M  Visual - Booking "
  const didTappSearch = () => {


    try {
      setStatus(true)
      setIsEmpty(false)

      fetchProduct().then(items => {
        setStatus(false)
        let results = items.results

        if (results?.length >= 1) {
          setIsEmpty(false)
          let availableSelection = results?.[0].productPicker


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
        } else {
          setIsEmpty(true)
          toast({
            description: "Schedule is not available.",
          })
          setTimeout(() => {
            if (emptyRef.current) {
              emptyRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }, 500);
        }


      })


    } catch (error) {
      console.log('error in didTapped', error)
    }

  }


  const storePayload = (payloads: any) => {
    try {
      localStorage.setItem('userCache', JSON.stringify(payloads))
      recordProductStats(`3mCustomer`, payloads)
    } catch (error) {

    }
  }
  const displayFirstLastDate = (classDetails: String) => {
    try {
      if (date.from != undefined && eventType === "Multiple") {
        return (<>
          <div className={`${classDetails}`}>
            <input className='rounded-md font-md w-40 text-xs ' disabled={true} value={`From : ${moment(date.from).format('LL')}`} />
            <input className='rounded-md font-md w-40 text-xs ' disabled={true} value={`To : ${moment(date.to).format('LL')}`} />
            {/* <div><Badge variant="outline">{moment(date.from).format('LL')}</Badge></div> */}
            {/* {date.to != undefined ? <div><Badge variant="outline">{moment(date.to).format('LL')}</Badge></div> : null} */}
          </div>
        </>)
      } else {
        return (
          <div className={`${classDetails}`}>
            <input className='w-48   text-xs mt-2' disabled={true} value={`Event date : ${moment(date.from).format('LL')}`} />
          </div>
        )
      }



    } catch (error) {
      return null
    }
  }


  async function fetchProduct() {
    try {
      let formattedDate = eventType === "Single" ? singleDate : date.from
      let selectedDated = moment(formattedDate).format('YYYY-MM-DD')
      const data = {
        id: "Visual", queryType: "filter", storeOwner: "60b1c9a9a001ef1e463d52c2",
        "isAPI": true, "showLimit": true, "number": 8, "deliveryDate": selectedDated
      }


      const response = await axios.post('/productV2/Product', data)
      return response.data
    } catch (error) {
      console.log('errorr', error)
    }
  }



  const didTappedService = (item: any) => {
    try {
      recordProductStats(`Selected service`, item)
      setSelectedService(item)
      setTimeout(() => {
        if (cartRef.current) {
          cartRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } catch (error) {

    }
  }
  type YourItemType = { id: String | null; title: String | null, price: number, subtitle: String | null }
  const renderServices = () => {
    try {
      if (products?.length) {

        let items = [<></>]
        products?.map((item: YourItemType, _index: number) => {
          let isActive = selectedService.id === item.id
          if (item?.price != 0) {
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
          }

        })
        return items
      }

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
                Select Payment Method
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

            {/* <Alert className='h-20 bg-[#f7f1e3]'>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
</Alert> */}
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
  const renderEmpty = () => {
    try {
      if (isEmpty) {
        return (
          <div ref={emptyRef} className='text-center'>
            <img src="https://cdn.dribbble.com/users/183518/screenshots/2581188/media/ba6518c3a42da81603792166b8fe188f.png?resize=800x600&vertical=center"
              width={'500'}
              height={200}
              className='rounded-lg ml-4 '
            />
            <h1 className='text-xs'>
              Sorry! We are not available on the chosen date, try other one.
            </h1>
          </div>
        )
      }

    } catch (error) {

    }
  }

  const renderCalendarPicker = () => {
    try {
      return (<div className="lg:grid flex flex-col lg:grid-rows-3 grid-flow-col gap-4 mt-60  ">
        <div className="row-span-3 lg:ml-0 ml-20  ...">
          <style>{css}</style>
          {eventType === "Single" ? <Calendar
            mode={"single"}
            selected={singleDate}
            onDayTouchCancel={(e) => console.log(e)}
            onSelect={(e: any) => setDateUserSingle(e)}
            className={`rounded-md border mr-32 ${status ? 'opacity-10' : 'opacity-100'} `}
            modifiersClassNames={{
              selected: 'my-selected',
              today: 'my-today'
            }}

          /> : <Calendar
            mode={"range"}
            selected={date}
            onDayTouchCancel={(e) => console.log(e)}
            onSelect={(e: any) => setDateUser(e)}
            className={`rounded-md border mr-32 ${status ? 'opacity-10' : 'opacity-100'} `}
            modifiersClassNames={{
              selected: 'my-selected',
              today: 'my-today'
            }}

          />}

        </div>

        <div className="col-span-2 ... lg:mt-0 mt-10 ml-20">

          <h2 className={`mb-10 text-2xl font-semibold `}>
            What date works for you?
          </h2>
          <Tabs defaultValue="Single" className="w-[400px] rounded-full " onValueChange={(e) => selectedEventType(e)}>
            <TabsList className=" rounded-full">
              <TabsTrigger value="Single" className=" rounded-full text-xs">One Day Event</TabsTrigger>
              <TabsTrigger value="Multiple" className=" rounded-full text-xs">Multiple Day Event</TabsTrigger>
            </TabsList>

            <TabsContent value="Single" className=''>
              <input className='w-48   text-xs mt-10' disabled={true} value={`Event date : ${moment(date.from).format('LL')}`} />

            </TabsContent>
            <TabsContent value="Multiple">
              <p className='text-xs text-gray-700 mt-10'>Selected days: ({daysCounter()}) {displayFirstLastDate("flex flex-col gap-2 mt-4 ...")}</p>

            </TabsContent>
          </Tabs>
          {/* <p className='text-xs text-gray-700'>Selected days: ({daysCounter()}) {displayFirstLastDate("flex flex-col gap-2 mt-4 ...")}</p> */}
        </div>

        <div className="row-span-2 col-span-2  ml-20 ...">
          <Button
            onClick={() => clearDate()}
            variant={"ghost"} className='rounded-full text-xs mr-2'> Clear</Button>
          <Button
            disabled={status}
            onClick={() => didTappSearch()}
            variant="outline" className=' rounded-full text-xs hover:shadow-lg bg-black text-white mt-10'>{status ? 'Searching...' : 'Search available slot'}</Button>

          {/* <div className='w-full bg-gray-500 h-[0.5px] mb-2 mt-2'/> */}
        </div>

      </div>)
    } catch (error) {

    }
  }
  const renderServicesComponent = () => {

    if (products?.[0].price != 0) {
      return <>

        <div className='mt-20' ref={scrollRef} />
        <div className="lg:grid flex flex-col lg:grid-rows-3 grid-flow-col gap-4 mt-10 ">
          <h2 className={`mb-10 text-2xl font-semibold lg:hidden block `}>
            Select your service
          </h2>
          <div className="row-span-3 ...">

            <img
              className='rounded-md hover:shadow-lg'
              src={selectedService.imgUrl}
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
            <h2 className={`mb-10 text-2xl font-semibold lg:block  hidden `}>
              Led Wall rental Service
            </h2>
            <p className='text-xs'>Number of days {daysCounter()}</p>
            <div className="w-full ">
              <div className="w-full  grid lg:grid-cols-3 gap-4 m-2">
                {renderServices()}
              </div></div>
          </div>
          <div className="row-span-2 col-span-2 ...">

            <h1>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(daysCounter() * selectedService.price)}</h1>
            <Button
              disabled={status}
              onClick={() => setTimeout(() => {
                if (scrollRef.current) {
                  cartRef?.current?.scrollIntoView({ behavior: 'smooth' });
                }
              }, 500)}
              variant="outline" className=' rounded-full hover:shadow-lg bg-black text-white mt-10'>{status ? 'Searching...' : 'Continue'}</Button>

          </div>
          {/* <div className='w-full bg-gray-500 h-[0.5px] mb-2 mt-2'/> */}
        </div>
      </>
    }
  }
  function CheckboxWithText() {
    return (
      <div className="items-top flex space-x-2">
        <Checkbox id="terms1" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
          <p className="text-sm text-muted-foreground">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    )
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
                <p>
                  {/* <span className="text-sm dark:text-violet-400">{}</span> */}
                  {displayFirstLastDate("")}
                </p>

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
              <span className=''>Discount  <span className='text-xs'></span></span>

              <span className='text-red-500'>-{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(selectedService.discountedValue)}</span>
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

                <span className="font-semibold">{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(daysCounter() * (selectedService.price - selectedService.discountedValue))}</span>
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
  type UserDateType = { from: Date; to: Date };
  const AccordionComponent = () => {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>E-Wallet</AccordionTrigger>
          <AccordionContent className='text-xs'>
            <img src="https://localflowershop.sgp1.digitaloceanspaces.com/product/1705113012149-scanPay.png"
              width={'200'}
              height={200}
              className='hover:shadow-lg rounded-lg ml-4 mb-2'
            />
            <img src="https://localflowershop.sgp1.digitaloceanspaces.com/product/1705113100668-PYMY%20LOOKEE%20%281%29.png"
              width={'200'}
              height={200}
              className='hover:shadow-lg rounded-lg ml-4 mb-2'
            />


            Additional 5% of the total cart.

          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger disabled={true} className='text-gray-200'>Installment</AccordionTrigger>
          <AccordionContent className='text-xs'>
            <img src="https://www.bworldonline.com/wp-content/uploads/2022/09/billease-logo.jpg"
              width={'200'}
              height={200}
              className='hover:shadow-lg rounded-lg ml-4'
            />
            <img src="https://assets-global.website-files.com/64624bb008de2f11dbf1f3a1/6465f9263eb94044a3743277_HitPay_Blue-min.svg"
              width={'200'}
              height={200}
              className='hover:shadow-lg rounded-lg ml-4'
            />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdYezi5IEhWjNsRSEP9EdEDt2U9sN3bei49Tk_LRzBukQj3fIjjghemVMPrjjbQMtsiOo&usqp=CAU"
              width={'200'}
              height={100}
              className='hover:shadow-lg rounded-lg ml-4'
            />

            Additional 15% of the total cart.


            {/* Yes. It comes with default styles that matches the other
            components&apos; aesthetic. */}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger disabled={true} className='text-gray-200'>Credit Card/Debit</AccordionTrigger>
          <AccordionContent className='text-xs'>
            <img src="https://i.ytimg.com/vi/i09C02151PI/maxresdefault.jpg"
              width={'200'}
              height={200}
              className='hover:shadow-lg rounded-lg ml-4'
            />
            Additional 15% of the total cart.
            {/* Yes. It's animated by default, but you can disable it if you prefer. */}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger >Cash</AccordionTrigger>
          <AccordionContent className='text-xs'>
            <img src="https://img.freepik.com/premium-vector/money-hand-cartoon-cash-payments-concept-businessman-hands-takes-exchange-money_221062-38.jpg"
              width={'200'}
              height={200}
              className='hover:shadow-lg rounded-lg ml-4'
            />
            <p>When paying cash, full payment</p>  is required before <span className='font-bold'>{moment(date.from).format('LL')}</span>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  const daysCounter = () => {
    try {
      let value = moment(date.to).diff(date.from, 'days') + 1
      if (value >= 1) {
        return value
      } else {
        return 1
      }
    } catch (error) {
      return 0
    }
  }
  // type userDateType = {from: Date; to: Date }
  const setDateUser = (date: DateRange) => {
    if (date.from != undefined) {
      setDate({ from: date.from, to: date.to })
      // recordProductStats(`Multple Date `,`Date: ${moment(date.from).toLocaleString()} + ${moment(date.to).toLocaleString()} , daysNumber: ${daysCounter()}`)
    }
  }
  const checkAccount = () => {
    try {
      let existingCart = localStorage.getItem('sb-uoaqelztwfzinfesejcv-auth-token')
      return existingCart
    } catch (error) {
      return undefined
    }
  }
  async function recordProductStats(e: any, date: any) {
    try {

      const data = { storeOwner: '3MVisual', cType: '3m Visual Booking Page', cName: "website", "data": date, "date": new Date(), action: e }
      const response = await productStats.put('/Items', data)
      return response

    } catch (error) {
      console.log('error recordProductStats', error)
    }
  }
  const setDateUserSingle = (date: Date) => {
    console.log(date)
    setSingleDate(date)

    recordProductStats(`Single Date `, date)
    // setDate({from:date,to:new Date()})
    // if(date.from != undefined) {
    //   setDate({ from: date.from, to: date.to })
    // }
  }
  return (
    <>
      <Head>
        <meta name="robots" content="nofollow" />
        <meta name="googlebot" content="noindex" />
        <meta name="keywords" content="LED wall, LED wall Rental,
     LED wall,
     Video wall,
     Digital signage,
     LED display,
     Rental screens,
     Event technology,
     Audiovisual solutions,
     Large format displays,
     Outdoor LED screen,
     Indoor LED panel,
     LED video display,
     Stage backdrop,
     Corporate events,
     Concert visuals,
     Trade show displays,
     Multimedia rentals,
     Display solutions,
     LED screen rental,
     Interactive displays,
     Rental LED panels,
     Iligan City,
     Cagayan De Oro City
     "/>
      </Head>
      <title>{titlePage}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      G
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-WH954TW2JS" />

      <Script
        id='google-analytics'
        async src="https://www.googletagmanager.com/gtag/js?id=G-WH954TW2JS" />
      <Script id='googleID3'>
        {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-WH954TW2JS');
  `}
      </Script>
      <Script id="text/javascript" type="text/javascript">
        {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "kqw0qreuki");
    `}
      </Script>
      <Script id="text/javascript" type="text/javascript">
        {`  var chatbox = document.getElementById('fb-customer-chat');
    chatbox.setAttribute("page_id", "120283629372129");
    chatbox.setAttribute("attribution", "biz_inbox");

    window.fbAsyncInit = function() {
      FB.init({
        xfbml            : true,
        version          : 'v11.0'
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    `}
      </Script>
      <Head>
        <title> </title>
        <meta property="og:Booking" content="3M Visual - Booking" key="Booking" />

      </Head>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
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
        <div className='grid grid-rows-4  justify-center align-middle content-center'>
          <h2 className={`mb-3 text-2xl font-semibold mt-10`}>
            Your LED wall Solution!
          </h2>
         <h2 className={`mb-3 text-1xl font-semibold mt-10`}>
        Get a free qoute
        </h2> 
          <div className='mt-20' />

        </div>
        {/* checkAccount() != null ? */}
        {true != null ? renderCalendarPicker() : <div>
          <div><p className='text-xs mb-4 ml-10'>To view the price</p> </div>
          <Button className='bg-white text-black hover:border  hover:border-blue-500 hover:bg-gray-100 rounded-full' onClick={signinAccount}>
            <img src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png" className="mr-2 h-4 w-4" />

            Continue with Google
          </Button>
        </div>}
        {status ? <></> : isEmpty ? renderEmpty() : renderServicesComponent()}
        {renderCartComponent()}
        <div className='mb-20' />

        {/* {CheckboxWithText()} */}
      </main>
    </>
  )
}

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