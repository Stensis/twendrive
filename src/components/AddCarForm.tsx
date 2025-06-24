import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Upload, Camera } from 'lucide-react';
import { AddCarFormProps } from '@/lib/owner/types';

const AddCarForm: React.FC<AddCarFormProps> = ({ selectedDates, setSelectedDates }) => (
  <div className="space-y-6 mt-6">
    <div className="flex items-center space-x-2">
      <h2 className="text-2xl font-bold text-gray-900">Add New Car</h2>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      {/* Car Details */}
      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle>Car Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Car Name</Label>
            <Input placeholder="e.g., Toyota Camry 2022" />
          </div>
          <div>
            <Label>Location</Label>
            <Input placeholder="e.g., Nairobi CBD" />
          </div>
          <div>
            <Label>Price per Day (KSh)</Label>
            <Input type="number" placeholder="400" />
          </div>
          <div>
            <Label>Description</Label>
            <Input placeholder="Brief description of your car" />
          </div>
          <div>
            <Label>Car Photos</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Upload car photos</p>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Choose Files
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability Calendar */}
      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle>Availability Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={setSelectedDates}
            className="rounded-md border"
          />
          <div className="mt-4 p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Selected dates: {selectedDates.length} days
            </p>
            {selectedDates.length > 0 && (
              <p className="text-sm font-medium text-orange-600">
                Estimated earnings: KSh {selectedDates.length * 400}
              </p>
            )}
          </div>
          <Button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
            Add Car
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default AddCarForm;
