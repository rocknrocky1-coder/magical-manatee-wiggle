import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Package, Pencil, Plus, UserRound } from 'lucide-react';
import { useEcommerce } from '@/context/EcommerceContext';
import { Address } from '@/types/ecommerce';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;
const tabs = [
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
] as const;
type AccountTab = typeof tabs[number]['id'];

type AuthFields = { name: string; email: string; phone: string; password: string };
type AddressFields = Omit<Address, 'id'>;

const emptyAuth: AuthFields = { name: '', email: '', phone: '', password: '' };
const emptyAddress: AddressFields = { name: '', phone: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', type: 'home' };

const Account = () => {
  const navigate = useNavigate();
  const { account, signIn, signUp, signOut, updateAccount, orders, addresses, addAddress, deleteAddress, wishlist, products, getProductById } = useEcommerce();
  const [authMode, setAuthMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [authFields, setAuthFields] = useState<AuthFields>(emptyAuth);
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<AccountTab>('profile');
  const [profileFields, setProfileFields] = useState({ name: '', email: '', phone: '' });
  const [profileMessage, setProfileMessage] = useState('');
  const [addressFields, setAddressFields] = useState<AddressFields>(emptyAddress);
  const [addressError, setAddressError] = useState('');
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  React.useEffect(() => {
    if (account) setProfileFields({ name: account.name, email: account.email, phone: account.phone });
  }, [account]);

  const updateAuthField = (field: keyof AuthFields, value: string) => {
    setAuthFields(current => ({ ...current, [field]: value }));
    setAuthError('');
  };

  const handleAuthSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, phone, password } = authFields;
    if (!email.trim() || !password) {
      setAuthError('Email and password are required.');
      return;
    }
    if (authMode === 'sign-up' && (!name.trim() || !phone.trim())) {
      setAuthError('Name and phone number are required to create an account.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setAuthError('Enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }
    setIsSubmitting(true);
    const result = await (authMode === 'sign-in'
      ? signIn(email, password)
      : signUp(name, email, phone, password));
    setIsSubmitting(false);
    if (!result.success) {
      setAuthError(result.message);
    } else {
      setAuthFields(emptyAuth);
    }
  };

  const handleProfileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profileFields.name.trim() || !profileFields.email.trim() || !profileFields.phone.trim()) {
      setProfileMessage('Name, email, and phone are required.');
      return;
    }
    const result = await updateAccount(profileFields);
    setProfileMessage(result.message);
  };

  const updateAddressField = (field: keyof AddressFields, value: string) => {
    setAddressFields(current => ({ ...current, [field]: value }));
    setAddressError('');
  };

  const handleAddressSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const required = ['name', 'phone', 'addressLine1', 'city', 'state', 'pincode'] as const;
    if (required.some(field => !addressFields[field].trim())) {
      setAddressError('Complete all required address fields before saving.');
      return;
    }
    await addAddress(addressFields);
    setAddressFields(emptyAddress);
    setIsAddingAddress(false);
  };

  if (!account) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-neutral-900 p-8 text-white sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">Tirzha account</p>
            <h1 className="mt-8 font-serif text-4xl leading-tight sm:text-5xl">Your pieces, your place.</h1>
            <p className="mt-5 max-w-sm text-sm leading-6 text-neutral-300">Keep your orders, addresses, and saved pieces together for a more considered shopping experience.</p>
            <div className="mt-12 space-y-4 text-sm text-neutral-300">
              <p className="flex items-center gap-3"><Package className="h-4 w-4 text-amber-300" />Track every order</p>
              <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-amber-300" />Save delivery addresses</p>
              <p className="flex items-center gap-3"><Heart className="h-4 w-4 text-amber-300" />Keep your wishlist close</p>
            </div>
          </div>
          <div className="p-6 sm:p-12">
            <div className="mb-8 flex gap-6 border-b border-neutral-200">
              <button type="button" onClick={() => { setAuthMode('sign-in'); setAuthError(''); }} className={cn('border-b-2 pb-3 text-sm font-semibold', authMode === 'sign-in' ? 'border-amber-600 text-neutral-900' : 'border-transparent text-neutral-500')}>Sign In</button>
              <button type="button" onClick={() => { setAuthMode('sign-up'); setAuthError(''); }} className={cn('border-b-2 pb-3 text-sm font-semibold', authMode === 'sign-up' ? 'border-amber-600 text-neutral-900' : 'border-transparent text-neutral-500')}>Sign Up</button>
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900">{authMode === 'sign-in' ? 'Welcome back' : 'Create your account'}</h2>
            <p className="mt-2 text-sm text-neutral-500">{authMode === 'sign-in' ? 'Sign in to view your account.' : 'A few details are all you need to begin.'}</p>
            <form onSubmit={handleAuthSubmit} className="mt-7 space-y-4" noValidate>
              {authMode === 'sign-up' && <label className="block text-sm font-medium text-neutral-700">Full name<Input className="mt-1.5" value={authFields.name} onChange={event => updateAuthField('name', event.target.value)} autoComplete="name" /></label>}
              <label className="block text-sm font-medium text-neutral-700">Email address<Input className="mt-1.5" type="email" value={authFields.email} onChange={event => updateAuthField('email', event.target.value)} autoComplete="email" /></label>
              {authMode === 'sign-up' && <label className="block text-sm font-medium text-neutral-700">Phone number<Input className="mt-1.5" type="tel" value={authFields.phone} onChange={event => updateAuthField('phone', event.target.value)} autoComplete="tel" /></label>}
              <label className="block text-sm font-medium text-neutral-700">Password<Input className="mt-1.5" type="password" value={authFields.password} onChange={event => updateAuthField('password', event.target.value)} autoComplete={authMode === 'sign-in' ? 'current-password' : 'new-password'} /></label>
              {authError && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{authError}</p>}
              <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Please wait...' : authMode === 'sign-in' ? 'Sign In' : 'Create Account'}</Button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  const wishlistProducts = wishlist.map(id => getProductById(id)).filter(Boolean);
  const customerOrders = orders.filter(order => order.customerEmail.toLowerCase() === account.email.toLowerCase());

  return (
    <main className="min-h-screen bg-gray-50 px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-8 sm:flex-row sm:items-end">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">My account</p><h1 className="mt-2 font-serif text-4xl text-neutral-900">Hello, {account.name.split(' ')[0]}</h1><p className="mt-2 text-sm text-neutral-500">Manage your Tirzha experience.</p></div>
          <Button variant="outline" onClick={() => { signOut(); navigate('/'); }}>Sign Out</Button>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[230px_1fr]">
          <nav className="flex gap-2 overflow-x-auto lg:block lg:space-y-2" aria-label="Account sections">
            {tabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => setActiveTab(id)} className={cn('flex shrink-0 items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-medium transition-colors lg:w-full', activeTab === id ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-white hover:text-neutral-900')}><Icon className="h-4 w-4" />{label}</button>)}
          </nav>
          <div>
            {activeTab === 'profile' && <Card><CardHeader><CardTitle>Profile details</CardTitle><CardDescription>Keep your contact details current for checkout and delivery updates.</CardDescription></CardHeader><CardContent><form onSubmit={handleProfileSubmit} className="max-w-xl space-y-4"><label className="block text-sm font-medium">Full name<Input className="mt-1.5" value={profileFields.name} onChange={event => setProfileFields(current => ({ ...current, name: event.target.value }))} /></label><label className="block text-sm font-medium">Email address<Input className="mt-1.5" type="email" value={profileFields.email} onChange={event => setProfileFields(current => ({ ...current, email: event.target.value }))} /></label><label className="block text-sm font-medium">Phone number<Input className="mt-1.5" type="tel" value={profileFields.phone} onChange={event => setProfileFields(current => ({ ...current, phone: event.target.value }))} /></label>{profileMessage && <p className="text-sm text-neutral-600">{profileMessage}</p>}<Button type="submit"><Pencil className="h-4 w-4" />Save changes</Button></form></CardContent></Card>}
            {activeTab === 'orders' && <Card><CardHeader><CardTitle>My Orders</CardTitle><CardDescription>Your latest purchases and delivery details.</CardDescription></CardHeader><CardContent>{customerOrders.length === 0 ? <EmptyState icon={Package} title="No orders yet" description="Your future purchases will appear here." action={<Button onClick={() => navigate('/')}>Explore collection</Button>} /> : <div className="space-y-4">{customerOrders.map(order => <div key={order.id} className="rounded-lg border border-neutral-200 p-4"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><p className="font-semibold text-neutral-900">{order.orderNumber}</p><p className="mt-1 text-xs text-neutral-500">{new Date(order.createdAt).toLocaleDateString()} · {order.items.length} item{order.items.length === 1 ? '' : 's'}</p></div><div className="text-left sm:text-right"><p className="font-semibold text-amber-700">{formatPrice(order.totalAmount)}</p><span className="mt-1 inline-block rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">{order.orderStatus}</span></div></div><div className="mt-4 flex flex-wrap gap-2">{order.items.map(item => <Link key={item.variantId} to={`/product/${products.find(product => product.id === item.productId)?.slug || ''}`} className="text-xs text-neutral-600 underline underline-offset-2">{item.productName}</Link>)}</div></div>)}</div>}</CardContent></Card>}
            {activeTab === 'addresses' && <Card><CardHeader><div className="flex items-start justify-between gap-4"><div><CardTitle>Saved Addresses</CardTitle><CardDescription>Save a delivery address for faster checkout.</CardDescription></div><Button size="sm" onClick={() => setIsAddingAddress(current => !current)}><Plus className="h-4 w-4" />{isAddingAddress ? 'Close' : 'Add address'}</Button></div></CardHeader><CardContent><div className="space-y-4">{isAddingAddress && <form onSubmit={handleAddressSubmit} className="rounded-lg border border-amber-200 bg-amber-50/50 p-4"><div className="grid gap-4 sm:grid-cols-2"><AddressInput label="Recipient name" value={addressFields.name} onChange={value => updateAddressField('name', value)} /><AddressInput label="Phone" value={addressFields.phone} onChange={value => updateAddressField('phone', value)} /><AddressInput label="Address line 1" value={addressFields.addressLine1} onChange={value => updateAddressField('addressLine1', value)} /><AddressInput label="Address line 2" value={addressFields.addressLine2 || ''} onChange={value => updateAddressField('addressLine2', value)} required={false} /><AddressInput label="City" value={addressFields.city} onChange={value => updateAddressField('city', value)} /><AddressInput label="State" value={addressFields.state} onChange={value => updateAddressField('state', value)} /><AddressInput label="Postal code" value={addressFields.pincode} onChange={value => updateAddressField('pincode', value)} /></div>{addressError && <p className="mt-3 text-sm text-red-700">{addressError}</p>}<Button type="submit" className="mt-4">Save address</Button></form>}{addresses.length === 0 ? <EmptyState icon={MapPin} title="No saved addresses" description="Add your preferred delivery address above." /> : addresses.map(address => <div key={address.id} className="flex flex-col justify-between gap-3 rounded-lg border border-neutral-200 p-4 sm:flex-row"><div><p className="font-semibold text-neutral-900">{address.name}</p><p className="mt-1 text-sm leading-6 text-neutral-600">{address.addressLine1}{address.addressLine2 && `, ${address.addressLine2}`}<br />{address.city}, {address.state} {address.pincode}<br />{address.phone}</p></div><Button variant="ghost" size="sm" onClick={() => deleteAddress(address.id)}>Remove</Button></div>)}</div></CardContent></Card>}
            {activeTab === 'wishlist' && <Card><CardHeader><CardTitle>Wishlist</CardTitle><CardDescription>Pieces you have saved for later.</CardDescription></CardHeader><CardContent>{wishlistProducts.length === 0 ? <EmptyState icon={Heart} title="Your wishlist is quiet" description="Save pieces you love while browsing the collection." action={<Button onClick={() => navigate('/')}>Browse products</Button>} /> : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{wishlistProducts.map(product => product && <Link key={product.id} to={`/product/${product.slug}`} className="group overflow-hidden rounded-lg border border-neutral-200"><img src={product.images[0]} alt={product.name} className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="p-3"><p className="truncate text-sm font-medium text-neutral-900">{product.name}</p><p className="mt-1 text-sm text-amber-700">{formatPrice(product.sellingPrice)}</p></div></Link>)}</div>}</CardContent></Card>}
          </div>
        </div>
      </div>
    </main>
  );
};

const AddressInput = ({ label, value, onChange, required = true }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) => <label className="block text-sm font-medium text-neutral-700">{label}{required && <span className="text-red-600"> *</span>}<Input className="mt-1.5" value={value} onChange={event => onChange(event.target.value)} /></label>;

const EmptyState = ({ icon: Icon, title, description, action }: { icon: React.ElementType; title: string; description: string; action?: React.ReactNode }) => <div className="flex flex-col items-center justify-center py-12 text-center"><Icon className="h-10 w-10 text-neutral-300" /><h3 className="mt-4 font-semibold text-neutral-900">{title}</h3><p className="mt-1 max-w-sm text-sm text-neutral-500">{description}</p>{action && <div className="mt-5">{action}</div>}</div>;

export default Account;
