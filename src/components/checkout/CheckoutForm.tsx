import React, { FormEvent, useEffect, useState } from 'react';
import { AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useEcommerce } from '@/context/EcommerceContext';
import { Address, Order } from '@/types/ecommerce';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface CheckoutFormProps {
  onSuccess: (order: Order) => void;
  onCancel: () => void;
}

type CheckoutFields = {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
};

type CheckoutErrors = Partial<Record<keyof CheckoutFields, string>>;

const initialFields: CheckoutFields = {
  name: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess, onCancel }) => {
  const { account, addresses, selectedAddressId, createOrder } = useEcommerce();
  const [fields, setFields] = useState<CheckoutFields>(initialFields);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedAddress = addresses.find(address => address.id === selectedAddressId) || addresses[0];
    setFields(current => ({
      ...current,
      name: current.name || account?.name || savedAddress?.name || '',
      email: current.email || account?.email || '',
      phone: current.phone || account?.phone || savedAddress?.phone || '',
      addressLine1: current.addressLine1 || savedAddress?.addressLine1 || '',
      addressLine2: current.addressLine2 || savedAddress?.addressLine2 || '',
      city: current.city || savedAddress?.city || '',
      state: current.state || savedAddress?.state || '',
      pincode: current.pincode || savedAddress?.pincode || '',
    }));
  }, [account, addresses, selectedAddressId]);

  const applySavedAddress = (addressId: string) => {
    const savedAddress = addresses.find(address => address.id === addressId);
    if (!savedAddress) return;
    setFields(current => ({
      ...current,
      name: savedAddress.name,
      phone: savedAddress.phone,
      addressLine1: savedAddress.addressLine1,
      addressLine2: savedAddress.addressLine2 || '',
      city: savedAddress.city,
      state: savedAddress.state,
      pincode: savedAddress.pincode,
    }));
  };

  const updateField = (field: keyof CheckoutFields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError('');
  };

  const validate = (): CheckoutErrors => {
    const nextErrors: CheckoutErrors = {};
    const requiredFields: Array<keyof CheckoutFields> = [
      'name',
      'email',
      'phone',
      'addressLine1',
      'city',
      'state',
      'pincode',
    ];

    requiredFields.forEach((field) => {
      if (!fields[field].trim()) nextErrors[field] = 'This field is required.';
    });

    if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (fields.phone.trim() && !/^\+?[\d\s()-]{7,20}$/.test(fields.phone.trim())) {
      nextErrors.phone = 'Enter a valid contact number.';
    }
    if (fields.pincode.trim() && !/^\d{4,10}$/.test(fields.pincode.trim())) {
      nextErrors.pincode = 'Enter a valid postal code.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitError('Please complete the highlighted fields before placing your order.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const shippingAddress: Address = {
        id: `addr-checkout-${Date.now()}`,
        name: fields.name.trim(),
        phone: fields.phone.trim(),
        addressLine1: fields.addressLine1.trim(),
        addressLine2: fields.addressLine2.trim() || undefined,
        city: fields.city.trim(),
        state: fields.state.trim(),
        pincode: fields.pincode.trim(),
        type: 'home',
      };

      const order = await createOrder({
        customerName: fields.name.trim(),
        customerEmail: fields.email.trim(),
        customerPhone: fields.phone.trim(),
        shippingAddress,
        paymentMethod: 'COD',
      });
      onSuccess(order);
    } catch {
      setSubmitError('We could not place your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = (name: keyof CheckoutFields, label: string, type = 'text', required = true) => (
    <label className="block text-sm font-medium text-neutral-700">
      <span>{label}{required && <span className="text-red-600"> *</span>}</span>
      <Input
        type={type}
        value={fields[name]}
        onChange={(event) => updateField(name, event.target.value)}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        className={cn('mt-1.5', errors[name] && 'border-red-500 focus-visible:ring-red-500')}
        autoComplete={name === 'name' ? 'name' : name === 'email' ? 'email' : name === 'phone' ? 'tel' : undefined}
      />
      {errors[name] && <span id={`${name}-error`} className="mt-1 block text-xs font-normal text-red-600">{errors[name]}</span>}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-amber-600" />
          <h2 className="text-xl font-semibold text-neutral-900">Shipping details</h2>
        </div>
        <p className="mt-1 text-sm text-neutral-500">Tell us where to deliver your Tirzha pieces.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {field('name', 'Full name')}
        {field('email', 'Email address', 'email')}
        {field('phone', 'Contact number', 'tel')}
      </div>

      <div className="border-t border-neutral-200 pt-5">
        <h3 className="mb-4 font-medium text-neutral-900">Delivery address</h3>
        <div className="space-y-4">
          {addresses.length > 0 && <label className="block text-sm font-medium text-neutral-700">Use a saved address<select className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue="" onChange={event => applySavedAddress(event.target.value)}><option value="">Choose an address</option>{addresses.map(address => <option key={address.id} value={address.id}>{address.name} - {address.addressLine1}, {address.city}</option>)}</select></label>}
          {field('addressLine1', 'Address line 1')}
          {field('addressLine2', 'Address line 2', 'text', false)}
          <div className="grid gap-4 sm:grid-cols-3">
            {field('city', 'City')}
            {field('state', 'State')}
            {field('pincode', 'Postal code')}
          </div>
        </div>
      </div>

      {submitError && (
        <div role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <div className="flex flex-col-reverse gap-2 border-t border-neutral-200 pt-5 sm:flex-row sm:justify-end">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          <ArrowLeft className="h-4 w-4" />
          Back to bag
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Placing order...' : 'Place order'}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
