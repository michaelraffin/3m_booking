"use client"
import React, { useState, useEffect } from 'react';
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
import { Button } from "@/components/ui/button"
import RequestSheet from "@/app/LocalComponents/RequestSheet"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { axios } from "@/Utils/axios"

let tableWidth = "w-[70%]"
const invoices = [
  {
    id: "INV001",
    paymentStatus: "Approved",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    id: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    id: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  }, {
    id: "INV0071",
    paymentStatus: "Denied",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]
export default function TableDemo() {
  const { toast } = useToast()
  const [request, setRequest] = useState(invoices)
  const [reRequest, setRefRequest] = useState(invoices)

  const didUpdate = (e, id) => {
    try {

      let list = request.map((item) => {
        if (item.id == id) {
          item.paymentStatus = e
          return item
        } else {
          return item
        }
      })
      setRequest(list)
    } catch (error) {

      alert('Oppss')
    }
  }
  const displayAlert = (item) => {
    console.log(item)
    didUpdate("Denied", item.id)
    //     fetchProduct().then((response)=>{
    //         toast({
    //             title: "Scheduled: Catch up",
    //             description: "Friday, February 10, 2023 at 5:57 PM",
    //           })
    //      })

  }

  useEffect(() => {
    fetchProduct().then((response) => {
      console.log(response)
    })
  })

  async function fetchProduct() {
    try {
      const data = { id: "65435a78da64626d59397ff4", queryType: "filter", lesseOwner: "653ce1caa775d7aeaa34cf0b", isAPI: false }
      const response = await axios.post('/productV2/warehouseRequest', data)
      console.log(response.data)
      return response
    } catch (error) {
      console.log('errorr', error)
    }
  }
  const searchRequest = (e) => {

    try {
      let searchedValue = e.target.value.toLowerCase()
      let personStaff = invoices
      const filteredStaff = request.filter(person => {
        return person.id.toLowerCase().includes(searchedValue);
      });
      setRequest(filteredStaff)
    } catch (error) {

    }
  }
  return (
    <div className="">
      <SideNavigation />

      <HeaderPage title="Request" subtitle="" />
      {/* <div className="ml-20 mt-20">
            <h1 className="text-[24px] mb">Reports</h1>
            <p className="text-xs mb-20">Generate your report </p>
        
        </div> */}
      <div className="w-full mb-20">
        <div className="w-1/full  ml-24 grid grid-cols-3 gap-4 m-2">
          <article className="rounded-lg border border-gray-300 bg-black p-6 hover:shadow-lg">
            <div>
              <p className="text-sm text-white">Profit</p>

              <p className="text-2xl font-medium text-white">$240.94</p>
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
                <span className="font-medium"> 67.81% </span>

                <span className="text-gray-100"> Since last week </span>
              </p>
            </div>
          </article>

          <article className="rounded-lg border border-gray-300 bg-white p-6 hover:shadow-lg">
            <div>
              <p className="text-sm text-gray-500">Profit</p>

              <p className="text-2xl font-medium text-gray-900">$240.94</p>
            </div>

            <div className="mt-1 flex gap-1 text-red-600">
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
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>

              <p className="flex gap-2 text-xs">
                <span className="font-medium"> 67.81% </span>
                <span className="text-gray-500"> Since last week </span>
              </p>
            </div>
          </article>
        </div></div>

      <Tabs defaultValue="All" className="w-[70] ml-24 bt-20 bg-white rounded-lg">
        <TabsList className="rounded-full">
          <div className="flex w-full max-w-sm items-center space-x-2 mr-2">
            <Input type="email" placeholder="Search" className="mr-2 rounded-full" onChange={(e) => searchRequest(e)} />

          </div>
          <TabsTrigger className="rounded-full" value="All">All Request</TabsTrigger>
          <TabsTrigger className="rounded-full" value="Approved">Approved</TabsTrigger>
          <TabsTrigger className="rounded-full" value="Pending">Pending</TabsTrigger>
          <TabsTrigger className="rounded-full" value="Denied">Denied</TabsTrigger>
        </TabsList>
        <TabsContent value="All">
          <Table className={`${tableWidth}`}>
            <TableCaption>A list of request.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {request.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium"> <RequestSheet disabled={`${invoice.paymentStatus === "Approved" ? true : false}`} void={(details) => displayAlert(details)} details={invoice} /></TableCell>
                  {/* {invoice.invoice}  */}
                  <TableCell className={`text-xs ${invoice.paymentStatus === "Approved" ? 'text-blue-600' : 'text-red-500'}`}>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="Approved">
          <Table className={`${tableWidth}`}>
            <TableCaption>A list of request.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {request.filter(item => item.paymentStatus === "Approved").map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium"> <RequestSheet disabled={true} void={(details) => displayAlert(details)} details={invoice} /></TableCell>
                  {/* {invoice.invoice}  */}
                  <TableCell className={`text-xs ${invoice.paymentStatus === "Approved" ? 'text-blue-600' : 'text-red-500'}`}>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table></TabsContent>
        <TabsContent value="Pending">
          <Table className={`${tableWidth}`}>
            <TableCaption>A list of request.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {request.filter(item => item.paymentStatus === "Pending").map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium"> <RequestSheet void={(details) => displayAlert(details)} details={invoice} /></TableCell>
                  {/* {invoice.invoice}  */}
                  <TableCell className={`text-xs ${invoice.paymentStatus === "Approved" ? 'text-blue-600' : 'text-red-500'}`}>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table></TabsContent>

        <TabsContent value="Denied">
          <Table className={`${tableWidth}`}>
            <TableCaption>A list of request.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {request.filter(item => item.paymentStatus === "Denied").map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium"> <RequestSheet void={(details) => displayAlert(details)} details={invoice} /></TableCell>
                  {/* {invoice.invoice}  */}
                  <TableCell className={`text-xs ${invoice.paymentStatus === "Approved" ? 'text-blue-600' : 'text-red-500'}`}>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table></TabsContent>

        <TabsContent value="Stockman">Change your password here.</TabsContent>
        <TabsContent value="Cashier">Change your password here.</TabsContent>
      </Tabs>
      {/* <div className="w-1/2 ml-20 mt-20">

<div
    
    >
    
        <div className="max-w-sm group static rounded overflow-hidden hover:shadow-lg bg-white transition duration-100 ease-in-out  {order.receiptImageLink === undefined ? 'border-red-500 border ' : ''} ">
            <div className="px-6 py-4">
              <div className="font-bold  mb-2">
            <div className="flex grid-flow-col-2 justify-between place-items-center  mb-2">
            Michael Raffin Paculba
                
              <p className="text-xs font-light">{"Agent"}</p>
            </div>
            <div><p className="text-xs "><span className="text-gray-600"></span> {false === undefined ? 'no name': "order.deliveryDetails.customerName"}</p></div>
            </div>
            
             <div className="grid grid-cols-4   mt-2 ">
               
            </div>
            </div>
            <div className="px-4 pt-4 pb-2">
                    <span className="inline-block bg-white rounded-full px-3 font-light text-xs text-gray-400 mr-2 mb-2">{moment(new Date()).format('LLLL')}</span>
              <p className="text-xs font-light text-gray-100 ml-3 transition duration-100 ease-in-out  group-hover:font-bold group-hover:text-black inline-block top-2 right-4" stye="fontSize:20">Tap to view full detail of order</p>
            </div>
          </div>
        </div>
</div> */}

    </div>
  )
}
