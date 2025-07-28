'use client';

import { useState, useMemo, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { addDays, format } from 'date-fns';
import { PartyPopper } from 'lucide-react';

const services = ["Haircut", "Facial", "Manicure", "Bridal Makeup", "Massage", "Threading", "Waxing", "Skin Treatments"];
const stylists = ["Alex", "Jordan", "Taylor", "Casey"];
const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"];

export function AppointmentScheduler() {
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [service, setService] = useState('');
  const [stylist, setStylist] = useState('');
  const [time, setTime] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const { toast } = useToast();

  const isBookingReady = useMemo(() => {
    return date && service && stylist && time;
  }, [date, service, stylist, time]);
  
  // Effect to reset time if the selected date changes
  useEffect(() => {
    setTime('');
  }, [date]);

  const handleBooking = () => {
    if (!isBookingReady) return;
    setIsConfirming(true);
  };

  const confirmBooking = () => {
    toast({
      title: "Booking Confirmed!",
      description: `Your ${service} with ${stylist} is set for ${format(date!, 'PPP')} at ${time}.`,
      action: <ToastAction altText="Close"><PartyPopper className="text-primary" /></ToastAction>,
    });
    // Reset form
    setDate(addDays(new Date(), 1));
    setService('');
    setStylist('');
    setTime('');
    setIsConfirming(false);
  };

  return (
    <Card className="mt-12 w-full max-w-4xl mx-auto shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-6 flex flex-col items-center justify-center bg-secondary/50">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
            disabled={(day) => day < new Date() || day.getDay() === 0} // Disable past dates and Sundays
          />
        </div>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select value={service} onValueChange={setService}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Service" />
              </SelectTrigger>
              <SelectContent>
                {services.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={stylist} onValueChange={setStylist}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Stylist" />
              </SelectTrigger>
              <SelectContent>
                {stylists.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-headline mb-4 text-center">
              Available Times for {date ? format(date, 'PPP') : '...'}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map(slot => (
                <Button 
                  key={slot}
                  variant={time === slot ? 'default' : 'outline'}
                  onClick={() => setTime(slot)}
                  disabled={!date}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
          <Button onClick={handleBooking} disabled={!isBookingReady} size="lg" className="w-full">
            Book Appointment
          </Button>
        </CardContent>
      </div>
      <AlertDialog open={isConfirming} onOpenChange={setIsConfirming}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline">Confirm Your Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Please review your appointment details before confirming.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2 text-sm">
            <p><strong>Service:</strong> {service}</p>
            <p><strong>Stylist:</strong> {stylist}</p>
            <p><strong>Date:</strong> {date ? format(date, 'PPP') : ''}</p>
            <p><strong>Time:</strong> {time}</p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Go Back</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBooking}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
