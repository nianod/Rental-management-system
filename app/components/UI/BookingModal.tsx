// components/landing/BookingModal.tsx
'use client';

import { useState } from 'react';
import { Room } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import SubmitApplication from '@/app/lib/application.action';
import { toast } from 'sonner';

interface BookingModalProps {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ room, isOpen, onClose }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in booking ${room.name}.`,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await SubmitApplication({
        ...formData,
        roomId: room.id,
        status: 'pending',
      });

      toast.success('Application submitted successfully!', {
        description: 'The landlord will contact you soon.',
      });

      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: `I'm interested in booking ${room.name}.`,
      });
    } catch (error) {
      toast.error('Failed to submit application', {
        description: 'Please try again or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Book {room.name}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground">Fill out the form to apply for this room</p>
        </div>

        {/* Room info summary */}
        <div className="mb-6 rounded-lg bg-muted p-4">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">{room.name}</h3>
              <p className="text-sm text-muted-foreground">
                ${room.price}/month • {room.size} sq ft
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">${room.price}</p>
              <p className="text-sm text-muted-foreground">per month</p>
            </div>
          </div>
        </div>

        {/* Application form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e: any) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message to Landlord</Label>
            <Textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e: any) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about yourself and your application..."
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              By submitting, you agree to our terms and privacy policy
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}