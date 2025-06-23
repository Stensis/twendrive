import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Camera, CheckCircle, FileText, Shield } from 'lucide-react';

const VehicleInspectionSection = ({ car, onBack }: { car: any, onBack: () => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" onClick={onBack}>
          ← Back to Car Details
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Vehicle Inspection: {car.name}</h2>
      </div>

      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Last Inspection:</strong> {car.lastInspection} - Status: {car.inspectionStatus}
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle>Current Vehicle Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {car.inspectionImages.map((image: string, index: number) => (
                <div key={index} className="relative">
                  <img src={image} alt={`Inspection ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                  <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <Camera className="h-4 w-4 mr-2" />
              Update Photos
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200">
          <CardHeader>
            <CardTitle>Inspection Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { item: 'Exterior Condition', status: 'passed' },
                { item: 'Interior Cleanliness', status: 'passed' },
                { item: 'Engine Performance', status: 'passed' },
                { item: 'Tire Condition', status: 'passed' },
                { item: 'Lights & Signals', status: 'passed' },
                { item: 'Brakes & Safety', status: 'passed' }
              ].map((check, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{check.item}</span>
                  <Badge className={check.status === 'passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {check.status}
                  </Badge>
                </div>
              ))}
            </div>

            <div>
              <Label>Additional Notes</Label>
              <Textarea
                placeholder="Any additional notes about the vehicle condition..."
                className="mt-2"
                rows={3}
              />
            </div>

            <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              <FileText className="h-4 w-4 mr-2" />
              Generate Inspection Report
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle>Pre-Rental Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4 border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Complete this checklist before handing over the vehicle to ensure both parties are protected.
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Vehicle Handover</h4>
              {[
                'Fuel level documented',
                'Mileage recorded',
                'Exterior damage noted',
                'Interior condition checked',
                'Emergency kit present'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Renter Verification</h4>
              {[
                'Valid driving license verified',
                'Identity document checked',
                'Contact information confirmed',
                'Emergency contact provided',
                'Terms and conditions signed'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleInspectionSection;
