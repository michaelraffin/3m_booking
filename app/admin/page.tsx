"use client" 
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
  import HeaderPage from "@/app/LocalComponents/HeaderPage"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  export default function TableDemo() {
    return (
        <div className="">
    <SideNavigation/>
  
    <HeaderPage title="Reports" subtitle="Generate your report"/>
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
        </div></div>

          <Tabs defaultValue="account" className=" ml-24 bt-20 bg-white rounded-lg">
  <TabsList className="rounded-full">
    <TabsTrigger className="rounded-full" value="account">Stocks</TabsTrigger>
    <TabsTrigger className="rounded-full" value="password">Restocks</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
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
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>

      </div>
    )
  }
  