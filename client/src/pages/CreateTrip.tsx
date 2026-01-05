import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plane } from "lucide-react";

const tripSchema = z.object({
  name: z.string().min(3, "Trip name must be at least 3 characters"),
  startDate: z.string().refine((date) => new Date(date) > new Date(), "Start date must be in the future"),
  endDate: z.string(),
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: "End date must be after start date",
  path: ["endDate"],
});

export default function CreateTrip() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof tripSchema>>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      name: "",
      startDate: "",
      endDate: ""
    }
  });

  const onSubmit = (data: z.infer<typeof tripSchema>) => {
    // In a real app, this would save to backend. 
    // Here we just mock the redirection.
    console.log(data);
    setLocation("/itinerary/new");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
      <Card className="w-full max-w-lg card-floating border-t-4 border-t-primary">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary ring-1 ring-primary/20">
            <Plane className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-heading">Start a New Journey</CardTitle>
          <CardDescription>Give your trip a name and set the dates to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Trip Name</Label>
              <Input
                id="name"
                placeholder="e.g. Summer in Tuscany"
                {...form.register("name")}
                className="h-12 text-lg rounded-2xl border-soft"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <div className="relative">
                  <Input
                    id="startDate"
                    type="date"
                    {...form.register("startDate")}
                    className="pl-10"
                  />
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                {form.formState.errors.startDate && (
                  <p className="text-sm text-destructive">{form.formState.errors.startDate.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <div className="relative">
                  <Input
                    id="endDate"
                    type="date"
                    {...form.register("endDate")}
                    className="pl-10"
                  />
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                {form.formState.errors.endDate && (
                  <p className="text-sm text-destructive">{form.formState.errors.endDate.message}</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-medium shadow-lg shadow-primary/20 rounded-full">
              Start Planning
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t bg-muted/10 py-4">
          <p className="text-xs text-muted-foreground">Planning is the first step of the adventure.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
