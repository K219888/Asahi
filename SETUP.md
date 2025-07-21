# My SaaS App Setup Guide

## 🚀 Quick Start

### 1. Environment Variables Setup

Create a `.env.local` file in your project root with the following content:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here

# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 2. Demo Mode (Recommended for Development)

**If you want to test the app without setting up external services:**

The app will automatically run in demo mode when environment variables are not configured. You can:
- Test all UI/UX flows
- Navigate between pages
- Use any credentials for login/signup
- Simulate payment flow
- Access all features

**To enable demo mode:** Simply don't create the `.env.local` file or leave the values as placeholders.

### 3. Production Setup

#### A. Supabase Configuration

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up and create a new project

2. **Get Your Credentials**
   - In your Supabase dashboard, go to **Settings → API**
   - Copy the **Project URL** (starts with `https://`)
   - Copy the **anon public** key (starts with `eyJ`)
   - Copy the **service_role** key (starts with `eyJ`)

3. **Update Environment Variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

#### B. Stripe Configuration

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Sign up and complete account setup

2. **Get Your API Keys**
   - In Stripe Dashboard, go to **Developers → API keys**
   - Copy the **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - Copy the **Secret key** (starts with `sk_test_` or `sk_live_`)

3. **Update Environment Variables**
   ```env
   STRIPE_SECRET_KEY=sk_test_51ABC123...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51ABC123...
   ```

### 4. Database Setup

1. **In Supabase Dashboard**
   - Go to **SQL Editor**
   - Copy the entire contents of `database-setup.sql`
   - Paste and click **Run**

2. **Verify Setup**
   - Go to **Table Editor**
   - You should see: `profiles`, `saved_chats`, `ebooks` tables
   - Check that sample data is loaded

### 5. Test the App

```bash
npm run dev
```

Visit http://localhost:3000 (or the port shown in terminal)

## 🔧 Features

✅ **Authentication System** - Sign up, login, logout  
✅ **Route Protection** - Protected pages require authentication  
✅ **Navigation** - Dynamic navigation based on auth status  
✅ **Chat System** - AI chat with message history  
✅ **E-Books** - Subscription-based content access  
✅ **Payment Integration** - Stripe checkout for subscriptions  
✅ **Demo Mode** - Works without external services  
✅ **Database Schema** - Complete with RLS policies  

## 📋 Database Tables

- **profiles** - User profiles with subscription status
- **saved_chats** - User's saved chat messages  
- **ebooks** - E-book content with sample data

## 🔐 Security Features

- Row Level Security (RLS) on all tables
- Users can only access their own data
- Authentication required for protected routes
- Proper error handling for unauthorized access

## 💳 Payment Testing

**Test Cards (Stripe Test Mode):**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Expiry: Any future date
- CVC: Any 3 digits

## 🎯 Development Workflow

1. **Start with Demo Mode**
   - Test all features without external setup
   - Develop UI/UX improvements

2. **Add Real Services**
   - Set up Supabase for authentication
   - Set up Stripe for payments
   - Run database setup script

3. **Test Complete Flow**
   - Sign up → Login → Chat → Save chats → View e-books → Subscribe

## 🐛 Troubleshooting

**"supabaseUrl is required" error:**
- Make sure `.env.local` has correct Supabase credentials
- Restart dev server after updating environment variables

**"Neither apiKey nor config.authenticator provided" error:**
- Make sure `.env.local` has correct Stripe credentials
- Restart dev server after updating environment variables

**Database errors:**
- Run `database-setup.sql` in Supabase SQL Editor
- Check that RLS policies are created correctly

**Authentication issues:**
- Clear browser storage and try again
- Check Supabase Auth settings in dashboard

**Demo mode not working:**
- Make sure no `.env.local` file exists, or
- Leave all values as placeholders in `.env.local`

## 🚀 Deployment

1. **Vercel (Recommended)**
   - Connect your GitHub repo
   - Add environment variables in Vercel dashboard
   - Deploy automatically

2. **Other Platforms**
   - Set environment variables in your hosting platform
   - Build and deploy with `npm run build`

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes* | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes* | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes* | Supabase service role key |
| `STRIPE_SECRET_KEY` | Yes* | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes* | Stripe publishable key |
| `NEXT_PUBLIC_BASE_URL` | No | App base URL (defaults to localhost) |

*Required for production, optional for demo mode 