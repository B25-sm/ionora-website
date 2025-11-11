'use client';

import { FormEvent } from 'react';

const COMPLAINT_EMAIL = 'contact@ionora.in';

export default function RaiseComplaintForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = ((formData.get('name') as string) || '').trim();
    const phone = ((formData.get('phone') as string) || '').trim();
    const address = ((formData.get('address') as string) || '').trim();
    const message = ((formData.get('message') as string) || '').trim();

    const subject = name
      ? `New complaint from ${name}`
      : 'New complaint submission';

    const bodyLines = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Address: ${address}`,
      '',
      'Message:',
      message || '(No message provided)',
    ];

    const mailtoUrl = `mailto:${COMPLAINT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    window.location.href = mailtoUrl;
    form.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-5 max-w-xl"
      noValidate
    >
      <div className="space-y-1">
        <label
          htmlFor="name"
          className="flex items-center gap-1 font-medium text-primary-500"
        >
          Name
          <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Enter your full name"
          className="w-full rounded-md border border-primary/20 bg-white px-4 py-2.5 text-sm text-primary-500 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="phone"
          className="flex items-center gap-1 font-medium text-primary-500"
        >
          Phone
          <span className="text-red-600">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="Enter your phone number"
          className="w-full rounded-md border border-primary/20 bg-white px-4 py-2.5 text-sm text-primary-500 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="address"
          className="flex items-center gap-1 font-medium text-primary-500"
        >
          Address
          <span className="text-red-600">*</span>
        </label>
        <input
          id="address"
          name="address"
          type="text"
          required
          placeholder="Enter your address"
          className="w-full rounded-md border border-primary/20 bg-white px-4 py-2.5 text-sm text-primary-500 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="message"
          className="font-medium text-primary-500"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Describe your issue"
          className="w-full rounded-md border border-primary/20 bg-white px-4 py-2.5 text-sm text-primary-500 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-200"
      >
        Submit
      </button>
    </form>
  );
}

