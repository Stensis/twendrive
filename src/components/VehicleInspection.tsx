
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { VehicleInspectionProps } from '@/lib/types';

const VehicleInspection: React.FC<VehicleInspectionProps> = ({ car, onClose }) => {
  const [inspectionPhotos, setInspectionPhotos] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [damageReported, setDamageReported] = useState(false);

  const handlePhotoUpload = () => {
    // Simulate photo upload
    const newPhoto = `https://images.unsplash.com/photo-1552519507-6958c132d338?w=400&h=300&fit=crop`;
    setInspectionPhotos([...inspectionPhotos, newPhoto]);
  };

  const handleSubmitInspection = () => {
    console.log('Inspection submitted:', {
      carId: car.id,
      photos: inspectionPhotos,
      notes,
      damageReported
    });
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Vehicle Inspection</h2>
        <Button variant="ghost" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle>Document Vehicle Condition - {car?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <Camera className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Take photos of the vehicle from all angles to document its condition at pickup/return.
              This protects both you and the owner in case of disputes.
            </AlertDescription>
          </Alert>

          <div>
            <h3 className="font-semibold mb-3">Vehicle Photos</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {inspectionPhotos.map((photo, index) => (
                <div key={index} className="relative">
                  <img src={photo} alt={`Inspection ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-1 right-1 p-1 h-6 w-6"
                    onClick={() => setInspectionPhotos(inspectionPhotos.filter((_, i) => i !== index))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                className="h-32 border-dashed border-2 border-gray-300"
                onClick={handlePhotoUpload}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Camera className="h-6 w-6 text-gray-400" />
                  <span className="text-sm text-gray-600">Take Photo</span>
                </div>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Inspection Notes</h3>
            <Textarea
              placeholder="Note any existing damage, scratches, or issues you observe..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="damage"
              checked={damageReported}
              onChange={(e) => setDamageReported(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="damage" className="text-sm">
              I found damage or issues that need to be reported
            </label>
          </div>

          {damageReported && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Please provide detailed photos and notes about the damage. This will be reviewed by our support team.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex space-x-2">
            <Button
              onClick={handleSubmitInspection}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600"
              disabled={inspectionPhotos.length === 0}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete Inspection
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleInspection;
