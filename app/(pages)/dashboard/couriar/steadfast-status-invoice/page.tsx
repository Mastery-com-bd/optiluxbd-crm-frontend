import SteadfastStatusByInvoice from '@/components/pages/dashboard/couriar/steadfast-status-invoice/steadfastStatusInvoice'
import React from 'react'

const Page = () => {
  return (
    <div className="space-y-4">
      <SteadfastStatusByInvoice
        title="Steadfast Status by Invoice"
        description="Invoice Status"
        endpoint="/api/v1/couriers/steadfast/status/invoice/:invoice"
      />
      <SteadfastStatusByInvoice
        title="Status by Consignment"
        description="Consignment Status"
        endpoint="GET /api/v1/couriers/steadfast/status/consignment/:consignmentId"
      />
      <SteadfastStatusByInvoice
        title="Status by Tracking Code"
        description="Tracking Code Status"
        endpoint="/api/v1/couriers/steadfast/status/tracking/:trackingCode"
      />
    </div>
  )
}

export default Page