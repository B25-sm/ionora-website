import RaiseComplaintForm from '@/components/forms/RaiseComplaintForm';

export const metadata = {
  title: 'Raise a Complaint | Ionora',
  description:
    'Share your concerns with Ionora. Submit your complaint directly and our support team will reach out promptly.',
};

export default function RaiseComplaintPage() {
  return (
    <div className="bg-bg py-10 sm:py-12 md:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8">
        <div className="rounded-lg border border-primary/10 bg-white px-6 py-8 text-primary-500 shadow-sm sm:px-8 sm:py-10 md:px-12 md:py-12">
          <div className="max-w-xl">
            <h1 className="text-2xl font-semibold text-primary-500 sm:text-3xl">
              Register Your Complaint
            </h1>
            <p className="mt-3 text-sm text-primary-300 sm:text-base">
              Please share your details and describe the issue you are facing.
              Our team will respond at the earliest to assist you.
            </p>
          </div>
          <RaiseComplaintForm />
        </div>
      </div>
    </div>
  );
}

