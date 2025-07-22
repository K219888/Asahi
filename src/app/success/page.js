// app/success/page.js
import React, { Suspense } from 'react';
import SuccessClient from '../../components/SuccessClient';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <SuccessClient />
    </Suspense>
  );
}
