import { CourierDeliveryChart } from '@/components/pages/dashboard/couriar/courier-delivery-chart'
import CourierOverview from '@/components/pages/dashboard/couriar/courier-overview'
import { CourierPatnerCards } from '@/components/pages/dashboard/couriar/courier-patner-cards'

const Page = () => {
  return (
    <div className='space-y-7 w-full max-w-[1132px] mx-auto'>
        <CourierOverview />
        <CourierDeliveryChart />
        <CourierPatnerCards />
    </div>
  )
}

export default Page