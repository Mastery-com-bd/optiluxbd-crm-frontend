import CustomerForm from "../components/customer-form";

export default function AddNewCustomer() {
  return (
    <main className="min-h-screen bg-linear-gradient(to-br, from-background, via-background, to-muted/30)">
      <div className="px-4 py-6 md:px-6 lg:px-8">
        {/* Form Container */}
        <div className="mx-auto">
          <CustomerForm />
        </div>
      </div>
    </main>
  );
}
