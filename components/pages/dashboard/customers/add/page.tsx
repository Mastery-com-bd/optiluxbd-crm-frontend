import CustomerForm from "../components/customer-form"

export default function AddNewCustomer() {
  return (
    <main className="min-h-screen bg-linear-gradient(to-br, from-background, via-background, to-muted/30)">
      <div className="px-4 py-6 md:px-6 lg:px-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Add New Customer</h1>
          <p className="mt-1 text-sm text-muted-foreground">Fill in the details to create a new customer profile</p>
        </div>

        {/* Form Container */}
        <div className="mx-auto">
          <CustomerForm />
        </div>
      </div>
    </main>
  )
}
