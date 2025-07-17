import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { AddCarFormProps } from "@/lib/owner/types";
import { addCar } from "@/services/owner/updates";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const featureOptions = ["4WD", "Cruise Control", "Leather Seats", "Bluetooth", "Backup Camera"];
const fuelOptions = ["Diesel", "Petrol", "Electric", "Hybrid"];
const inspectionStatuses = ["pending", "passed", "failed"];

const AddCarForm: React.FC<AddCarFormProps> = ({ selectedDates, setSelectedDates }) => {
  const [name, setName] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | undefined>();
  const [fuelType, setFuelType] = useState("");
  const [mileage, setMileage] = useState<number | undefined>();
  const [features, setFeatures] = useState<string[]>([]);
  const [customFeature, setCustomFeature] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("available");
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [inspectionStatus, setInspectionStatus] = useState("pending");

  const toggleFeature = (feature: string) => {
    setFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const addCustomFeature = () => {
    if (customFeature && !features.includes(customFeature)) {
      setFeatures((prev) => [...prev, customFeature]);
      setCustomFeature("");
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name,
        numberPlate,
        make,
        model,
        year,
        fuelType,
        mileage,
        features,
        image,
        status,
        price,
        bookings: 0,
        rating: 0,
        totalEarnings: 0,
        location,
        description: description || null,
        lastInspection: null,
        inspectionStatus,
        inspectionImages: [],
        deletedAt: null,
        ownerId: 2,
        createdAt: new Date().toISOString(),
      };

      await addCar(payload);
      alert("Car added successfully!");
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Failed to add car.");
    }
  };

  return (
    <div className="space-y-6 ">

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8">
        {/* Car Details */}
        <Card className="col-span-2 lg:col-span-1 border-2 border-orange-200 w-full">
          <CardHeader>
            <CardTitle>Car Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label>Car Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div><Label>Number Plate</Label><Input value={numberPlate} onChange={(e) => setNumberPlate(e.target.value)} /></div>
              <div><Label>Make</Label><Input value={make} onChange={(e) => setMake(e.target.value)} /></div>
              <div><Label>Model</Label><Input value={model} onChange={(e) => setModel(e.target.value)} /></div>
              <div><Label>Year</Label><Input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} /></div>
              <div>
                <Label>Fuel Type</Label>
                <Select value={fuelType} onValueChange={setFuelType}>
                  <SelectTrigger><SelectValue placeholder="Select fuel type" /></SelectTrigger>
                  <SelectContent>
                    {fuelOptions.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Mileage (km)</Label><Input type="number" value={mileage} onChange={(e) => setMileage(Number(e.target.value))} /></div>
              <div><Label>Image URL</Label><Input value={image} onChange={(e) => setImage(e.target.value)} /></div>
              <div><Label>Location</Label><Input value={location} onChange={(e) => setLocation(e.target.value)} /></div>
              <div><Label>Price per Day (KSh)</Label><Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></div>
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <Label>Features</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {featureOptions.map((feature) => (
                    <label key={feature} className="flex items-center gap-2">
                      <Checkbox checked={features.includes(feature)} onCheckedChange={() => toggleFeature(feature)} />
                      {feature}
                    </label>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Input placeholder="Add custom feature" value={customFeature} onChange={(e) => setCustomFeature(e.target.value)} />
                  <Button variant="outline" onClick={addCustomFeature}>Add</Button>
                </div>
              </div>
              <div className="md:col-span-2">
                <Label>Inspection Status</Label>
                <Select value={inspectionStatus} onValueChange={setInspectionStatus}>
                  <SelectTrigger><SelectValue placeholder="Select inspection status" /></SelectTrigger>
                  <SelectContent>
                    {inspectionStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
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
              <p className="text-sm text-gray-600">Selected dates: {selectedDates.length} days</p>
              {selectedDates.length > 0 && (
                <p className="text-sm font-medium text-orange-600">
                  Estimated earnings: KSh {selectedDates.length * price}
                </p>
              )}
            </div>
            <Button
              onClick={handleSubmit}
              className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              Add Car
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>

  );
};

export default AddCarForm;
