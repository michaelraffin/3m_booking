"use client" 
import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Label } from "@/components/ui/label"
  import SideNavigation from "@/app/SideNavigation"
  import moment from "moment"
  import HeaderPage from "@/app/LocalComponents/HeaderPage"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { Input } from "@/components/ui/input"
  const staff = [
    { id:1,
      name:'Michael',
      category:'Agent'
    },
    { id:2,
      name:'Raffin',
      category:'Warehouse'
    }, { id:23,
      name:'Michael',
      category:'Agent'
    }
    , { id:123,
      name:'Michael',
      category:'Agent'
    },
    , { id:112323,
      name:'Mai mai',
      category:'Agent'
    },{ id:14132123,
      name:'james',
      category:'Agent'
    },
  ]
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]
  export default function StaffComponent() {
    const [staffList,setStaff] = useState(staff)
    const [refenceProducts,setReferenceProducts] = useState(staff)


    const searchStaff = (e)=>{
      
      try {
        let searchedValue  = e.target.value.toLowerCase()
        let personStaff = staff 
        const filteredStaff = staff.filter(person => {
          // Modify the condition according to your search criteria
          // For example, searching by name or other properties
          return person.name.toLowerCase().includes(searchedValue);
        });
        setStaff(filteredStaff)
      } catch (error) {
        
      }
    }
    return (
        <div className="">
    <SideNavigation/>
  
    <HeaderPage title="Staff" subtitle=""/>
        {/* <div className="ml-20 mt-20">
            <h1 className="text-[24px] mb">Reports</h1>
            <p className="text-xs mb-20">Generate your report </p>
        
        </div> */}
  <div className="w-full mb-20">
        <div className="w-1/full  ml-24 grid grid-cols-3 gap-4 m-2">
        <article class="rounded-lg border border-gray-300 bg-white p-6 hover:shadow-lg">
  <div>
    <p class="text-sm text-gray-500">Profit</p>

    <p class="text-2xl font-medium text-gray-900">$240.94</p>
  </div>

  <div class="mt-1 flex gap-1 text-green-600">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
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

    <p class="flex gap-2 text-xs">
      <span class="font-medium"> 67.81% </span>

      <span class="text-gray-500"> Since last week </span>
    </p>
  </div>
</article>

<article class="rounded-lg border border-gray-300 bg-white p-6 hover:shadow-lg">
  <div>
    <p class="text-sm text-gray-500">Profit</p>

    <p class="text-2xl font-medium text-gray-900">$240.94</p>
  </div>

  <div class="mt-1 flex gap-1 text-red-600">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
      />
    </svg>

    <p class="flex gap-2 text-xs">
      <span class="font-medium"> 67.81% </span>
      <span class="text-gray-500"> Since last week </span>
    </p>
  </div>
</article>

<article class="rounded-lg border border-gray-300 bg-white p-6 hover:shadow-lg">
  <div>
    <p class="text-sm text-gray-500">Profit</p>

    <p class="text-2xl font-medium text-gray-900">$240.94</p>
  </div>

  <div class="mt-1 flex gap-1 text-red-600">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
      />
    </svg>

    <p class="flex gap-2 text-xs">
      <span class="font-medium"> 67.81% </span>
      <span class="text-gray-500"> Since last week </span>
    </p>
  </div>
</article>  
        </div></div>

          <Tabs defaultValue="Stockman" className="w-full ml-24 bt-20 bg-white rounded-lg">
  <TabsList className="rounded-full">
  <div className="flex w-full max-w-sm items-center space-x-2 mr-2">
      <Input type="email" placeholder="Search" className="mr-2 rounded-full"  onChange={(e)=>searchStaff(e)}/>
      {/* <Button type="submit" className='text-xs'>Search</Button> */}
    </div>
  <TabsTrigger className="rounded-full" value="All">All</TabsTrigger>
    <TabsTrigger className="rounded-full" value="Stockman">Stockman</TabsTrigger>
    <TabsTrigger className="rounded-full" value="Cashier">Cashier</TabsTrigger>
    <TabsTrigger className="rounded-full" value="Agent">Agent</TabsTrigger>
  </TabsList>
  <TabsContent value="All">
  <div className="w-full ml-2 mt-10 grid grid-cols-4 gap-2 m-2">
  {staffList.map((staff) => (
  <div
 key={staff.id}
  >
 
      <div className="max-w-sm group static rounded overflow-hidden hover:shadow-lg bg-white transition duration-100 ease-in-out  {order.receiptImageLink === undefined ? 'border-red-500 border ' : ''} ">
          <div className="px-6 py-4">
            <div className="font-bold  mb-2">
          <div className="flex grid-flow-col-2 justify-between place-items-center  mb-2">
          {staff.name}
              
            <p className="text-xs font-light">{"Agent"}</p>
          </div>
          <div><p className="text-xs "><span className="text-gray-600"></span> {false === undefined ? 'no name': "order.deliveryDetails.customerName"}</p></div>
          </div>
          
           <div className="grid grid-cols-4   mt-2 ">
             
          </div>
          </div>
          <div class="px-4 pt-4 pb-2">
                  <span class="inline-block bg-white rounded-full px-3 font-light text-xs text-gray-400 mr-2 mb-2">{moment(Date()).format('LLLL')}</span>
            <p class="text-xs font-light text-gray-100 ml-3 transition duration-100 ease-in-out  group-hover:font-bold group-hover:text-black inline-block top-2 right-4" stye="fontSize:20">Tap to view full detail of order</p>
          </div>
        </div>
      </div>
  ))
  }
  </div>

  </TabsContent>
  <TabsContent value="Stockman">
      <Table className="">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table></TabsContent>
 
  <TabsContent value="Cashier">Change your password here.</TabsContent>
</Tabs> 
      </div>
    )
  }
  